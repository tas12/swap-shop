const path = require('path')

module.exports = {
  entry: ['./public/tags/js/sample.js', './public/tags/js/add.js'],
  output: {
    path: path.join(__dirname, 'public', 'output'),
    filename: '[name]-bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /\.tag$/,
      loader: 'tag',
      exclude: /node_modules/
    }]
  }
}
