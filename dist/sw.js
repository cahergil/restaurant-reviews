let staticCacheName = 'restaurant-cache-v1';

self.addEventListener('install', (event) => {

  event.waitUntil(
    caches.open(staticCacheName).then( (cache) => {
      return cache.addAll([
        // '/',
        'index.html',
        'restaurant.html',
        'js/main.js',
        'js/restaurant_info.js',
        'js/dbhelper.js',
        'css/styles.css',
        'css/responsive.css',
        'data/restaurants.json',
        'img/1_large_1x.jpg',
        'img/1_large_2x.jpg',
        'img/1_medium.jpg',
        'img/2_large_1x.jpg',
        'img/2_large_2x.jpg',
        'img/2_medium.jpg',
        'img/3_large_1x.jpg',
        'img/3_large_2x.jpg',
        'img/3_medium.jpg',
        'img/4_large_1x.jpg',
        'img/4_large_2x.jpg',
        'img/4_medium.jpg',
        'img/5_large_1x.jpg',
        'img/5_large_2x.jpg',
        'img/5_medium.jpg',
        'img/6_large_1x.jpg',
        'img/6_large_2x.jpg',
        'img/6_medium.jpg',
        'img/7_large_1x.jpg',
        'img/7_large_2x.jpg',
        'img/7_medium.jpg',
        'img/8_large_1x.jpg',
        'img/8_large_2x.jpg',
        'img/8_medium.jpg',
        'img/9_large_1x.jpg',
        'img/9_large_2x.jpg',
        'img/9_medium.jpg',
        'img/10_large_1x.jpg',
        'img/10_large_2x.jpg',
        'img/10_medium.jpg',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
        'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png'

      ]);
    })
  );
  self.skipWaiting();
});


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then( (cacheNames) => {
      return Promise.all(
        cacheNames.filter( (cacheName) => {
          return cacheName.startsWith('restaurant-cache') &&
                 cacheName != staticCacheName;
        }).map( (cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('restaurant-cache-v1').then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          //if(event.request.method !='POST') {
              cache.put(event.request, response.clone());
              return response;
            //}
        });
      });
    })
  );
});
