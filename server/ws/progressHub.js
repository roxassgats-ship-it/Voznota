const { WebSocketServer } = require('ws');
const jobManager = require('../services/jobManager');

function attach(server) {
  const wss = new WebSocketServer({ server, path: '/ws' });
  const subscribers = new Map(); // jobId -> Set<ws>

  function broadcast(jobId, payload) {
    const subs = subscribers.get(jobId);
    if (!subs) return;
    const msg = JSON.stringify({ jobId, ...payload });
    for (const ws of subs) {
      if (ws.readyState === 1) ws.send(msg);
    }
  }

  jobManager.on('progress', ({ jobId, ...data }) => broadcast(jobId, data));

  wss.on('connection', ws => {
    const myJobs = new Set();

    ws.on('message', raw => {
      try {
        const msg = JSON.parse(raw.toString());
        if (msg.subscribe && typeof msg.subscribe === 'string') {
          const id = msg.subscribe;
          if (!subscribers.has(id)) subscribers.set(id, new Set());
          subscribers.get(id).add(ws);
          myJobs.add(id);

          // Send current state immediately
          const job = jobManager.get(id);
          if (job) {
            ws.send(JSON.stringify({
              jobId: id,
              state: job.state,
              percent: job.percent,
              speed: job.speed,
              eta: job.eta,
              error: job.error,
              downloadUrl: job.downloadUrl,
              filename: job.filename,
              title: job.title,
              thumbnail: job.thumbnail,
            }));
          }
        }
      } catch {}
    });

    ws.on('close', () => {
      for (const id of myJobs) {
        const subs = subscribers.get(id);
        if (subs) subs.delete(ws);
        if (subs && subs.size === 0) subscribers.delete(id);
      }
    });
  });

  return wss;
}

module.exports = { attach };
