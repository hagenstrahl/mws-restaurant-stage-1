const staticCacheName = 'restaurant-review-cache-v1';
let _cache;

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            _cache = cache;
            return cache.addAll([
                '/',
                'restaurant.html',
                'js/main.js',
                'js/restaurant_info.js',
                'js/dbhelper.js',
                'css/styles.css',
                'data/restaurants.json'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (!response && event.request.url.includes('restaurant.html')) {
                return fetch(event.request).then((response) => {
                    _cache.put(event.request, response);
                    return response;
                });
            } else if (!response) {
                return fetch(event.request);
            } else {
                return response;
            }
        })
    );
});