const { combineReducers } = require('redux')

const addViewData = require('./addViewData.js')
const appBar = require('./appBar.js')

module.exports = combineReducers({
  addViewData,
  appBar
})
