module.exports = function setKarmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: ['src/js/**/*.test.js'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
