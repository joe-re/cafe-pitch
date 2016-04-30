config =
  entry:
    'markdown.pipe': './spec/pipes/markdown.pipe.spec.ts'
  output:
    filename: 'spec_dist/[name].js'
module.exports = Object.assign(config, require './webpack.config_base')
