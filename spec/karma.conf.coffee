module.exports = (config) ->
  configuration =
    basePath: ''
    frameworks: ['jasmine']
    files: [
      '../node_modules/es6-shim/es6-sham.js'
      '../node_modules/reflect-metadata/Reflect.js'
      '../node_modules/rxjs/Rx.js'
      '../node_modules/zone.js/dist/zone.js'
      '../spec_dist/**/*.js'
    ]
    exclude: [ ]
    preprocessors:
      '../node_modules/rxjs/Rx.js': ['commonjs']
      '../node_modules/angular2/testing.js': ['commonjs']
    reporters: ['mocha']
    port: 9876
    colors: true
    logLevel: config.LOG_INFO
    autoWatch: true
    browsers: ['Chrome']
    singleRun: false
    concurrency: Infinity
  if process.env.TRAVIS
    configuration.singleRun = true
    # Chrome has dropped support for Ubuntu Precise.
    # It's no longer possible to install the latest version.
    # So use firefox only if run in travis.
    # https://github.com/travis-ci/travis-ci/issues/5899
    configuration.browsers = ['Firefox']
  config.set(configuration)
