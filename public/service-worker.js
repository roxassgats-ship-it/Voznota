const CACHE_VERSION = 'v1';
const APP_SHELL = [
  '/',
  '/css/styles.css',
  '/js/api.js',
  '/js/ws.js',
  '/js/library.js',
  '/js/player.js',
  '/js/ui.js',
  '/js/app.js',
  '/manifest.webmanifest',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // API calls: always network
  if (url.pathname.startsWith('/api/')) return;

  // Media files: network-first, cache on success
  if (url.pathname.startsWith('/downloads/') || url.pathname.includes('/file/')) {
    e.respondWith(
      fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(request, clone));
        }
        return res;
      }).catch(() => caches.match(request))
    );
    return;
  }

  // App shell: cache-first
  e.respondWith(
    caches.match(request).then(cached => cached || fetch(request))
  );
});
