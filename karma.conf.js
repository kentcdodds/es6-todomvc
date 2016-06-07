const webpackConfig = require('./webpack.config')({test: true})
const filesPattern = 'src/**/*.test.js'

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [filesPattern],
    exclude: [],
    preprocessors: {
      [filesPattern]: ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  })
}
