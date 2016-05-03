config =
  entry:
    'browser/main': './src/browser/main.ts'
    'renderer/app': './src/renderer/app.ts'
    'renderer/presentation': './src/renderer/presentation.ts'
    'renderer/export': './src/renderer/export.ts'
  output:
    filename: 'dist/[name].js'
module.exports = Object.assign(config, require './webpack.config_base')
