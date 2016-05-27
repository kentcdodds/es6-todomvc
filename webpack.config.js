const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const ifVal = (add, val) => add ? val : undefined
  const ifProd = val => ifVal(env.prod, val)
  const removeEmpty = array => array.filter(i => !!i)
  return {
    entry: {
      app: './js/app.js',
      vendor: ['jquery', 'lodash'],
    },
    output: {
      filename: 'bundle.[name].[chunkhash].js',
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
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      })),
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: removeEmpty([
          ifProd('vendor'),
          'app',
        ]),
      }),
    ]),
    recordsPath: ifProd(resolve(__dirname, '.cache/records.json')),
  }
}
