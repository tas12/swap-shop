const myCache = 'swap-shop-17'
//fsf
self.addEventListener('install', (_event) => {
  _event.waitUntil(
    caches.open(myCache)
      .then((cache) => {
        return cache.addAll([
          '/',
          'public/build/main.css',
          'public/output/bundle.js',
          'public/adapter.js',
          'public/swReg.js'
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
  _event.respondWith(
    caches.match(_event.request).then((response) => {
      return response || fetch(_event.request)

    })
  )
})

self.addEventListener('message', (_event) => {
  if (_event.data.action === 'skip waiting')
    self.skipWaiting()
})

self.addEventListener('controllerchange', () => {
  window.location.reload()
})
