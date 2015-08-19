module.exports = function() {
    var config = {};
    var path = require('path');
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({
        devDependencies: true,
        directory: 'scripts'
    })['js'];
    config.karma = getKarmaOptions();


    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                config.path.build + '**/*.module.js',
                config.path.client + '**/*.js',
                config.path.build + '**/*.js',
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: config.path.report + 'coverage',
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
        options.preprocessors[config.path.dist + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }

    return config;
};
