gulp     = require 'gulp'
del      = require 'del'
seq      = require 'run-sequence'
sass     = require 'gulp-sass'
packager = require 'electron-packager'
zipdir   = require 'zip-dir'

gulp.task 'clean', (cb) ->
  del([ 'dist' ], cb)

gulp.task 'build:prepare', ['clean'], ->
  seq ['build:html', 'build:css', 'build:scss', 'build:emoji']

gulp.task 'build:html', ->
  gulp.src('src/**/*.html')
    .pipe gulp.dest('dist')

gulp.task 'build:css', ->
  gulp.src([
   'src/**/*.css',
   'node_modules/highlight.js/styles/solarized-light.css'
  ]).pipe gulp.dest('dist')

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

packageOptions = {
  dir: '.',
  out: 'release',
  name: 'Cafe Pitch',
  version: '0.36.12',
  overwrite: true,
  ignore: '(release|typings|src|node_modules|spec|spec_dist|resource)'
}

gulp.task 'clean:release', (cb) ->
  del([ 'release' ], cb)

gulp.task 'package', ['clean:release'], ->
  build = (option) ->
    new Promise (resolve) ->
      packager option, -> zipdir(option.out, {saveTo: "#{option.out}.zip"}, -> resolve())
  osx = build Object.assign({}, packageOptions, platform: 'darwin', arch: 'x64', out: 'release/osx', icon: './resource/cafepitch.icns')
  winX64 = build Object.assign({}, packageOptions, platform: 'win32', arch: 'x64', out: 'release/win_x64', icon: './resource/cafepitch.ico')
  winIa32 = build Object.assign({}, packageOptions, platform: 'win32', arch: 'ia32', out: 'release/win_ia32', icon: './resource/cafepitch.ico')
  linX64 =  build Object.assign({}, packageOptions, platform: 'linux', arch: 'x64', out: 'release/linux_x64', icon: './resource/cafepitch.ico')
  linIa32 = build Object.assign({}, packageOptions, platform: 'linux', arch: 'ia32', out: 'release/linux_ia32', icon: './resource/cafepitch.ico')
  Promise.all [osx, winX64, winIa32, linX64, linIa32]
