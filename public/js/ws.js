const WS = (() => {
  let socket = null;
  let reconnectTimer = null;
  const handlers = new Map(); // jobId -> callback[]
  const pendingSubscriptions = new Set();

  function connect() {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    socket = new WebSocket(`${proto}://${location.host}/ws`);

    socket.addEventListener('open', () => {
      clearTimeout(reconnectTimer);
      for (const jobId of pendingSubscriptions) {
        socket.send(JSON.stringify({ subscribe: jobId }));
      }
    });

    socket.addEventListener('message', evt => {
      try {
        const msg = JSON.parse(evt.data);
        const cbs = handlers.get(msg.jobId);
        if (cbs) cbs.forEach(fn => fn(msg));
      } catch {}
    });

    socket.addEventListener('close', () => {
      reconnectTimer = setTimeout(connect, 3000);
    });

    socket.addEventListener('error', () => {
      socket.close();
    });
  }

  function subscribe(jobId, callback) {
    if (!handlers.has(jobId)) handlers.set(jobId, []);
    handlers.get(jobId).push(callback);
    pendingSubscriptions.add(jobId);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ subscribe: jobId }));
    }
  }

  function unsubscribe(jobId) {
    handlers.delete(jobId);
    pendingSubscriptions.delete(jobId);
  }

  connect();
  return { subscribe, unsubscribe };
})();
