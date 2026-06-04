const UI = (() => {
  const queueList = document.getElementById('queue-list');
  const libraryList = document.getElementById('library-list');
  const libraryEmpty = document.getElementById('library-empty');

  const STATE_LABELS = {
    queued:      'En cola',
    downloading: 'Descargando',
    converting:  'Convirtiendo',
    done:        'Listo',
    error:       'Error',
  };

  function renderQueue(jobs, onCancel, onPlay, onTranscribe) {
    queueList.innerHTML = '';
    jobs.forEach(job => {
      const div = document.createElement('div');
      div.className = 'queue-item';
      div.dataset.jobId = job.id;

      const pct = job.percent || 0;
      const stateClass = `s-${job.state}`;

      div.innerHTML = `
        <div class="queue-item-header">
          <span class="queue-title">${esc(job.title)}</span>
          <span class="queue-badge ${stateClass}">${STATE_LABELS[job.state] || job.state}</span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="queue-meta">
          <span>${pct}% · ${esc(job.format?.toUpperCase())} ${job.mediaType === 'audio' ? '🎵' : '🎬'}</span>
          <span>${job.speed ? esc(job.speed) : ''} ${job.eta ? `ETA ${esc(job.eta)}` : ''}</span>
        </div>
        ${job.error ? `<div class="error-msg" style="margin-top:7px">${esc(job.error)}</div>` : ''}
        <div class="queue-actions">
          ${job.state === 'done' ? `<button class="btn-sm play" data-act="play">▶ Reproducir</button>` : ''}
          ${job.state === 'done' ? `<a class="btn-sm" href="${esc(job.downloadUrl)}" download="${esc(job.filename || '')}">⬇ Guardar</a>` : ''}
          ${job.state === 'done' && job.mediaType !== 'audio' ? `<button class="btn-sm transcribe-q" data-act="transcribe">🎙 Transcribir</button>` : ''}
          ${job.state === 'done' && job.mediaType === 'audio' ? `<button class="btn-sm transcribe-q" data-act="transcribe">🎙 Transcribir</button>` : ''}
          ${['queued','downloading','converting'].includes(job.state) ? `<button class="btn-sm cancel" data-act="cancel">✕ Cancelar</button>` : ''}
        </div>
      `;

      div.querySelector('[data-act="cancel"]')?.addEventListener('click', () => onCancel(job.id));
      div.querySelector('[data-act="play"]')?.addEventListener('click', () => onPlay(job));
      div.querySelector('[data-act="transcribe"]')?.addEventListener('click', () => onTranscribe(job));

      queueList.appendChild(div);
    });
  }

  function updateQueueItem(job) {
    const div = queueList.querySelector(`[data-job-id="${job.id}"]`);
    if (!div) return;
    const pct = job.percent || 0;
    const stateEl = div.querySelector('.queue-badge');
    const barEl   = div.querySelector('.progress-bar-fill');
    const metaEl  = div.querySelector('.queue-meta');

    if (stateEl) { stateEl.className = `queue-badge s-${job.state}`; stateEl.textContent = STATE_LABELS[job.state] || job.state; }
    if (barEl)  barEl.style.width = `${pct}%`;
    if (metaEl) metaEl.innerHTML =
      `<span>${pct}% · ${esc(job.format?.toUpperCase() || '')} ${job.mediaType === 'audio' ? '🎵' : '🎬'}</span>` +
      `<span>${job.speed ? esc(job.speed) : ''} ${job.eta ? `ETA ${esc(job.eta)}` : ''}</span>`;
  }

  async function renderLibrary(onPlay, onDelete) {
    const items = await Library.getAll();
    libraryEmpty.classList.toggle('hidden', items.length > 0);
    libraryList.innerHTML = '';

    items.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'library-item';

      const thumb = entry.thumbnail
        ? `<img class="library-thumb" src="${esc(entry.thumbnail)}" alt="" loading="lazy" />`
        : `<div class="library-thumb-placeholder"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></div>`;

      div.innerHTML = `
        ${thumb}
        <div class="library-info">
          <div class="library-name">${esc(entry.title)}</div>
          <div class="library-meta">${esc(entry.format?.toUpperCase())} · ${entry.mediaType === 'audio' ? 'Audio' : 'Video'}</div>
        </div>
        <button class="library-delete" data-act="delete" aria-label="Eliminar">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      `;

      div.addEventListener('click', e => { if (!e.target.closest('[data-act="delete"]')) onPlay(entry); });
      div.querySelector('[data-act="delete"]').addEventListener('click', e => { e.stopPropagation(); onDelete(entry.id); });

      libraryList.appendChild(div);
    });
  }

  function esc(str) {
    return String(str || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  return { renderQueue, updateQueueItem, renderLibrary };
})();
