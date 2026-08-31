const CACHE='league-os-v15';
const CORE=['./','./index.html','./mobile.css','./manifest.json','./sw.js','./assets/russ-trainer.png','./assets/dj-trainer.png','./assets/coat-of-arms.svg','./assets/friend-guy.svg','./assets/friend-girl.svg','./assets/placeholder-pokemon.svg','./assets/badge-1.svg','./assets/badge-2.svg','./assets/badge-3.svg','./assets/badge-4.svg','./assets/badge-5.svg','./assets/badge-6.svg','./assets/badge-7.svg','./assets/badge-8.svg'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isAppShell = url.pathname.endsWith('/') || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/mobile.css') || url.pathname.endsWith('/sw.js');

  if (isAppShell) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      }))
  );
});
