const cacheName = 'city-bikes-cache-v1';

const cacheAssets = [
  'index.html',
  '/[^/?]+\\\\.[^/]+$'
];


self.addEventListener('install', function (e) {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets)
          .then(function () { this.skipWaiting() });
      })
  )
});

self.addEventListener('activate', function (e) {
  console.log('Service Worker: Activated');
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cache) {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        }))
    }))
});

self.addEventListener('fetch', function (e) {
  console.log('Service Worker: Fetching');
//          e.respondWith(
//            fetch(e.request).catch(function () {caches.match(e.request)  })
//          )

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
})