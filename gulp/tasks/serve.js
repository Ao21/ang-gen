var gulp          = require('gulp'),
    path          = require('../paths'),
    config        = require('../config'),
    runSequence   = require('run-sequence'),
    browserSync   = require('browser-sync').create(),
    $             = require('gulp-load-plugins')({lazy: true});
	
	

gulp.task('browserSync',function(){
  browserSync.init({ 
      server: { 
          baseDir: [path.build.basePath,'./.tmp','./scripts']
      },
      rewriteRules: [
          {
              match: /..\/.tmp\/|..\/scripts\/|\/build|dist\/|reflect-metadata\/|rx\//g,
              fn: function (match) {
                  return '';
              }
          },
          {
            match: /node_modules/g,
              fn: function (match) {
                  return 'scripts/vendors';
              }
          }

      ]
  });

  $.watch(path.app.templates, function(){
    runSequence(
      'clean:html',
      'copy:build',
      browserSync.reload
    );
  });
  
  $.watch(path.app.scss, function(){
    runSequence(
      'styles',
      browserSync.reload
    );
  });
  
  $.watch(path.app.ts, function(){
    runSequence(
      'typescript',
      browserSync.reload
    );
  });
});


gulp.task('api', function() {
    $.nodemon({
        script: path.server,
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    })
});
