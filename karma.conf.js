const webpackEnv = {test: true}
const webpackConfig = require('./webpack.config')(webpackEnv)
const fileGlob = 'src/**/*.test.js'

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [fileGlob],
    preprocessors: {
      [fileGlob]: ['webpack']
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
