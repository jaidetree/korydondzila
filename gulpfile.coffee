gulp = require 'gulp'

require('./tasks')([
  'browserify'
  'coffee'
  'jade'
  'lint'
  'sass'
  'start'
  'sync'
  'test'
  'watch'
  'watchify'
])

gulp.task 'default', [ 'start', 'sync', 'watchify']
gulp.task 'static', ['watch', 'watchify', 'sync']