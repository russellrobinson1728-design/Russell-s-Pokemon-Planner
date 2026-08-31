const CACHE='league-os-v16';
const CORE=['./','./index.html','./mobile.css','./manifest.json','./sw.js','./assets/russ-trainer.png','./assets/dj-trainer.png','./assets/coat-of-arms.svg','./assets/friend-guy.svg','./assets/friend-girl.svg','./assets/placeholder-pokemon.svg','./assets/badge-1.svg','./assets/badge-2.svg','./assets/badge-3.svg','./assets/badge-4.svg','./assets/badge-5.svg','./assets/badge-6.svg','./assets/badge-7.svg','./assets/badge-8.svg'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

async function fresh(request) {
  const response = await fetch(request, {cache:'no-store'});
  return response;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isHtml = event.request.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
  const isCss = url.pathname.endsWith('/mobile.css');
  const isSw = url.pathname.endsWith('/sw.js');

  if (isHtml) {
    event.respondWith(
      fresh(event.request).then(async response => {
        const html = await response.text();
        const injected = html.includes('mobile.css') ? html : html.replace('</head>', '<link rel="stylesheet" href="mobile.css?v=16"><meta name="mobile-layout" content="v16"></head>');
        return new Response(injected, {status: response.status, statusText: response.statusText, headers: response.headers});
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  if (isCss || isSw) {
    event.respondWith(fresh(event.request).catch(() => caches.match(event.request)));
    return;
  }

  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  })));
});
