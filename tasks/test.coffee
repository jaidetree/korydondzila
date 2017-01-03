mocha = require 'gulp-mocha'

module.exports = (gulp, gutil, paths) ->
  return ->
    ###
    # Run our mocha tests
    ###
    return gulp.src paths.tests
      .pipe mocha(
        bail: true
      )
