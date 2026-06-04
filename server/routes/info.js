const express = require('express');
const router = express.Router();
const { validateYouTubeUrl } = require('../utils/validate');
const ytdlp = require('../services/ytdlp');

router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'url is required' });

  const check = validateYouTubeUrl(url);
  if (!check.valid) return res.status(400).json({ error: check.error });

  try {
    const info = await ytdlp.getInfo(url);
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch video info' });
  }
});

module.exports = router;
