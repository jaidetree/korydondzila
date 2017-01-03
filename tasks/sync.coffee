browserSync = require 'browser-sync'
paths = require('cson').parseCSONFile('tasks/config/paths.cson')

module.exports = (gulp, gutil, paths) ->
  return ->
    ###
    # Watches static files and refreshes the browser
    ###
    
    try
      browserSync
        open: false
        files: paths.watch.assets
        server:
          baseDir: 'dist'
        # proxy: 'localhost:3000'
    catch error
      browserSync.notify 'There was an error loading some assets.'
      gutil.log(error)

