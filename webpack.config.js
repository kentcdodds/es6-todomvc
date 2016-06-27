const {resolve} = require('path')
const webpackValidator = require('webpack-validator')
const {getIfUtils} = require('webpack-config-utils')

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env)
  return webpackValidator({
    context: resolve('src'),
    entry: './app.js',
    output: {
      filename: 'bundle.js',
      path: resolve('dist'),
      publicPath: '/dist/',
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
      ],
    },
  })
}
