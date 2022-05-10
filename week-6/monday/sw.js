let coreAssets = ['offline.html', 'style.css', 'home.js', 'place.js'];

// Listen for the install event
self.addEventListener('install', function (event) {
  // Activate immediately
  self.skipWaiting();

  // Cache the core assets
  event.waitUntil(
    caches.open('app').then(function (cache) {
      for (let asset of coreAssets) {
        cache.add(new Request(asset));
      }

      return cache;
    })
  );
});

// Listen for request events
self.addEventListener('fetch', function (event) {
  // Get the request
  let request = event.request;

  // Bug fix
  // https://stackoverflow.com/a/49719964
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin')
    return;

  // HTML files w/ Network first strategy
  if (request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return caches.match('offline.html');
        })
    );

    return;
  }

  // CSS & JavaScript w/ Offline first strategy
  if (
    request.headers.get('Accept').includes('text/css') ||
    request.headers.get('Accept').includes('text/javascript')
  ) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return (
          response ||
          fetch(request).then(function (response) {
            return response;
          })
        );
      })
    );
    return;
  }
});
