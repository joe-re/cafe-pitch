module.exports = (config) ->
  configuratuion =
    basePath: ''
    frameworks: ['jasmine']
    files: [
      '../node_modules/es6-shim/es6-sham.js'
      '../node_modules/reflect-metadata/Reflect.js'
      '../node_modules/rxjs/Rx.js'
      '../node_modules/zone.js/dist/zone.js'
      '../node_modules/angular2/testing.js'
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
    customLaunchers:
      Chrome_travis_ci:
        base: 'Chrome'
        flags: ['--no-sandbox']
  if process.env.TRAVIS
    configuratuion.browsers = ['Chrome_travis_ci']
    configuratuion.singleRun = true
  config.set(configuratuion)
