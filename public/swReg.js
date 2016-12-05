if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/serviceWorker.js')
    .then((reg) => {
      console.log('service worker registered', reg.scope)
      if (!navigator.serviceWorker.controller)
        return

      if (reg.waiting) {
        document.querySelector('.toast').style.display = ''
        document.querySelector('#refresh').addEventListener('click', () => {
          reg.waiting.postMessage({
            action: 'skip waiting'
          })
        })
        return
      }

      if (reg.installing) {
        reg.installing.addEventListener('statechange', () => {
          if (this.state === 'installed') {
            document.querySelector('.toast').style.display = ''
            document.querySelector('#refresh').addEventListener('click', () => {
              reg.installing.postMessage({
                action: 'skip waiting'
              })
            })
          }
        })
        return
      }

      reg.addEventListener('updatefound', () => {
        reg.installing.addEventListener('statechange', () => {
          if (this.state === 'installed') {
            document.querySelector('.toast').style.display = ''
            document.querySelector('#refresh').addEventListener('click', () => {
              reg.installing.postMessage({
                action: 'skip waiting'
              })
            })
          }
        })
      })
    })
    .catch((err) => console.log('reg err', err))
}
