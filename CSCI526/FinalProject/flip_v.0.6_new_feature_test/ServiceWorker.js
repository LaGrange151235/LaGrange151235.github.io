const cacheName = "Team Flip-Flip-1.0";
const contentToCache = [
    "Build/62f83d966fa4fe8130303d5bd811a39b.loader.js",
    "Build/f5e2320411c9bef425221c973b8758e1.framework.js",
    "Build/604e766ed323c35ac783bec054fd871d.data",
    "Build/480d0f51b14f6b1b598287fdec84d342.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
