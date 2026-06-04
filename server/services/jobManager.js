const { EventEmitter } = require('events');
const { randomUUID } = require('crypto');
const { MAX_CONCURRENT } = require('../config');

class JobManager extends EventEmitter {
  constructor() {
    super();
    this.jobs = new Map();
    this.queue = [];
    this.active = 0;
  }

  create(params) {
    const id = randomUUID();
    const job = {
      id,
      url: params.url,
      quality: params.quality,
      mediaType: params.mediaType,
      format: params.format,
      state: 'queued',
      percent: 0,
      speed: null,
      eta: null,
      error: null,
      downloadUrl: null,
      filePath: null,
      filename: null,
      title: params.title || 'Unknown',
      thumbnail: params.thumbnail || null,
      createdAt: Date.now(),
      process: null,
    };
    this.jobs.set(id, job);
    this.queue.push(id);
    this._flush();
    return job;
  }

  get(id) {
    return this.jobs.get(id);
  }

  update(id, patch) {
    const job = this.jobs.get(id);
    if (!job) return;
    Object.assign(job, patch);
    this.emit('progress', { jobId: id, ...patch });
  }

  cancel(id) {
    const job = this.jobs.get(id);
    if (!job) return false;
    if (job.process) {
      try { job.process.kill('SIGTERM'); } catch {}
    }
    this.queue = this.queue.filter(q => q !== id);
    this.jobs.delete(id);
    return true;
  }

  _flush() {
    while (this.active < MAX_CONCURRENT && this.queue.length > 0) {
      const id = this.queue.shift();
      const job = this.jobs.get(id);
      if (!job) continue;
      this.active++;
      this.emit('start', job);
    }
  }

  _finish(id) {
    this.active = Math.max(0, this.active - 1);
    this._flush();
  }

  markDone(id, downloadUrl, filePath, filename) {
    this.update(id, { state: 'done', percent: 100, downloadUrl, filePath, filename });
    this._finish(id);
  }

  markError(id, error) {
    this.update(id, { state: 'error', error: String(error) });
    this._finish(id);
  }

  pruneOld(ttl) {
    const now = Date.now();
    for (const [id, job] of this.jobs.entries()) {
      if (['done', 'error'].includes(job.state) && now - job.createdAt > ttl) {
        this.jobs.delete(id);
      }
    }
  }
}

module.exports = new JobManager();
