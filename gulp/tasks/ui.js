var gulp          	= require('gulp'),
	fabricator    	= require('gulp-fabricator'),
	path			= require('../paths'),
	Buffer			= require('buffer').Buffer,
	config			= require('../config'),
	$             = require('gulp-load-plugins')({lazy: true});

// /**
//  *  Generate KSS Objects
//  *  Task: "gulp ui-kit-generator"
//  *  Pull CSS Comments out of the scss files and into objects
//  *  TODO: Decide what to do with these
//  */

gulp.task('ui', function() {
	gulp.src([path.build.css, '!build/vendors.css'])
	.pipe($.concat('main.css'))
	.pipe($.minifyCss())
	.pipe($.sourcemaps.write())
	.pipe(gulp.dest('ui-docs'));

    return gulp.src(path.app.scss)
        .pipe($.fabricator())
		.pipe($.jsoncombine("all-things.json",function(data){
			// do any work on data here
			console.log(data);
			return new Buffer(JSON.stringify(data));
		}))
        .pipe(gulp.dest('ui-docs'));
});
