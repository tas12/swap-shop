const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'public', 'riot-script.js'),
  output: {
    path: path.join(__dirname, 'public', 'output'),
    filename: 'riot-bundle.js'
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
