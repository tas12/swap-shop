// import riot from 'riot'
// import './tags/sample.tag'

const riot = require('riot')
require('./tags/sample.tag')

document.addEventListener('DOMContentLoaded', () => {
  riot.mount('sample')
})
