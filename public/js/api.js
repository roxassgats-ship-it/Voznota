const API = {
  async fetchInfo(url) {
    const res = await fetch('/api/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al obtener información');
    return data;
  },

  async startDownload(params) {
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al iniciar descarga');
    return data; // { jobId }
  },

  async getJob(jobId) {
    const res = await fetch(`/api/jobs/${jobId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al obtener estado');
    return data;
  },

  async cancelJob(jobId) {
    const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' });
    return res.json();
  },

  fileUrl(jobId, filename) {
    return `/api/jobs/${jobId}/file/${encodeURIComponent(filename)}`;
  },
};
