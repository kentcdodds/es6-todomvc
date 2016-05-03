module.exports = {
  entry: './js/app.js',
  output: {
    filename: 'bundle.js',
    pathinfo: true,
  },
  context: __dirname,
  devtool: 'eval',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel!eslint', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css'},
    ],
  },
}
