var gulp = require('gulp'),
    compass = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    changed = require('gulp-changed'),
    watch = require('gulp-watch'),
    path = require('path');

var paths = {
    compass: ['public/**/*.s[ca]ss'],
    js: ['public/js/**/*.js'],
    css: ['public/css/**/*.css'],
    templates: ['views/**/*.jade'],
    src: ['**/*.js']
};

var settings = {};
settings.compass = {
    project: path.join(__dirname, 'public'),
    css: 'css',
    sass: 'sass',
    image: 'images',
    javascript: 'js',
    require: ['susy']
};

gulp.task('compass', function () {
    gulp.src(paths.compass)
    .pipe(compass(settings.compass))
    .pipe(livereload());
});

gulp.task('assets', function () {
    gulp.src(paths.assets)
    .pipe(livereload());
});

gulp.task('templates', function () {
    gulp.src(paths.templates)
    .pipe(changed('views'))
    .pipe(livereload());
});

gulp.task('watch', function () {
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.compass, ['compass']);
});

gulp.task('develop', function () {
  nodemon({
      script: 'app.js', 
      options: '-e html,jade,js'
  });
});

gulp.task('default', ['compass']);
