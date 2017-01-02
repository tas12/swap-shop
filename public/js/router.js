const riot = require('riot')

riot.route.base('/')
riot.route.stop()
riot.route.start(true)

module.exports = (store) => {

  riot.route('/', () => {
    riot.mount('#content', 'shop', { store })
  })

  riot.route('/shop', () => {
    riot.mount('#content', 'shop', { store })
  })

  riot.route('/about', () => {
    riot.mount('#content', 'about', { store })
  })

  riot.route('/account', () => {
    riot.mount('#content', 'account', { store })
  })

  riot.route('/messages', () => {
    riot.mount('#content', 'messages', { store })
  })

}
