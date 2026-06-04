const Transcribe = (() => {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const pickBtn = document.getElementById('pick-file-btn');
  const selectedFilename = document.getElementById('selected-filename');
  const langSelect = document.getElementById('lang-select');
  const modelSelect = document.getElementById('model-select');
  const transcribeBtn = document.getElementById('transcribe-btn');
  const progressEl = document.getElementById('transcribe-progress');
  const statusEl = document.getElementById('transcribe-status');
  const errorEl = document.getElementById('transcribe-error');
  const resultSection = document.getElementById('transcribe-result');
  const transcriptArea = document.getElementById('transcript-text');
  const copyBtn = document.getElementById('copy-btn');
  const downloadTxtBtn = document.getElementById('download-txt-btn');
  const sendWebhookBtn = document.getElementById('send-webhook-btn');
  const webhookPanel = document.getElementById('webhook-panel');
  const webhookUrl = document.getElementById('webhook-url');
  const webhookField = document.getElementById('webhook-field');
  const sendNowBtn = document.getElementById('send-now-btn');
  const webhookStatus = document.getElementById('webhook-status');
  const resultLang = document.getElementById('result-lang');
  const resultDuration = document.getElementById('result-duration');
  const segmentsList = document.getElementById('segments-list');
  const resultLangBadge = document.getElementById('result-lang');

  let selectedFile = null;
  let currentResult = null;

  // ===== File selection =====
  pickBtn.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('click', e => {
    if (e.target === dropZone || e.target.id === 'drop-zone-inner') fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) setFile(fileInput.files[0]);
  });

  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  });

  function setFile(file) {
    selectedFile = file;
    selectedFilename.textContent = file.name;
    selectedFilename.classList.remove('hidden');
    transcribeBtn.disabled = false;
    errorEl.classList.add('hidden');
    resultSection.classList.add('hidden');
  }

  // ===== Transcribe =====
  transcribeBtn.addEventListener('click', runTranscription);

  async function runTranscription() {
    if (!selectedFile) return;

    transcribeBtn.disabled = true;
    progressEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    resultSection.classList.add('hidden');

    const statuses = [
      'Subiendo archivo...',
      'Cargando modelo de IA...',
      'Transcribiendo audio...',
      'Procesando texto...',
    ];
    let si = 0;
    statusEl.textContent = statuses[si];
    const statusTimer = setInterval(() => {
      si = Math.min(si + 1, statuses.length - 1);
      statusEl.textContent = statuses[si];
    }, 4000);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('language', langSelect.value);
      formData.append('model', modelSelect.value);

      const res = await fetch('/api/transcribe', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Transcription failed');
      showResult(data);
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.classList.remove('hidden');
    } finally {
      clearInterval(statusTimer);
      progressEl.classList.add('hidden');
      transcribeBtn.disabled = false;
    }
  }

  // Called from queue: transcribe an already-downloaded job
  async function transcribeJob(jobId, title) {
    progressEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    resultSection.classList.add('hidden');
    statusEl.textContent = 'Transcribiendo descarga...';

    // Switch to transcribe tab
    document.querySelector('[data-tab="transcribe"]').click();

    try {
      const res = await fetch(`/api/transcribe/job/${jobId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: langSelect.value, model: modelSelect.value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Transcription failed');
      showResult(data, title);
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.classList.remove('hidden');
    } finally {
      progressEl.classList.add('hidden');
    }
  }

  function showResult(data, title) {
    currentResult = data;
    transcriptArea.value = data.text || '';

    const langNames = { es:'Español', en:'English', pt:'Português', fr:'Français', de:'Deutsch', it:'Italiano', ja:'日本語', zh:'中文' };
    resultLang.textContent = langNames[data.language] || (data.language || '').toUpperCase();

    if (data.duration) {
      const m = Math.floor(data.duration / 60);
      const s = Math.floor(data.duration % 60);
      resultDuration.textContent = `${m}:${String(s).padStart(2,'0')}`;
      resultDuration.classList.remove('hidden');
    }

    // Render segments
    segmentsList.innerHTML = '';
    if (Array.isArray(data.segments)) {
      data.segments.forEach(seg => {
        const div = document.createElement('div');
        div.className = 'segment-item';
        const fmt = t => `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;
        div.innerHTML = `<span class="segment-time">${fmt(seg.start)} → ${fmt(seg.end)}</span><span>${seg.text}</span>`;
        segmentsList.appendChild(div);
      });
    }

    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ===== Copy =====
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(transcriptArea.value);
      copyBtn.textContent = '✓ Copiado';
      setTimeout(() => { copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copiar'; }, 2000);
    } catch {
      copyBtn.textContent = 'Error';
    }
  });

  // ===== Download TXT =====
  downloadTxtBtn.addEventListener('click', () => {
    const blob = new Blob([transcriptArea.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcripcion.txt';
    a.click();
    URL.revokeObjectURL(url);
  });

  // ===== Send to webhook =====
  sendWebhookBtn.addEventListener('click', () => {
    webhookPanel.classList.toggle('hidden');
  });

  sendNowBtn.addEventListener('click', async () => {
    const url = webhookUrl.value.trim();
    if (!url) { webhookStatus.textContent = 'Ingresa una URL'; webhookStatus.className = 'webhook-status err'; return; }

    const field = webhookField.value.trim() || 'text';
    const body = {
      [field]: transcriptArea.value,
      language: currentResult?.language,
      segments: currentResult?.segments,
      timestamp: new Date().toISOString(),
    };

    try {
      sendNowBtn.disabled = true;
      webhookStatus.textContent = 'Enviando...';
      webhookStatus.className = 'webhook-status';

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        webhookStatus.textContent = `✓ Enviado (${res.status})`;
        webhookStatus.className = 'webhook-status';
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      webhookStatus.textContent = `Error: ${err.message}`;
      webhookStatus.className = 'webhook-status err';
    } finally {
      sendNowBtn.disabled = false;
    }
  });

  return { transcribeJob };
})();
