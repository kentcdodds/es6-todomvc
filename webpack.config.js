const webpack = require('webpack')
const {resolve} = require('path')

const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

module.exports = {
  entry: {
    app: './js/app.js',
    vendor: ['lodash', 'jquery'],
  },
  output: {
    filename: 'bundle.[name].js',
    path: resolve(__dirname, 'dist'),
    pathinfo: true,
  },
  context: resolve(__dirname, 'src'),
  devtool: isProd ? 'source-map' : 'eval',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel!eslint', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css'},
    ],
  },
  plugins: [
    isTest ? undefined : new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ].filter(p => !!p),
}
