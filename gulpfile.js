var gulp = require('gulp'),
    compass = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    path = require('path');

var paths = {
    compass: ['public/**/*.s[ca]ss'],
    assets: ['public/**/*.js', 'public/**/*.css'],
    templates: ['views/**/*.jade'],
    src: ['**/*.js']
};

gulp.task('compass', function () {
    gulp.src(paths.compass)
    .pipe(compass({
        project: path.join(__dirname, 'public'),
        css: 'css',
        sass: 'sass',
        image: 'images',
        javascript: 'js',
        require: ['susy']
    }));
});

gulp.task('assets', function () {
    gulp.src(paths.assets)
    .pipe(livereload());
});
gulp.task('templates', function () {
    gulp.src(paths.templates)
    .pipe(livereload());
});

gulp.task('watch', function () {
    gulp.watch(paths.compass, ['compass']);
    gulp.watch(paths.assets, ['assets']);
    gulp.watch(paths.templates, ['templates']);
});

gulp.task('develop', function () {
  nodemon({
      script: 'app.js', 
      options: '-e html,jade,js'
  });
});

gulp.task('default', ['compass']);
