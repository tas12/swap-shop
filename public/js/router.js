const riot = require('riot')

riot.route.base('/')
riot.route.stop()
riot.route.start(true)

riot.route('/', () => {
  riot.mount('#content', 'shop')
})

riot.route('/shop', () => {
  riot.mount('#content', 'shop')
})

riot.route('/add', () => {
  riot.mount('#content', 'add-item')
})

riot.route('/about', () => {
  riot.mount('#content', 'about')
})

riot.route('/account', () => {
  riot.mount('#content', 'account')
})
