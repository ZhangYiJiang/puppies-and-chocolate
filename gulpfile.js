const gulp = require('gulp');
const pug = require('gulp-pug');
const story = require('./story_transformer');

gulp.task('template', () => {
  return gulp.src('src/templates/*.pug')
    .pipe(pug({
      filters: { 'story': story.render },
    }))
    .pipe(gulp.dest('docs'));
});
