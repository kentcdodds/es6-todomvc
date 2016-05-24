const webpackConfig = require('./webpack.config')({test: true})
process.env.BABEL_ENV = 'test' // so we load the correct babel plugins
require('babel-register')

module.exports = function setKarmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['src/**/*.test.js'],
    exclude: [],
    preprocessors: {
      'src/**/*.test.js': ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'},
      ],
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Firefox'],
    singleRun: true,
  })
}
