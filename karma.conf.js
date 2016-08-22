process.env.NODE_ENV = 'test'
const webpackConfig = require('./webpack.config')
require('babel-register')

module.exports = function setKarmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['test/**/*Spec.js'],
    exclude: [],
    preprocessors: {
      'test/**/*Spec.js': ['webpack'],
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
