webpack = require 'webpack'
createCompiler = require './lib/createCompiler'

handler = (err, stats) ->
  if err
    console.error err.stack || err.message || err

  console.log stats.toString('normal')

module.exports = (gulp, gutil, paths) ->
  opts = require('minimist') process.argv.slice(2)

  return (done) ->
    if opts.watch
      ###
      # Watch Coffescript to browser js for development
      ###
      console.log 'Watching .coffee source files'
      compiler = createCompiler({
        devtool: 'source-map',
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
          }),
        ]
      })

      compiler.watch({}, handler)

    else
      ###
      # Compile Coffescript to browser js
      ###
      console.log 'Building .coffee source files'
      compiler = createCompiler({
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
          new webpack.optimize.UglifyJsPlugin {
            compress:
              warnings: false
            comments: false
          }
        ]
      })
      compiler.run (err, stats) ->
        handler(err, stats)
        done()

