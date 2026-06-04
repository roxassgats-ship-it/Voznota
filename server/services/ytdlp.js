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
        const qualities = extractQualities(data);
        resolve({
          title: data.title || 'Unknown',
          channel: data.uploader || data.channel || '',
          duration: data.duration || 0,
          thumbnail: data.thumbnail || null,
          availableQualities: qualities,
        });
      } catch (e) {
        reject(new Error('Failed to parse yt-dlp output'));
      }
    });
    proc.on('error', reject);
  });
}

function extractQualities(data) {
  const heights = new Set();
  if (Array.isArray(data.formats)) {
    data.formats.forEach(f => { if (f.height) heights.add(f.height); });
  }
  const tiers = [360, 480, 720, 1080];
  const available = ['best'];
  for (const t of tiers) {
    if ([...heights].some(h => h >= t)) available.push(`${t}p`);
  }
  return available;
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

        // Parse progress line: bytes total speed eta percent
        const parts = trimmed.split(/\s+/);
        if (parts.length >= 5) {
          const percentStr = parts[4];
          const pct = parseFloat(percentStr);
          if (!isNaN(pct)) {
            jobManager.update(job.id, {
              percent: Math.round(pct),
              speed: parts[2] !== 'NA' ? parts[2] : null,
              eta: parts[3] !== 'NA' ? parts[3] : null,
            });
          }
        }

        // Detect output filename
        const destMatch = trimmed.match(/\[download\] Destination: (.+)/) ||
                          trimmed.match(/\[Merger\] Merging formats into "(.+)"/) ||
                          trimmed.match(/\[ExtractAudio\] Destination: (.+)/) ||
                          trimmed.match(/\[ffmpeg\] Destination: (.+)/);
        if (destMatch) lastFile = destMatch[1].trim();
      }
    });

    proc.stderr.on('data', data => {
      const text = data.toString();
      if (text.includes('[download] Destination:') || text.includes('Destination:')) {
        const m = text.match(/Destination: (.+)/);
        if (m) lastFile = m[1].trim();
      }
    });

    proc.on('close', code => {
      jobManager.update(job.id, { process: null });
      if (code !== 0 && code !== null) {
        return reject(new Error(`yt-dlp exited with code ${code}`));
      }

      // Find the actual output file
      const fs = require('fs');
      if (!lastFile || !fs.existsSync(lastFile)) {
        // Scan downloads dir for files matching job id
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
