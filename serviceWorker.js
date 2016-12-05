const myCache = 'swap-shop-3'

self.addEventListener('install', (_event) => {
  _event.waitUntil(
    caches.open(myCache)
      .then((cache) => {
        return cache.addAll([
          '/shell',
          'public/build/main.css',
          'public/adapter.js',
          'public/swReg.js',
          'public/manifest.json',
          'public/output/index-bundle.js',
          'public/build/riot-mui.min.css'
        ])
      })
      .catch((err) => {
        console.log('install', err)
      })
  )
})

self.addEventListener('activate', (_event) => {
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
  const paths = ['/', '/shop', '/add', '/about', '/account']
  const requestUrl = new URL(_event.request.url)
  if (requestUrl.origin === location.origin) {
    if (paths.indexOf(requestUrl.pathname) > -1) {
      _event.respondWith(caches.match('/shell'))
      return
    }
  }

  _event.respondWith(
    caches.match(_event.request).then((response) => {
      return response || fetch(_event.request)
    }).catch(err => console.log('ERROR', err))
  )
})

self.addEventListener('message', (_event) => {
  if (_event.data.action === 'skip waiting') {
    self.skipWaiting()

  }
})

self.addEventListener('controllerchange', () => {
  window.location.reload()
})
