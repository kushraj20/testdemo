module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-fusioncharts/dist/angular-fusioncharts.js',
            'test/chart/chart-module.js',
            'test/chart/component/*.js',
            'test/chart/**/*.js',


            { pattern: 'test/assets/js/tests/mockData/*.json',
                watched: true,
                served:  true,
                included: false
            }
    ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Firefox'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-html-reporter',
            'karma-coverage',
            ],

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage', 'junit', 'html'],

        preprocessors: {
            'test/chart/component/**/!(*_test).js': ['coverage'],
            'test/chart/section/**/!(*_test).js': ['coverage'],
            'test/chart/services/**/!(*_test).js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'lcov',
            dir: 'js-coverage/'
        },

        htmlReporter: {
            outputDir: 'karma_html',
            templatePath: null,     // set if you moved jasmine_template.html
            focusOnFailures: true,  // reports show failures on start
            namedFiles: false,      // name files instead of creating sub-directories
            pageTitle: null,        // page title for reports; browser info by default
            urlFriendlyName: false  // simply replaces spaces with _ for files/dirs
        }
    });
};
