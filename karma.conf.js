module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'src/**/*.test.js',
    ],
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
