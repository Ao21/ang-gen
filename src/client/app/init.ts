/// <reference path="../../../typings/system.d.ts" />
System.config({
	defaultJSExtensions: true,
	paths: {
		'angular2/*': 'libs/*',
		'flux'	: '/libs/flux',
		'postal': '/libs/postal.min'
	}
});

System.import('./app/bootstrap')
  .catch(e => console.error(e,
    'Report this error at https://github.com/mgechev/angular2-seed/issues'));

