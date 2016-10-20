const riot = require('riot')
require('riot-mui')
require('./tags/app.tag')

riot.mount('*')

require('./router.js')
