const { spawn } = require('child_process');
const path = require('path');
const { YTDLP_PATH, FFMPEG_PATH, DOWNLOAD_DIR, QUALITY_FORMATS, AUDIO_FORMATS } = require('../config');
const jobManager = require('./jobManager');

function getInfo(url) {
  return new Promise((resolve, reject) => {
    const args = [
      '--dump-single-json',
      '--no-playlist',
      '--ffmpeg-location', FFMPEG_PATH,
      url,
    ];
    let stdout = '';
    let stderr = '';
    const proc = spawn(YTDLP_PATH, args);
    proc.stdout.on('data', d => { stdout += d.toString(); });
    proc.stderr.on('data', d => { stderr += d.toString(); });
    proc.on('close', code => {
      if (code !== 0) return reject(new Error(stderr || 'yt-dlp info failed'));
      try {
        const data = JSON.parse(stdout);
        resolve(buildInfo(data));
      } catch (e) {
        reject(new Error('Failed to parse yt-dlp output'));
      }
    });
    proc.on('error', reject);
  });
}

function buildInfo(data) {
  const formats = Array.isArray(data.formats) ? data.formats : [];

  // Collect best video+audio combos per height
  const videoRows = buildVideoRows(formats, data);
  // Collect audio-only rows
  const audioRows = buildAudioRows();

  return {
    title: data.title || 'Unknown',
    channel: data.uploader || data.channel || '',
    duration: data.duration || 0,
    thumbnail: data.thumbnail || null,
    videoRows,
    audioRows,
    // legacy field for backward compat
    availableQualities: ['best', ...videoRows.map(r => r.quality)],
  };
}

function buildVideoRows(formats, data) {
  // Heights we offer
  const targets = [
    { label: 'Mejor calidad', quality: 'best' },
    { label: '1080p', quality: '1080p', height: 1080 },
    { label: '720p',  quality: '720p',  height: 720 },
    { label: '480p',  quality: '480p',  height: 480 },
    { label: '360p',  quality: '360p',  height: 360 },
  ];

  // Which heights actually exist in this video
  const availHeights = new Set(formats.filter(f => f.height).map(f => f.height));

  const rows = [];
  for (const t of targets) {
    if (t.height && ![...availHeights].some(h => h >= t.height)) continue;

    // Estimate file size: find best matching format for this height
    let sizeMB = null;
    if (t.height) {
      const vf = formats
        .filter(f => f.height && f.height <= t.height && f.vcodec && f.vcodec !== 'none')
        .sort((a, b) => (b.height || 0) - (a.height || 0))[0];
      const af = formats
        .filter(f => f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none'))
        .sort((a, b) => (b.abr || 0) - (a.abr || 0))[0];
      const totalBytes = (vf?.filesize || vf?.filesize_approx || 0) +
                         (af?.filesize || af?.filesize_approx || 0);
      if (totalBytes > 0) sizeMB = (totalBytes / 1e6).toFixed(1);
    } else if (data.filesize || data.filesize_approx) {
      sizeMB = ((data.filesize || data.filesize_approx) / 1e6).toFixed(1);
    }

    rows.push({
      quality: t.quality,
      label: t.label,
      sizeMB,
      formats: ['mp4', 'webm', 'mkv'],
    });
  }

  return rows;
}

function buildAudioRows() {
  return [
    { quality: 'best', label: 'Alta calidad (320k)', formats: ['mp3', 'aac', 'm4a'] },
    { quality: 'best', label: 'Estándar (128k)',     formats: ['mp3', 'ogg'] },
    { quality: 'best', label: 'Sin pérdida',         formats: ['flac', 'wav'] },
  ];
}

function download(job) {
  const isAudio = job.mediaType === 'audio';
  const formatSelector = QUALITY_FORMATS[job.quality] || QUALITY_FORMATS['best'];
  const outputTemplate = path.join(DOWNLOAD_DIR, `${job.id}.%(ext)s`);

  const args = [
    '--no-playlist',
    '--ffmpeg-location', FFMPEG_PATH,
    '--newline',
    '--progress-template', '%(progress.downloaded_bytes)s %(progress.total_bytes)s %(progress.speed)s %(progress.eta)s %(progress._percent_str)s',
    '-o', outputTemplate,
  ];

  if (isAudio) {
    args.push('-x', '--audio-format', job.format, '--audio-quality', '0');
  } else {
    args.push('-f', formatSelector);
    if (job.format === 'mp4') {
      args.push('--merge-output-format', 'mp4');
    } else if (job.format === 'webm') {
      args.push('--merge-output-format', 'webm');
    } else if (job.format === 'mkv') {
      args.push('--merge-output-format', 'mkv');
    } else if (job.format === 'avi') {
      args.push('--merge-output-format', 'mkv', '--recode-video', 'avi');
    }
  }

  args.push(job.url);

  jobManager.update(job.id, { state: 'downloading', percent: 0 });

  return new Promise((resolve, reject) => {
    const proc = spawn(YTDLP_PATH, args);
    jobManager.update(job.id, { process: proc });

    let lastFile = null;

    proc.stdout.on('data', data => {
      const lines = data.toString().split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const parts = trimmed.split(/\s+/);
        if (parts.length >= 5) {
          const pct = parseFloat(parts[4]);
          if (!isNaN(pct)) {
            jobManager.update(job.id, {
              percent: Math.round(pct),
              speed: parts[2] !== 'NA' ? parts[2] : null,
              eta: parts[3] !== 'NA' ? parts[3] : null,
            });
          }
        }

        const destMatch = trimmed.match(/\[download\] Destination: (.+)/) ||
                          trimmed.match(/\[Merger\] Merging formats into "(.+)"/) ||
                          trimmed.match(/\[ExtractAudio\] Destination: (.+)/) ||
                          trimmed.match(/\[ffmpeg\] Destination: (.+)/);
        if (destMatch) lastFile = destMatch[1].trim();
      }
    });

    proc.stderr.on('data', data => {
      const text = data.toString();
      const m = text.match(/Destination: (.+)/);
      if (m) lastFile = m[1].trim();
    });

    proc.on('close', code => {
      jobManager.update(job.id, { process: null });
      if (code !== 0 && code !== null) {
        return reject(new Error(`yt-dlp exited with code ${code}`));
      }

      const fs = require('fs');
      if (!lastFile || !fs.existsSync(lastFile)) {
        const files = fs.readdirSync(DOWNLOAD_DIR);
        const match = files.find(f => f.startsWith(job.id));
        if (match) lastFile = path.join(DOWNLOAD_DIR, match);
      }

      if (!lastFile || !require('fs').existsSync(lastFile)) {
        return reject(new Error('Output file not found after download'));
      }

      resolve(lastFile);
    });

    proc.on('error', reject);
  });
}

module.exports = { getInfo, download };
