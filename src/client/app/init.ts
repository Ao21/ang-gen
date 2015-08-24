/// <reference path="../../../typings/system.d.ts" />
System.config({
	defaultJSExtensions: true,
	paths: {
		'flux'	: '/libs/flux',
		'postal': '/libs/postal.min'
	},
	map: {
		'angular2': '/libs/angular2',
		rx: 'libs/rx.js',
	}
});

System.import('./app/bootstrap')
  .catch(e => console.error(e,
    'Report this error at https://github.com/mgechev/angular2-seed/issues'));

