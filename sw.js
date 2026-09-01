const CACHE='league-os-v9';
const ASSETS=['./','./index.html','./manifest.json','./assets/russ-hero.png','./assets/dj-hero.png','./assets/russ-sprite-sheet.png','./assets/dj-sprite-sheet.png','./assets/badge-1.png','./assets/badge-2.png','./assets/badge-3.png','./assets/badge-4.png','./assets/badge-5.png','./assets/badge-6.png','./assets/badge-7.png','./assets/badge-8.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(e.request.url.startsWith(self.location.origin)){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));}return r}).catch(()=>caches.match(e.request)));});
