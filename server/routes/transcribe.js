const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { randomUUID } = require('crypto');
const { transcribeFile } = require('../services/transcribe');

const UPLOADS_DIR = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const ALLOWED_EXTS = new Set([
  '.mp4', '.webm', '.mkv', '.avi', '.mov', '.m4v', '.3gp',
  '.mp3', '.aac', '.ogg', '.wav', '.flac', '.m4a', '.wma',
]);

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTS.has(ext)) cb(null, true);
    else cb(new Error(`Unsupported file type: ${ext}`));
  },
});

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const { language = 'auto', model = 'base' } = req.body;
  const validModels = ['tiny', 'base', 'small', 'medium'];
  if (!validModels.includes(model)) {
    return res.status(400).json({ error: `model must be one of: ${validModels.join(', ')}` });
  }

  const filePath = req.file.path;

  try {
    const result = await transcribeFile(filePath, { language: language === 'auto' ? null : language, modelSize: model });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    // Clean up uploaded file after transcription
    fs.unlink(filePath, () => {});
  }
});

// Transcribe a previously downloaded file by jobId
router.post('/job/:jobId', async (req, res) => {
  const jobManager = require('../services/jobManager');
  const job = jobManager.get(req.params.jobId);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  if (job.state !== 'done' || !job.filePath) return res.status(409).json({ error: 'Download not complete' });

  const { language = 'auto', model = 'base' } = req.body;

  try {
    const result = await transcribeFile(job.filePath, {
      language: language === 'auto' ? null : language,
      modelSize: model,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
