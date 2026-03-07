// NexaGen CT Simulator — Service Worker
// Cache-first strategy: app works fully offline after first load

const CACHE = 'nexagen-ct-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com'
];

// Install: cache all core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      // Cache local assets (fonts may fail cross-origin — that's fine)
      return cache.addAll(['./', './index.html', './manifest.json'])
        .then(() => cache.add('./icon-192.png').catch(()=>{}))
        .then(() => cache.add('./icon-512.png').catch(()=>{}));
    }).then(() => self.skipWaiting())
  );
});

// Activate: clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first, fall back to network
self.addEventListener('fetch', e => {
  // Only handle GET requests
  if(e.request.method !== 'GET') return;
  
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(response => {
        // Cache successful same-origin responses
        if(response.ok && e.request.url.startsWith(self.location.origin)){
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback — return cached index for navigation
        if(e.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
