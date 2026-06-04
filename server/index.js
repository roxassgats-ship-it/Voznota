const http = require('http');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { PORT, DOWNLOAD_DIR } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

// Serve PWA static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/info', require('./routes/info'));
app.use('/api/download', require('./routes/download'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/file', require('./routes/jobs'));
app.use('/api/transcribe', require('./routes/transcribe'));

// Fallback: serve index.html for any non-API route (SPA)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
});

const server = http.createServer(app);

// WebSocket progress hub
require('./ws/progressHub').attach(server);

// File cleanup scheduler
require('./services/cleanup').start();

// Start job queue listener
const jobManager = require('./services/jobManager');
const ytdlp = require('./services/ytdlp');

jobManager.on('start', async (job) => {
  try {
    const filePath = await ytdlp.download(job);
    const filename = require('path').basename(filePath);
    const downloadUrl = `/api/jobs/${job.id}/file/${encodeURIComponent(filename)}`;
    jobManager.markDone(job.id, downloadUrl, filePath, filename);
  } catch (err) {
    jobManager.markError(job.id, err.message);
  }
});

server.listen(PORT, () => {
  console.log(`Voznota running at http://localhost:${PORT}`);
});
