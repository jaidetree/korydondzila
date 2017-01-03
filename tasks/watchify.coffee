browserify = require 'browserify'
buffer = require 'vinyl-buffer'
path = require 'path'
source = require 'vinyl-source-stream'
sourcemaps = require 'gulp-sourcemaps'
uglify = require 'gulp-uglify'
watchify = require 'watchify'

module.exports = (gulp, gutil, paths) ->
  return ->
    ###
    # Compile browserify stuff
    ###
    bundleStream = watchify(browserify(
        basedir: path.join process.cwd(), path.dirname(paths.site.coffee)
        debug: true
        detectGlobals: false
        extensions: [
          '.coffee'
          '.html'
        ]
        insertGlobals: false
      ))
      .transform 'coffee-reactify'
      # Add the app.coffee file to browserify
      .add path.resolve(paths.site.coffee)

    bundle = ->
      gutil.log gutil.colors.cyan('Compiling'), gutil.colors.magenta('app.js'), '...'

      return bundleStream
        .bundle()
        .on 'error', (err) ->
          console.log "\n"
          gutil.log gutil.colors.bold.red('Browserify Error: ' + err.message)
        .pipe source 'app.js'
        .pipe buffer()
        .pipe sourcemaps.init( loadMaps: true )
          .pipe uglify()
        .pipe sourcemaps.write('.')
        .pipe gulp.dest(paths.dist.coffee)

    bundleStream
      .on 'time', (time) ->
          gutil.log gutil.colors.green('Compiled'), 
            gutil.colors.magenta('app.js'), 'in', 
            gutil.colors.cyan(parseFloat(time / 1000).toFixed(2) + 's')
      .on 'update', bundle

    bundle()