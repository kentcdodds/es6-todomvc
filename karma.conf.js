const webpackConfig = require('./webpack.config')()
process.env.BABEL_ENV = 'test' // so we load the correct babel plugins
const testGlob = 'src/**/*.test.js'
const srcGlob = 'src/**/*!(test|stub).js'

module.exports = function setKarmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [testGlob, srcGlob],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      [testGlob]: ['webpack'],
      [srcGlob]: ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},
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
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
