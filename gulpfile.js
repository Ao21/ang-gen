var gulp          = require('gulp'),
    runSequence   = require('run-sequence');

require('require-dir')('./gulp/tasks', { recurse: true });

gulp.task('default', ['clean'], function(cb) {
    runSequence(
       ['serve'],
        cb
    );
});


gulp.task('build', function() {
    runSequence(
        'clean',
        'deps/angular2',
        'copy:deps',
        'typescript',
        'copy:libs',
        'inject:all',
        'styles',
        'images',
        'copy:build'
      
    )
});