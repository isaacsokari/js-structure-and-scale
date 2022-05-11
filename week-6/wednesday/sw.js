let coreAssets = ['offline.html', 'style.css', 'home.js', 'place.js'];

// Listen for the install event
self.addEventListener('install', function (event) {
  // Activate immediately
  self.skipWaiting();

  // Cache the core assets
  event.waitUntil(
    caches.open('core').then(function (cache) {
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
          let copy = response.clone();
          // add the copy to the cache
          event.waitUntil(
            caches.open('pages').then((cache) => cache.put(request, copy))
          );

          return response;
        })
        .catch(function (error) {
          return caches.match(request).then(
            (response) =>
              // if response is found in cache return it or return the offline page
              response ||
              caches.match('offline.html').then((response) => response)
          );
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

  // Cache Image files as they're requested
  if (request.headers.get('Accept').includes('image')) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return (
          response ||
          fetch(request).then(function (response) {
            // If the request is for an image, save a copy of it in cache
            if (request.headers.get('Accept').includes('image')) {
              let copy = response.clone();
              event.waitUntil(
                caches.open('img').then(function (cache) {
                  return cache.put(request, copy);
                })
              );
            }

            return response;
          })
        );
      })
    );
  }
});
