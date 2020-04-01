// import {registerRoute} from 'workbox-routing';
// import {NetworkFirst} from 'workbox-strategies';
// import {CacheableResponse} from 'workbox-cacheable-response';
//
//
// function cacheResponses() {
//   registerRoute(
//     'https://api.citybik.es/v2/networks',
//     NetworkFirst({
//       cacheName: 'networks-cache',
//       plugins: [
//         new CacheableResponse.Plugin({
//           statuses: [0, 200],
//         })
//       ]
//     })
//   );
// }
//
// window.addEventListener('fetch', () => {
//   cacheResponses();
// });


importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.1d855fadf1ca39377c92c99f3278edc2.js"
);

const cacheableResponse = new workbox.cacheableResponse.Plugin({
  statuses: [0, 200],
  headers: {
    'x-is-cacheable': true,
  },
});

// APIs
workbox.routing.registerRoute(
  'https://api.citybik.es/v2/networks',
  workbox.strategies.networkFirst({
    cacheName: 'networks-cache',
      plugins: [
          cacheableResponse
      ]
  })
);