path = require 'path'
webpack = require 'webpack'

module.exports =
  entry:
    'browser/main': './src/browser/main.ts'
    'renderer/app': './src/renderer/app.ts'
    'renderer/presentation': './src/renderer/presentation.ts'
    'renderer/export': './src/renderer/export.ts'
  target: 'node'
  node:
    __dirname: false,
    __filename: false,
  output:
    filename: 'dist/[name].js'
  devtool: 'source-map',
  resolve:
    extensions: ['', '.ts', '.tsx', '.js']
    modulesDirectories: ['node_modules']
  module:
    loaders: [
      test: /\.tsx?$/
      loader: 'ts-loader'
    ]
  plugins: [
    new webpack.ExternalsPlugin 'commonjs', ['electron', 'fs', 'dialog', 'menu']
  ]
