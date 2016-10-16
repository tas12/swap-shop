const riot = require('riot')
const sample = require('./tags/js/sample.js')

riot.route.base('/')
riot.route.stop()
riot.route.start(true)

riot.route('/shop', () => {
  riot.mount('#content', sample)
})
