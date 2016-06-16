const webpackConfig = require('./webpack.config')()
const testGlob = 'src/**/*.test.js'

module.exports = function setKarmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [testGlob],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      [testGlob]: ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},
    // coverageReporter: {
    //   reporters: [
    //     {type: 'lcov', dir: 'coverage/', subdir: '.'},
    //     {type: 'json', dir: 'coverage/', subdir: '.'},
    //     {type: 'text-summary'},
    //   ],
    // },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
