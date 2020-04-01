import {registerRoute} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';
import {CacheableResponse} from 'workbox-cacheable-response';


function cacheResponses() {
  registerRoute(
    'https://api.citybik.es/v2/networks',
    NetworkFirst({
      cacheName: 'networks-cache',
      plugins: [
        new CacheableResponse.Plugin({
          statuses: [0, 200],
        })
      ]
    })
  );
}

window.addEventListener('fetch', () => {
  cacheResponses();
});