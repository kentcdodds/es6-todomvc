const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const addPlugin = (add, plugin) => add ? plugin : undefined
  const ifProd = plugin => addPlugin(env.prod, plugin)
  const removeEmpty = array => array.filter(i => !!i)
  return {
    entry: {
      app: './js/app.js',
      vendor: ['jquery', 'lodash'],
    },
    output: {
      filename: 'bundle.[chunkhash].js',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel!eslint', exclude: /node_modules/},
        {test: /\.css$/, loader: 'style!css'},
      ],
    },
    plugins: removeEmpty([
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }))
    ]),
    recordsPath: resolve(__dirname, '.webpack-records.json'),
  }
}
