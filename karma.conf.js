var preprocessors = {}
preprocessors['src/**/*.js'] = ['coverage']
module.exports = function setKarmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/**/*.js',
      'test/stub/**/*.js',
      'test/unit/**/*.js',
    ],
    exclude: [
      'src/app.js',
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: preprocessors,
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
