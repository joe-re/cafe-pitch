gulp  = require 'gulp'
del   = require 'del'
seq   = require 'run-sequence'
sass  = require 'gulp-sass'

gulp.task 'clean', (cb) ->
  del([ 'dist' ], cb)

gulp.task 'build:prepare', ['clean'], (cb) ->
  seq ['build:html', 'build:angular2-polyfills.js', 'build:css', 'build:scss']

gulp.task 'build:html', () ->
  gulp.src('src/**/*.html')
    .pipe gulp.dest('dist')

gulp.task 'build:angular2-polyfills.js', () ->
  gulp.src('node_modules/angular2/bundles/angular2-polyfills.js')
    .pipe gulp.dest('./dist/renderer/node_modules/angular2/bundles/')

gulp.task 'build:css', () ->
  gulp.src([
   'src/**/*.css',
   'node_modules/highlight.js/styles/solarized-light.css'
  ]).pipe gulp.dest('dist')

gulp.task 'build:scss', () ->
  gulp.src('src/**/*.scss')
    .pipe sass().on('error', sass.logError)
    .pipe gulp.dest('dist')

gulp.task 'watch', () ->
  gulp.watch 'src/**/*.html', ['build:html']
  gulp.watch 'src/**/*.css', ['build:css']
  gulp.watch 'src/**/*.scss', ['build:scss']
