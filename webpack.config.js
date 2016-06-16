const {resolve} = require('path')
const webpackValidator = require('webpack-validator')
const {getIfUtils} = require('webpack-config-utils')

module.exports = env => {
  const {ifProd} = getIfUtils(env)
  return webpackValidator({
    context: resolve('src'),
    entry: './bootstrap.js',
    output: {
      filename: 'bundle.js',
      path: resolve('dist'),
      publicPath: '/dist/',
    },
    devtool: ifProd('source-map', 'eval'),
  })
}
