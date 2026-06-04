const UI = (() => {
  const queueList = document.getElementById('queue-list');
  const libraryList = document.getElementById('library-list');
  const libraryEmpty = document.getElementById('library-empty');

  function stateLabel(state) {
    const map = {
      queued: 'En cola',
      downloading: 'Descargando',
      converting: 'Convirtiendo',
      done: 'Listo',
      error: 'Error',
    };
    return map[state] || state;
  }

  function formatSize(bytes) {
    if (!bytes || bytes === 'NA') return '';
    const n = parseInt(bytes);
    if (isNaN(n)) return '';
    if (n > 1e9) return (n / 1e9).toFixed(1) + ' GB';
    if (n > 1e6) return (n / 1e6).toFixed(1) + ' MB';
    return (n / 1e3).toFixed(0) + ' KB';
  }

  function renderQueue(jobs, onCancel, onPlay) {
    queueList.innerHTML = '';
    if (jobs.length === 0) return;

    jobs.forEach(job => {
      const div = document.createElement('div');
      div.className = 'queue-item';
      div.dataset.jobId = job.id;

      const stateClass = `state-${job.state}`;
      const pct = job.percent || 0;

      div.innerHTML = `
        <div class="queue-item-header">
          <span class="queue-title">${escapeHtml(job.title)}</span>
          <span class="queue-state ${stateClass}">${stateLabel(job.state)}</span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="queue-meta">
          <span>${pct}%</span>
          <span>${job.speed || ''} ${job.eta ? `ETA: ${job.eta}` : ''}</span>
        </div>
        ${job.error ? `<div class="error-msg" style="margin-top:8px">${escapeHtml(job.error)}</div>` : ''}
        <div class="queue-actions">
          ${job.state === 'done' ? `<button class="btn-sm play" data-action="play">▶ Reproducir</button>` : ''}
          ${job.state === 'done' ? `<a class="btn-sm" href="${job.downloadUrl}" download="${escapeHtml(job.filename || '')}">⬇ Guardar</a>` : ''}
          ${['queued','downloading','converting'].includes(job.state) ? `<button class="btn-sm cancel" data-action="cancel">✕ Cancelar</button>` : ''}
        </div>
      `;

      div.querySelector('[data-action="cancel"]')?.addEventListener('click', () => onCancel(job.id));
      div.querySelector('[data-action="play"]')?.addEventListener('click', () => onPlay(job));

      queueList.appendChild(div);
    });
  }

  function updateQueueItem(job) {
    const div = queueList.querySelector(`[data-job-id="${job.id}"]`);
    if (!div) return;
    const stateClass = `state-${job.state}`;
    const pct = job.percent || 0;
    const stateEl = div.querySelector('.queue-state');
    const barEl = div.querySelector('.progress-bar-fill');
    const metaEl = div.querySelector('.queue-meta');

    if (stateEl) { stateEl.className = `queue-state ${stateClass}`; stateEl.textContent = stateLabel(job.state); }
    if (barEl) barEl.style.width = `${pct}%`;
    if (metaEl) metaEl.innerHTML = `<span>${pct}%</span><span>${job.speed || ''} ${job.eta ? `ETA: ${job.eta}` : ''}</span>`;
  }

  async function renderLibrary(onPlay, onDelete) {
    const items = await Library.getAll();
    libraryEmpty.classList.toggle('hidden', items.length > 0);
    libraryList.innerHTML = '';

    items.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'library-item';

      const thumb = entry.thumbnail
        ? `<img class="library-thumb" src="${escapeHtml(entry.thumbnail)}" alt="" loading="lazy" />`
        : `<div class="library-thumb-placeholder">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
           </div>`;

      div.innerHTML = `
        ${thumb}
        <div class="library-info">
          <div class="library-name">${escapeHtml(entry.title)}</div>
          <div class="library-meta">${entry.format.toUpperCase()} · ${entry.mediaType === 'audio' ? 'Audio' : 'Video'}</div>
        </div>
        <button class="library-delete" data-action="delete" aria-label="Eliminar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      `;

      div.addEventListener('click', e => {
        if (!e.target.closest('[data-action="delete"]')) onPlay(entry);
      });
      div.querySelector('[data-action="delete"]').addEventListener('click', e => {
        e.stopPropagation();
        onDelete(entry.id);
      });

      libraryList.appendChild(div);
    });
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  return { renderQueue, updateQueueItem, renderLibrary };
})();
