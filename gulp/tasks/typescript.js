var gulp          	= require('gulp'),
    del           	= require('del'),
	path 			= require('../paths'),
	browserSync   	= require('browser-sync').create(),
	$             	= require('gulp-load-plugins')({lazy: true});

var tsProject = $.typescript.createProject({
    "target": "es5",
    "module": "commonjs",
    "declaration": false,
    "noImplicitAny": false,
    "removeComments": true,
    "noLib": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true
});


gulp.task('typescript', function() {
  return gulp.src([path.app.ts,path.typings])
  .pipe($.sourcemaps.init())
  .pipe($.typescript(tsProject))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(path.build.basePath))
  .pipe(browserSync.stream());
});