path = require 'path'
webpack = require 'webpack'

module.exports =
  target: 'node'
  node:
    __dirname: false,
    __filename: false,
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
