const path = require('path')

module.exports = {
  entry: {
    add: './public/script.js',
    store: './public/store.js',
  },
  output: {
    path: path.join(__dirname, 'public', 'output'),
    filename: '[name]-bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
}
