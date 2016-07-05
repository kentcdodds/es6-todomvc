const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackValidator = require('webpack-validator')
const {getIfUtils, removeEmpty} = require('webpack-config-utils')
const OfflinePlugin = require('offline-plugin')

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env)
  return webpackValidator({
    context: resolve('src'),
    entry: {
      app: './app.js',
      vendor: ['todomvc-common/base.css', 'todomvc-app-css/index.css'],
    },
    output: {
      filename: 'bundle.[name].[chunkhash].js',
      path: resolve('dist'),
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
        {test: /\.css$/, loaders: ['style', 'css']},
      ],
    },
    recordsPath: resolve(__dirname, './webpack-records.json'),
    plugins: removeEmpty([
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      })),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        minChunks: Infinity,
        name: 'inline',
      })),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'head',
      }),
      new OfflinePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      }),
    ]),
  })
}
