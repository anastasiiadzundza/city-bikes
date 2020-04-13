const cacheName = 'city-bikes-cache-v1';

const cacheAssets = [
  'index.html',
];

self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets)
          .then(() => {
            this.skipWaiting()
          });
      })
  )
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        }))
    }))
});

self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cahce
        caches.open(cacheName).then(cache => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});