path = require 'path'
sass = require 'gulp-sass'
sourcemaps = require 'gulp-sourcemaps'


module.exports = (gulp, gutil, paths) ->
  # sassDir = path.join process.cwd(), path.dirname(paths.site.sass)
  sassDir = process.cwd()

  return ->
    ###
    # Compile SASS code
    ###
    return gulp.src paths.site.sass
      .pipe sourcemaps.init()
      .pipe sass({
        indentedSyntax: true
        outputStyle: 'compressed'
      })
      .on 'error', (err) ->
        filename = path.relative sassDir, err.fileName
        console.log ''
        gutil.log(
          gutil.colors.bold.red('SASS Error:'),
          gutil.colors.magenta(filename) + ':' + gutil.colors.magenta(err.lineNumber),
          gutil.colors.bold.red(err.message)
        )
        this.emit 'end'
      .pipe sourcemaps.write('./')
      .pipe gulp.dest paths.dist.sass
