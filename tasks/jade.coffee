jade = require 'gulp-jade'
path = require 'path'

data = {}

module.exports = (gulp, gutil, paths) ->
  jadeDir = process.cwd()

  return ->
    ###
    # Compile jade templates
    ###
    return gulp.src paths.site.jade
      .pipe jade(
        locals: data
      )
      .on 'error', (err) ->
        console.log ''
        gutil.log(
          gutil.colors.bold.red('Jade Error:'),
          gutil.colors.bold.red(err.message.replace(process.cwd() + '/', ''))
        )
        this.emit 'end'
      .pipe gulp.dest paths.dist.jade
