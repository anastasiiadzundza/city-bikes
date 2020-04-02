const cacheName = 'city-bikes-cache-v1';

const cacheAssets = [
  'index.html'
];


window.addEventListener('install', function (e) {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets)
          .then(function () { window.skipWaiting() });
      })
  )
});

window.addEventListener('activate', function (e) {
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

window.addEventListener('fetch', function (e) {
  console.log('Service Worker: Fetching');
//          e.respondWith(
//            fetch(e.request).catch(function () {caches.match(e.request)  })
//          )

  e.respondWith(
    fetch(e.request)
      .then(function (res) {
        // Make copy/clone of response
        var resClone = res.clone();
        //Open cache
        caches
          .open(cacheName).then(function (cache) {
          //Add response
          cache.put(e.request, resClone);
        });
        return res
      })
      .catch(function (err) {
        caches.match(e.request)
          .then(function (res) {
            return res
          })
      })
  )
})