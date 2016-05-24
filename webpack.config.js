const webpack = require('webpack')
const {resolve} = require('path')
module.exports = env => {
  return {
    entry: {
      app: './js/app.js',
      animalFacts: './animal-facts/js/app.js',
    },
    output: {
      filename: 'bundle.[name].js',
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
    plugins: [
      env.test ? undefined : new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'bundle.common.js',
        chunks: ['app', 'animalFacts']
      }),
    ].filter(p => !!p),
  }
}
