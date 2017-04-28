//pull in gulp
const gulp = require('gulp');
//pull in sass for gulp files. This will let us do sass builds.
const sass = require('gulp-sass');
//pull in babel for gulp files. This will let us do babel builds.
const babel = require('gulp-babel');
//pull in nodemon for gulp files. This will let us watch with nodemon
const nodemon = require('gulp-nodemon');
//pull in eslint with gulp. This will let us kick off ESLint via gulp
const eslint = require('gulp-eslint');

gulp.task('sass', () => {
  gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./hosted/'));
});

gulp.task('js', () => {
  gulp.src('./client/*.js')
    .pipe(babel({
      presets: ['env', 'react']
    }))
    .pipe(gulp.dest('./hosted'))
});

gulp.task('lint', () => {
  return gulp.src(['./server/*.js'])
    .pipe(eslint({
      fix: true,
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch',() => {
  gulp.watch('./scss/main.scss',['sass']);
  gulp.watch('./client/*.js',['js']);

  nodemon({ script: './server/app.js'
          , ext: 'js'
          , tasks: ['lint'] })
});

gulp.task('build', () => {
  //gulp.start('sass') will kick off the 'sass' task above
  gulp.start('sass');
  //gulp.start('js') will kick off the 'js' task above
  gulp.start('js');
  //gulp.start('lint') will kick off the 'lint' task above
  gulp.start('lint');
});
