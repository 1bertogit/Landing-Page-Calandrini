// Service Worker for Face & Nose Code
const CACHE_NAME = 'face-nose-code-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/assets/css/main.css',
  '/src/assets/css/animations.css',
  '/src/assets/css/responsive.css',
  '/src/assets/js/main.js',
  '/src/assets/js/i18n.js',
  '/src/assets/js/performance.js',
  '/src/assets/js/form-validation.js',
  '/src/i18n/pt-BR.js',
  '/src/i18n/en-US.js',
  '/src/i18n/es-ES.js',
  '/src/assets/images/dr-calandrini.webp'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Cache install failed:', err);
      })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Offline fallback
        return caches.match('/index.html');
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});