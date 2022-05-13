let coreAssets = ['offline.html', 'style.css', 'home.js', 'place.js', 'sw.js'];

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
          // NOTE: if you don't make a copy of the response, the sw will throw an error that the response is in use, and not cache it.
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
              response || caches.match('offline.html')
          );
        })
    );
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

/**
 * Remove cached items over a certain number
 * @param  {String}  key The cache key
 * @param  {Number} max The max number of items allowed
 */
function trimCache(key, max) {
  caches.open(key).then(function (cache) {
    cache.keys().then(function (keys) {
      if (keys.length <= max) return;
      cache.delete(keys[0]).then(function () {
        trimCache(key, max);
      });
    });
  });
}

let limits = {
  pages: 35,
  imgs: 20,
};

// Trim caches over a certain size
self.addEventListener('message', function (event) {
  // Make sure the event was from a trusted site
  if (event.origin !== 'https://isaacsokari.github.io') return;

  // Only run on cleanUp messages
  if (event.data !== 'cleanUp') return;

  // Trim the cache
  trimCache('pages', limits.pages);
  trimCache('img', limits.imgs);
});
