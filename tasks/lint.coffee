coffeelint = require 'gulp-coffeelint'
args = require('minimist') process.argv.slice(2)

module.exports = (gulp, gutil, paths) ->
  return ->
    ###
    # Lint coffeescript
    # @param {string} file - An array of file names wrapped in strings
    # @example
    # gulp lint 'src/index.coffee'
    ###
    files = args.f or [paths.src.coffee, paths.src.js]
    return gulp.src files
      .pipe coffeelint()
      .pipe coffeelint.reporter()