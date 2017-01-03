module.exports = (gulp, gutil, paths) ->
  return ->
    gulp.watch(paths.watch.sass, ['sass'])
    gulp.watch(paths.watch.jade, ['jade'])