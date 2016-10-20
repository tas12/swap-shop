const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './public/index.js',
  output: {
    path: path.join(__dirname, 'public', 'output'),
    filename: 'index-bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    preLoaders: [{
      test: /\.tag$/,
      exclude: /node_modules/,
      loader: 'riotjs-loader',
      query: { type: 'none' }
    }],
    loaders: [{
      test: /\.js$/|/\.tag$/,
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
