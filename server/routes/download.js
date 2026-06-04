const express = require('express');
const router = express.Router();
const { validateYouTubeUrl, validateQuality, validateFormat, validateMediaType } = require('../utils/validate');
const jobManager = require('../services/jobManager');

router.post('/', async (req, res) => {
  const { url, quality = 'best', mediaType = 'video', format, title, thumbnail } = req.body;

  if (!url) return res.status(400).json({ error: 'url is required' });

  const checks = [
    validateYouTubeUrl(url),
    validateMediaType(mediaType),
    validateQuality(quality),
    validateFormat(format, mediaType),
  ];
  for (const c of checks) {
    if (!c.valid) return res.status(400).json({ error: c.error });
  }

  const job = jobManager.create({ url, quality, mediaType, format, title, thumbnail });
  res.json({ jobId: job.id });
});

router.get('/', (req, res) => {
  const jobs = [...jobManager.jobs.values()].map(j => ({
    id: j.id,
    title: j.title,
    state: j.state,
    percent: j.percent,
    format: j.format,
    mediaType: j.mediaType,
    downloadUrl: j.downloadUrl,
    filename: j.filename,
    error: j.error,
    createdAt: j.createdAt,
  }));
  res.json(jobs);
});

module.exports = router;
