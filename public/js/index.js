const riot = require('riot')
const redux = require('redux')

require('riot-mui')
require('../tags/app.tag')

const reduxStore = redux.createStore(require('./reducers/index.js'))

require('./router.js')(reduxStore)

riot.mount('*', { store: reduxStore })
