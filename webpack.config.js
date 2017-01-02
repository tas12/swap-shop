const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './public/js/index.js',
  output: {
    path: path.join(__dirname, 'public', 'js', 'build'),
    filename: 'bundle.js'
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
        presets: ['es2015', 'stage-2']
      }
    },
    {
      test: /\.tag$/,
      loader: 'tag',
      exclude: /node_modules/
    }]
  }
}
