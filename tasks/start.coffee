nodemon = require 'gulp-nodemon'

module.exports = (gulp, gutil, paths) ->
  return ->
    ###
    # Setups up a nodemon instance
    ###

    nodemon(
      exec: 'npm run debug',
      ext: 'coffee jade'
    )
