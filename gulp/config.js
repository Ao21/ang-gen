var path = require('./paths');
var wiredep = require('wiredep');
var bowerFiles = wiredep({
    devDependencies: true,
    directory: 'scripts'
})['js'];
    
var config = {
	
	systemjs: {
		defaultJSExtensions: true,
		paths: {
			"angular2/*": "node_modules/angular2/es6/prod/*.js",
			"rx": "node_modules/angular2/node_modules/rx/dist/rx.js"
		},
		meta: {
			'rx': {
				format: 'cjs' //https://github.com/systemjs/builder/issues/123
			}
		}
	},
	plato: {
		js: './build/**/*.js'
	},
	karma: getKarmaOptions(),
	
	styles: {
		AUTOPREFIX: [
			'ie >= 10',
			'ie_mob >= 10',
			'ff >= 30',
			'chrome >= 34',
			'safari >= 7',
			'opera >= 23',
			'ios >= 7',
			'android >= 4.4',
			'bb >= 10'
		]
	}
}

function getKarmaOptions() {
        var options = {
            files: [].concat(
                'node_modules/zone.js/dist/zone-microtask.js',
                'node_modules/zone.js/dist/long-stack-trace-zone.js',
                'node_modules/zone.js/dist/jasmine-patch.js',
                'node_modules/traceur/bin/traceur-runtime.js',
                // Including systemjs because it defines `__eval`, which produces correct stack traces
                'node_modules/systemjs/dist/system.js',
                'node_modules/reflect-metadata/Reflect.js',
                {
                    pattern: 'node_modules/angular2/src/**/*.js',
                    included: false
                },
                {
                    pattern: 'build/**',
                    included: false
                },
                'tests/test-runner.js'
            ),
            exclude: [],
            coverage: {
                dir: path.test.report + 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {
                        type: 'html',
                        subdir: 'report-html'
                    }, {
                        type: 'lcov',
                        subdir: 'report-lcov'
                    }, {
                        type: 'text-summary'
                    } //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            preprocessors: {
                '**/*.ts': ['typescript']
            },
            typescriptPreprocessor: {
                options: {
                    sourceMap: true,
                    target: 'ES5',
                    noResolve: false
                },
                transformPath: function(path) {
                    return path.replace(/\.ts$/, '.js');
                }
            },
        };
        options.preprocessors[path.build.basePath + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }

module.exports = config;