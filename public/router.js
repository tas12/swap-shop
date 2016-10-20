const riot = require('riot')

riot.route.base('/')
riot.route.stop()
riot.route.start(true)

riot.route('/', () => {
  riot.mount('#content', 'sample')
})

riot.route('/shop', () => {
  riot.mount('#content', 'sample')
})

riot.route('/add', () => {
  riot.mount('#content', 'add')
})

riot.route('/about', () => {
  riot.mount('#content', '<h2>about<h2>')
})

riot.route('/account', () => {
  riot.mount('#content', '<h2>account<h2>')
})
