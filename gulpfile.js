var gulp          = require('gulp'),
    runSequence   = require('run-sequence');

require('require-dir')('./gulp/tasks', { recurse: true });

gulp.task('default', ['clean'], function(cb) {
    runSequence(
       ['serve'],
        cb
    );
});

gulp.task('serve', function() {
    runSequence(
        'clean',
        'copy:deps',
        'typescript',
        'copy:libs',
        'inject:all',
        'styles',
        'images',
        'copy:build',
        'browserSync'
    )
});










