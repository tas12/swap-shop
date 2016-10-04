const path = require('path')

module.exports = {
  entry: './public/script.js',
  output: {
    path: path.join(__dirname, 'public', 'output'),
    filename: 'bundle.js'
  }
}
