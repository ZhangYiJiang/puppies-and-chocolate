const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const story = require('./story_transformer');

gulp.task('template', () => {
  return gulp.src('src/templates/*.pug')
    .pipe(pug({
      filters: { 'story': story.render },
    }))
    .pipe(gulp.dest('docs'));
});

gulp.task('scss', () => {
  return gulp.src('src/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('docs'));
});
