var path = require('path');

var config = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: here()
  },
  context: here('js'),
  devtool: 'eval',
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
};

config.module.loaders = getJSLoaders().concat(config.module.loaders);

if (process.env.NODE_ENV === 'test') {
  config.entry = './ControllerSpec.js';
  config.context = here('test');
}

module.exports = config;

function getJSLoaders() {
  var jsLoaders = [];
  var presets = ['es2015-webpack', 'stage-2']
  var test = process.env.NODE_ENV === 'test'
  if (test) {
    jsLoaders.push({
      test: /js\/.*\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: presets,
        plugins: ['__coverage__'],
      },
    });
    jsLoaders.push({
      test: /test\/.*\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: presets,
      },
    });
  } else {
    jsLoaders.push({
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    });
  }
  return jsLoaders;
}

function here(d) {
  return d ? path.join(__dirname, d) : __dirname;
}

