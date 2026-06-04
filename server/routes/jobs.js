const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jobManager = require('../services/jobManager');
const { DOWNLOAD_DIR } = require('../config');

router.get('/:id', (req, res) => {
  const job = jobManager.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json({
    id: job.id,
    state: job.state,
    percent: job.percent,
    speed: job.speed,
    eta: job.eta,
    error: job.error,
    downloadUrl: job.downloadUrl,
    filename: job.filename,
    title: job.title,
    thumbnail: job.thumbnail,
  });
});

router.delete('/:id', (req, res) => {
  const cancelled = jobManager.cancel(req.params.id);
  res.json({ ok: cancelled });
});

router.get('/:id/file/:filename', (req, res) => {
  const job = jobManager.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  if (job.state !== 'done') return res.status(409).json({ error: 'Download not complete' });

  const filePath = job.filePath;
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const filename = path.basename(filePath);
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', getContentType(filename));

  const stat = fs.statSync(filePath);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Accept-Ranges', 'bytes');

  // Support range requests for the in-app player
  const range = req.headers.range;
  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : stat.size - 1;
    const chunkSize = end - start + 1;

    res.setHeader('Content-Range', `bytes ${start}-${end}/${stat.size}`);
    res.setHeader('Content-Length', chunkSize);
    res.status(206);

    const stream = fs.createReadStream(filePath, { start, end });
    stream.pipe(res);
  } else {
    fs.createReadStream(filePath).pipe(res);
  }
});

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mkv': 'video/x-matroska',
    '.avi': 'video/x-msvideo',
    '.mp3': 'audio/mpeg',
    '.aac': 'audio/aac',
    '.ogg': 'audio/ogg',
    '.wav': 'audio/wav',
    '.flac': 'audio/flac',
    '.m4a': 'audio/mp4',
  };
  return map[ext] || 'application/octet-stream';
}

module.exports = router;
