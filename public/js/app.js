(() => {
  // ===== State =====
  const state = {
    currentInfo: null,
    mediaType: 'video',
    selectedQuality: 'best',
    selectedFormat: 'mp4',
    jobs: [],
    installPrompt: null,
  };

  const VIDEO_FORMATS = ['mp4', 'webm', 'mkv', 'avi'];
  const AUDIO_FORMATS = ['mp3', 'aac', 'ogg', 'wav', 'flac', 'm4a'];

  // ===== DOM refs =====
  const urlInput = document.getElementById('url-input');
  const pasteBtn = document.getElementById('paste-btn');
  const fetchBtn = document.getElementById('fetch-btn');
  const fetchError = document.getElementById('fetch-error');
  const videoCard = document.getElementById('video-card');
  const videoThumb = document.getElementById('video-thumb');
  const videoDuration = document.getElementById('video-duration');
  const videoTitle = document.getElementById('video-title');
  const videoChannel = document.getElementById('video-channel');
  const optionsPanel = document.getElementById('options-panel');
  const qualityGroup = document.getElementById('quality-group');
  const qualityChips = document.getElementById('quality-chips');
  const formatSelect = document.getElementById('format-select');
  const downloadBtn = document.getElementById('download-btn');
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const tabs = document.querySelectorAll('.tab');
  const installBtn = document.getElementById('install-btn');

  // ===== Install prompt =====
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    state.installPrompt = e;
    installBtn.classList.remove('hidden');
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
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const target = tab.dataset.tab;
      document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
      document.getElementById(`view-${target}`).classList.remove('hidden');

      if (target === 'library') UI.renderLibrary(onPlayLibrary, onDeleteLibrary);
    });
  });

  // ===== Paste =====
  pasteBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      urlInput.value = text;
      urlInput.focus();
    } catch {
      urlInput.focus();
    }
  });

  // ===== Fetch info =====
  fetchBtn.addEventListener('click', fetchVideoInfo);
  urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') fetchVideoInfo(); });

  async function fetchVideoInfo() {
    const url = urlInput.value.trim();
    if (!url) { showError('Ingresa un link de YouTube'); return; }

    fetchError.classList.add('hidden');
    fetchBtn.disabled = true;
    fetchBtn.innerHTML = '<span class="spinner"></span>';

    try {
      const info = await API.fetchInfo(url);
      state.currentInfo = { ...info, url };
      renderVideoCard(info);
      renderOptions(info.availableQualities);
    } catch (err) {
      showError(err.message);
    } finally {
      fetchBtn.disabled = false;
      fetchBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
    }
  }

  function showError(msg) {
    fetchError.textContent = msg;
    fetchError.classList.remove('hidden');
  }

  function renderVideoCard(info) {
    videoThumb.src = info.thumbnail || '';
    videoThumb.onerror = () => { videoThumb.style.display = 'none'; };
    videoDuration.textContent = formatDuration(info.duration);
    videoTitle.textContent = info.title;
    videoChannel.textContent = info.channel;
    videoCard.classList.remove('hidden');
  }

  function renderOptions(qualities) {
    qualityChips.innerHTML = '';
    qualities.forEach(q => {
      const chip = document.createElement('button');
      chip.className = 'chip' + (q === state.selectedQuality ? ' selected' : '');
      chip.textContent = q === 'best' ? 'Mejor' : q;
      chip.dataset.quality = q;
      chip.addEventListener('click', () => {
        state.selectedQuality = q;
        qualityChips.querySelectorAll('.chip').forEach(c => c.classList.toggle('selected', c.dataset.quality === q));
      });
      qualityChips.appendChild(chip);
    });
    updateFormatOptions();
    optionsPanel.classList.remove('hidden');
  }

  // ===== Media type toggle =====
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.mediaType = btn.dataset.type;
      qualityGroup.style.display = state.mediaType === 'audio' ? 'none' : '';
      updateFormatOptions();
    });
  });

  function updateFormatOptions() {
    const formats = state.mediaType === 'audio' ? AUDIO_FORMATS : VIDEO_FORMATS;
    formatSelect.innerHTML = formats.map(f =>
      `<option value="${f}" ${f === state.selectedFormat ? 'selected' : ''}>${f.toUpperCase()}</option>`
    ).join('');
    state.selectedFormat = formatSelect.value;
  }

  formatSelect.addEventListener('change', () => { state.selectedFormat = formatSelect.value; });

  // ===== Download =====
  downloadBtn.addEventListener('click', startDownload);

  async function startDownload() {
    if (!state.currentInfo) return;

    downloadBtn.disabled = true;
    try {
      const { jobId } = await API.startDownload({
        url: state.currentInfo.url,
        quality: state.selectedQuality,
        mediaType: state.mediaType,
        format: state.selectedFormat,
        title: state.currentInfo.title,
        thumbnail: state.currentInfo.thumbnail,
      });

      const job = {
        id: jobId,
        title: state.currentInfo.title,
        thumbnail: state.currentInfo.thumbnail,
        mediaType: state.mediaType,
        format: state.selectedFormat,
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
            mediaType: state.mediaType,
            format: state.selectedFormat,
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
      showError(err.message);
    } finally {
      downloadBtn.disabled = false;
    }
  }

  function renderJobQueue() {
    UI.renderQueue(state.jobs, onCancelJob, onPlayJob);
  }

  function onCancelJob(jobId) {
    API.cancelJob(jobId);
    WS.unsubscribe(jobId);
    state.jobs = state.jobs.filter(j => j.id !== jobId);
    renderJobQueue();
  }

  function onPlayJob(job) {
    Player.open({
      title: job.title,
      fileUrl: job.downloadUrl,
      filename: job.filename,
      mediaType: job.mediaType,
    });
  }

  function onPlayLibrary(entry) {
    Player.open(entry);
  }

  async function onDeleteLibrary(id) {
    await Library.remove(id);
    UI.renderLibrary(onPlayLibrary, onDeleteLibrary);
  }

  function formatDuration(secs) {
    if (!secs) return '';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    return h > 0
      ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
      : `${m}:${String(s).padStart(2,'0')}`;
  }

  // ===== Service Worker =====
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  }
})();
