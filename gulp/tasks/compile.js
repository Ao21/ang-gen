var gulp          = require('gulp'),
    path          = require('../paths'),
    config        = require('../config');


gulp.task('build:deps', function () {
  var Builder = require('systemjs-builder');
  var builder = new Builder(config.systemjs);
  
  builder.build('angular2/router', path.scripts.vendors + '/router.js', {});  
  return builder.build('angular2/angular2', path.scripts.vendors + '/angular2.js', {});
});

gulp.task('ngAnnotate', function() {
    return gulp.src(path.build.js)
  .pipe($.plumber())
  .pipe($.ngAnnotate())
  .pipe(gulp.dest(path.build));
});