var path = require('path');

var config = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: here()
  },
  devtool: 'eval',
  context: here('js'),
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  }
};

if (process.env.NODE_ENV === 'test') {
  config.entry = './ControllerSpec.js';
  config.context = here('test');
}

module.exports = config;

function here(d) {
  return d ? path.join(__dirname, d) : __dirname;
}
