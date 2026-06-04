const fs = require('fs');
const path = require('path');
const { DOWNLOAD_DIR, CLEANUP_TTL } = require('../config');
const jobManager = require('./jobManager');

function sweep() {
  const now = Date.now();
  let files;
  try {
    files = fs.readdirSync(DOWNLOAD_DIR);
  } catch {
    return;
  }

  for (const file of files) {
    const fp = path.join(DOWNLOAD_DIR, file);
    try {
      const stat = fs.statSync(fp);
      if (now - stat.mtimeMs > CLEANUP_TTL) {
        fs.unlinkSync(fp);
      }
    } catch {}
  }

  jobManager.pruneOld(CLEANUP_TTL);
}

function start() {
  setInterval(sweep, 30 * 60 * 1000); // every 30 min
}

module.exports = { start };
