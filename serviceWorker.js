const myCache = 'swap-shop-4'
//fsf
self.addEventListener('install', (_event) => {
  _event.waitUntil(
    caches.open(myCache)
      .then((cache) => {
        return cache.addAll([
          '/shell',
          'public/build/main.css',
          'public/output/add-bundle.js',
          'public/output/store-bundle.js',
          'public/adapter.js',
          'public/swReg.js',
          'public/manifest.json'
        ])
      })
      .catch((err) => {
        console.log('install', err)
      })
  )
})

self.addEventListener('activate', (_event) => {
  console.log(_event)
  _event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return key.startsWith('swap-shop') && key !== myCache
        }).map(filteredKey => {
          caches.delete(filteredKey)
        })
      )
    })
  )
})

self.addEventListener('fetch', (_event) => {
  const requestUrl = new URL(_event.request.url)
  console.log(requestUrl);
  console.log(requestUrl.origin, location.origin);
  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      _event.respondWith(caches.match('/shell'))
      return
    }
  }

  _event.respondWith(
    caches.match(_event.request).then((response) => {
      console.log(_event.request, response, 'RESPONSE');
      return response || fetch(_event.request)
    }).catch(err => console.log('ERROR', err))
  )
})

self.addEventListener('message', (_event) => {
  if (_event.data.action === 'skip waiting')
    self.skipWaiting()
})

self.addEventListener('controllerchange', () => {
  window.location.reload()
})
