path = require 'path'
webpack = require 'webpack'

module.exports =
  target: 'electron'
  node:
    __dirname: false,
    __filename: false,
  devtool: 'source-map',
  resolve:
    modules: ['node_modules']
    extensions: ['.ts', '.tsx', '.js']
  module:
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
