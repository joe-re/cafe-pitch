glob = require 'glob'
path = require 'path'

files = glob.sync('./spec/**/*.spec.ts')
entries = files.reduce (prev, cur) ->
  prev = { "#{(path.parse prev).name}": prev } if typeof prev == 'string'
  prev[(path.parse cur).name] = cur
  prev

config =
  entry: entries
  output:
    filename: 'spec_dist/[name].js'
module.exports = Object.assign(config, require './webpack.config_base')
