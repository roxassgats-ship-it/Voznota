(() => {
  // ===== State =====
  const state = {
    currentInfo: null,
    jobs: [],
    installPrompt: null,
  };

  // ===== DOM =====
  const urlInput   = document.getElementById('url-input');
  const pasteBtn   = document.getElementById('paste-btn');
  const fetchBtn   = document.getElementById('fetch-btn');
  const fetchLabel = document.getElementById('fetch-label');
  const fetchSpinner = document.getElementById('fetch-spinner');
  const fetchError = document.getElementById('fetch-error');
  const videoCard  = document.getElementById('video-card');
  const vcThumb    = document.getElementById('vc-thumb');
  const vcDuration = document.getElementById('vc-duration');
  const vcTitle    = document.getElementById('vc-title');
  const vcChannel  = document.getElementById('vc-channel');
  const fmtSection = document.getElementById('formats-section');
  const videoRows  = document.getElementById('video-format-rows');
  const audioRows  = document.getElementById('audio-format-rows');
  const tabs       = document.querySelectorAll('.tab');
  const installBtn = document.getElementById('install-btn');

  // ===== Install =====
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault(); state.installPrompt = e; installBtn.classList.remove('hidden');
  });
  installBtn.addEventListener('click', async () => {
    if (!state.installPrompt) return;
    state.installPrompt.prompt();
    const { outcome } = await state.installPrompt.userChoice;
    if (outcome === 'accepted') installBtn.classList.add('hidden');
    state.installPrompt = null;
  });

  // ===== Tabs =====
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
      document.getElementById(`view-${target}`).classList.remove('hidden');
      if (target === 'library') UI.renderLibrary(onPlayLibrary, onDeleteLibrary);
    });
  });

  // ===== Paste =====
  pasteBtn.addEventListener('click', async () => {
    try { urlInput.value = await navigator.clipboard.readText(); } catch {}
    urlInput.focus();
  });

  // ===== Fetch info =====
  fetchBtn.addEventListener('click', fetchVideoInfo);
  urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') fetchVideoInfo(); });

  async function fetchVideoInfo() {
    const url = urlInput.value.trim();
    if (!url) { showError('Ingresa un link de YouTube'); return; }

    setFetching(true);
    fetchError.classList.add('hidden');
    fmtSection.classList.add('hidden');
    videoCard.classList.add('hidden');

    try {
      const info = await API.fetchInfo(url);
      state.currentInfo = { ...info, url };
      renderVideoCard(info);
      renderFormatTable(info);
    } catch (err) {
      showError(err.message);
    } finally {
      setFetching(false);
    }
  }

  function setFetching(on) {
    fetchBtn.disabled = on;
    fetchLabel.classList.toggle('hidden', on);
    fetchSpinner.classList.toggle('hidden', !on);
  }

  function showError(msg) {
    fetchError.textContent = msg;
    fetchError.classList.remove('hidden');
  }

  // ===== Video card =====
  function renderVideoCard(info) {
    vcThumb.src = info.thumbnail || '';
    vcThumb.onerror = () => { vcThumb.style.display = 'none'; };
    vcDuration.textContent = fmtDuration(info.duration);
    vcTitle.textContent = info.title;
    vcChannel.textContent = info.channel;
    videoCard.classList.remove('hidden');
  }

  // ===== Format table (i2mate style) =====
  function renderFormatTable(info) {
    videoRows.innerHTML = '';
    audioRows.innerHTML = '';

    // Video rows
    (info.videoRows || []).forEach(row => {
      const div = document.createElement('div');
      div.className = 'format-row';
      const btns = row.formats.map(fmt =>
        `<button class="format-btn" data-quality="${row.quality}" data-type="video" data-fmt="${fmt}">${fmt.toUpperCase()}</button>`
      ).join('');
      div.innerHTML = `
        <div class="format-quality">
          <div class="format-quality-label">${row.label}</div>
          ${row.sizeMB ? `<div class="format-quality-size">~${row.sizeMB} MB</div>` : ''}
        </div>
        <div class="format-btns">${btns}</div>
      `;
      videoRows.appendChild(div);
    });

    // Audio rows
    (info.audioRows || []).forEach(row => {
      const div = document.createElement('div');
      div.className = 'format-row';
      const btns = row.formats.map(fmt =>
        `<button class="format-btn" data-quality="${row.quality}" data-type="audio" data-fmt="${fmt}">${fmt.toUpperCase()}</button>`
      ).join('');
      div.innerHTML = `
        <div class="format-quality">
          <div class="format-quality-label">${row.label}</div>
        </div>
        <div class="format-btns">${btns}</div>
      `;
      audioRows.appendChild(div);
    });

    // Attach click handlers to all format buttons
    fmtSection.querySelectorAll('.format-btn').forEach(btn => {
      btn.addEventListener('click', () => startDownload(
        btn.dataset.quality,
        btn.dataset.type,
        btn.dataset.fmt,
        btn
      ));
    });

    fmtSection.classList.remove('hidden');
    fmtSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ===== Download =====
  async function startDownload(quality, mediaType, format, btnEl) {
    if (!state.currentInfo) return;

    btnEl.disabled = true;
    btnEl.classList.add('downloading');
    const origText = btnEl.textContent;
    btnEl.textContent = '...';

    try {
      const { jobId } = await API.startDownload({
        url: state.currentInfo.url,
        quality,
        mediaType,
        format,
        title: state.currentInfo.title,
        thumbnail: state.currentInfo.thumbnail,
      });

      const job = {
        id: jobId,
        title: state.currentInfo.title,
        thumbnail: state.currentInfo.thumbnail,
        mediaType,
        format,
        quality,
        state: 'queued',
        percent: 0,
        speed: null,
        eta: null,
        downloadUrl: null,
        filename: null,
        error: null,
      };

      state.jobs.unshift(job);
      renderJobQueue();

      // Restore button
      btnEl.disabled = false;
      btnEl.classList.remove('downloading');
      btnEl.textContent = origText;

      WS.subscribe(jobId, msg => {
        const idx = state.jobs.findIndex(j => j.id === jobId);
        if (idx === -1) return;
        Object.assign(state.jobs[idx], msg);
        UI.updateQueueItem(state.jobs[idx]);

        if (msg.state === 'done') {
          WS.unsubscribe(jobId);
          Library.save({
            id: jobId,
            title: state.currentInfo.title,
            thumbnail: state.currentInfo.thumbnail,
            mediaType,
            format,
            fileUrl: msg.downloadUrl,
            filename: msg.filename,
            savedAt: Date.now(),
          });
          renderJobQueue();
        }

        if (msg.state === 'error') {
          WS.unsubscribe(jobId);
          renderJobQueue();
        }
      });
    } catch (err) {
      btnEl.disabled = false;
      btnEl.classList.remove('downloading');
      btnEl.textContent = origText;
      showError(err.message);
    }
  }

  function renderJobQueue() {
    UI.renderQueue(
      state.jobs,
      id => {
        API.cancelJob(id);
        WS.unsubscribe(id);
        state.jobs = state.jobs.filter(j => j.id !== id);
        renderJobQueue();
      },
      job => Player.open({ title: job.title, fileUrl: job.downloadUrl, filename: job.filename, mediaType: job.mediaType }),
      job => Transcribe.transcribeJob(job.id, job.title)
    );
  }

  function onPlayLibrary(entry) { Player.open(entry); }

  async function onDeleteLibrary(id) {
    await Library.remove(id);
    UI.renderLibrary(onPlayLibrary, onDeleteLibrary);
  }

  function fmtDuration(secs) {
    if (!secs) return '';
    const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = Math.floor(secs % 60);
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
  }
  const pad = n => String(n).padStart(2, '0');

  // ===== Service Worker =====
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  }
})();
