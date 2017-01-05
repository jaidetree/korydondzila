gulp = require 'gulp'

require('./tasks')([
  'build'
  'coffee'
  'jade'
  'sass'
  'sync'
  'watch'
])

gulp.task 'default', [ 'start', 'sync', 'watchify']
gulp.task 'static', ['watch', 'watchify', 'sync']