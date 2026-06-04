const Player = (() => {
  const overlay = document.getElementById('player-overlay');
  const videoEl = document.getElementById('player-video');
  const audioEl = document.getElementById('player-audio');
  const titleEl = document.getElementById('player-title');
  const closeBtn = document.getElementById('player-close');
  const speedSel = document.getElementById('speed-select');
  const dlLink = document.getElementById('player-download-link');

  function open(entry) {
    const isAudio = entry.mediaType === 'audio';
    const url = entry.fileUrl;

    titleEl.textContent = entry.title;
    dlLink.href = url;
    dlLink.download = entry.filename;

    if (isAudio) {
      videoEl.hidden = true;
      videoEl.pause();
      videoEl.src = '';
      audioEl.hidden = false;
      audioEl.src = url;
      audioEl.load();
      audioEl.play().catch(() => {});
    } else {
      audioEl.hidden = true;
      audioEl.pause();
      audioEl.src = '';
      videoEl.hidden = false;
      videoEl.src = url;
      videoEl.load();
      videoEl.play().catch(() => {});
    }

    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    videoEl.pause();
    videoEl.src = '';
    audioEl.pause();
    audioEl.src = '';
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', close);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) close();
  });

  speedSel.addEventListener('change', () => {
    const v = parseFloat(speedSel.value);
    videoEl.playbackRate = v;
    audioEl.playbackRate = v;
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  return { open, close };
})();
