gulp     = require 'gulp'
del      = require 'del'
seq      = require 'run-sequence'
sass     = require 'gulp-sass'
glob     = require 'glob'
zipdir   = require 'zip-dir'

gulp.task 'clean', (cb) ->
  del([ 'dist' ], cb)

gulp.task 'build:prepare', ['clean'], ->
  seq ['build:html', 'build:css', 'build:scss', 'build:emoji', 'build:fonts']

gulp.task 'build:html', ->
  gulp.src('src/**/*.html')
    .pipe gulp.dest('dist')

gulp.task 'build:css', ->
  gulp.src([
   'src/**/*.css',
   'node_modules/highlight.js/styles/solarized-light.css',
   'node_modules/photon/dist/css/photon.css'
  ]).pipe gulp.dest('dist/css')

gulp.task 'build:fonts', ->
  gulp.src([
   'node_modules/photon/dist/fonts/*'
  ]).pipe gulp.dest('dist/fonts')

gulp.task 'build:scss', ->
  gulp.src('src/**/*.scss')
    .pipe sass().on('error', sass.logError)
    .pipe gulp.dest('dist')

gulp.task 'build:emoji', ->
  gulp.src 'node_modules/emoji-images/pngs/*.png'
    .pipe gulp.dest('dist/renderer/images/emoji')

gulp.task 'watch', ->
  gulp.watch 'src/**/*.html', ['build:html']
  gulp.watch 'src/**/*.css', ['build:css']
  gulp.watch 'src/**/*.scss', ['build:scss']

gulp.task 'zip', ->
  build = (dir) ->
    new Promise (resolve) ->
      zipdir(dir, {saveTo: "#{dir}.zip"}, -> resolve())
  releases = glob.sync('./release/*')
  return Promise.all releases.map((dir) -> build(dir))
