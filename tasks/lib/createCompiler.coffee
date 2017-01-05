webpack = require 'webpack'
config = require('cson').parseCSONFile('tasks/config/webpack.cson')

module.exports = (custom) ->
  options = Object.assign {}, config, custom
  return webpack options
