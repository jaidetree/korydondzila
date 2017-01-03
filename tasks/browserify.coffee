buffer = require 'vinyl-buffer'
browserify = require 'browserify'
path = require 'path'
source = require 'vinyl-source-stream'
sourcemaps = require 'gulp-sourcemaps'
uglify = require 'gulp-uglify'

module.exports = (gulp, gutil, paths) ->
  ###
  # Compile browserify stuff
  ###
  return -> 
    return browserify
        basedir: path.join process.cwd(), path.dirname(paths.site.coffee)
        debug: true
        detectGlobals: false
        extensions: [
          '.coffee'
          '.html'
        ]
        insertGlobals: false
      .transform('coffee-reactify')
      # Add the app.coffee file to browserify
      .add path.resolve(paths.site.coffee)
      # Log that we are compiling a file
      .on 'bundle', ->
        gutil.log('-->', gutil.colors.cyan('Compiling'), gutil.colors.magenta('app.coffee'), '...')
      # Start the bundling process
      .bundle()
      .on 'error', (err) ->
        gutil.log("\n")
        gutil.log(gutil.colors.bold.red('Browserify Error: ' + err.message))
      # Turn the source stream into a gulp-compatible vinyl stream
      .pipe source('app.js')
      # Buffer the contents into a file
      .pipe buffer()
      # Load sourcemaps and uglify
      .pipe sourcemaps.init({ loadMaps: true })
        .pipe uglify()
      .pipe sourcemaps.write('.')
      # Output the file and log that it's done.
      .pipe gulp.dest(paths.dist.coffee)
      .pipe gutil.buffer ->
          gutil.log('-->', gutil.colors.green('Compiled'), gutil.colors.magenta('app.coffee'))
