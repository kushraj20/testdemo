//'use strict';

/*global require*/

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'test',
        dist: 'test-dist/test-client'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        vision: appConfig,

        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * The banner is the comment that is placed at the top of our compiled
         * source files. It is first processed as a Grunt template, where the `<%=`
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n' +
            ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' *\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed <%= pkg.license %>\n' +
            ' */\n'
        },

        /**
         * Increments the version number, etc.
         */
        bump: {
            options: {
                files: [
                    'package.json',
                    'bower.json'
                ],
                commit: false,
                commitMessage: 'chore(release): v%VERSION%',
                commitFiles: [
                    'package.json',
                    'bower.json'
                ],
                createTag: false,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin'
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= vision.app %>/{,*/}*.js','<%=vision.app%>/assets/js/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['<%= vision.app %>/{,*/}*_test.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= vision.app %>/{,*/}*.css', '<%= vision.app %>/assets/compiled/{,*/}*.css'],
                tasks: ['autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= vision.app %>/{,*/}*.html',
                    '<%= vision.app %>/.html',
                    '<%= vision.app %>/chart/{,*/}*.html',
                    '<%= vision.app %>/{,*/}*.css',
                    '<%= vision.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9003,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9034,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= vision.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= vision.app %>/chart/{,*/}*controller.js',
                    '<%= vision.app %>/chart/services/client/chart-httpService.js',
                    '<%= vision.app %>/chart/{,*/}*directive.js'
                ]
            },
            test: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= vision.app %>/component']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= vision.dist %>/{,*/}*',
                        '!<%= vision.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= vision.dist %>/**/{,*/}*.css'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['<%= vision.app %>/**/{,*/}*.html'],
            options: {
                dest: '<%= vision.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= vision.dist %>/**/{,*/}*.html'],
            options: {
                rebase: false,
                assetsDirs: [
                    '<%= vision.dist %>'
                ]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/img',
                    src: '{,*/}*.svg',
                    dest: '<%= vision.dist %>/assets/img'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= vision.dist %>',
                    src: ['**/{,*/}*.html'],
                    dest: '<%= vision.dist %>'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat',
                    src: '**/{,*/}*.js',
                    dest: '.tmp/concat'
                }]
            }
        },

        ngtemplates: {
            chart: {
                cwd: '<%= vision.app %>',
                src: [
                    'chart/{,*/}*{,*/}*{,*/}*.html'
                ],
                dest: '.tmp/templatesChart.js',
                options: {
                    usemin: 'chart.js'
                }
            }

        },


        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [

                    {
                        expand: true,
                        dot:true,
                        cwd: '<%= vision.app %>',
                        dest: '<%= vision.dist %>',
                        src: [
                            'chart/chart.html'
                        ]
                    }, {
                        expand: true,
                        cwd: '<%= vision.app %>',
                        dest: '<%= vision.dist %>',
                        src: [
                            'chart/chartdata.json'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= vision.app %>',
                        src: ['assets/images/*'],
                        dest: '<%= vision.dist %>'
                    }, {
                        expand: true,
                        cwd: '<%= vision.app %>',
                        src: 'assets/fonts/{,*/}*',
                        dest: '<%= vision.dist %>'
                    }, {
                        expand: true,
                        cwd: 'cxp-portlet/META-INF/resources',
                        dest: '<%= vision.dist %>',
                        src: ['*.js']
                    },
                    {
                        expand: true,
                        cwd: 'cxp-portlet/META-INF/resources',
                        dest: '<%= vision.dist %>/chart',
                        src: ['*.js']
                    },
                    {
                        expand: true,
                        cwd: '<%= vision.app %>',
                        src: ['assets/img/*'],
                        dest: '<%= vision.dist %>'
                    }]
            },
            cxp: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= vision.dist %>',
                        src: '**',
                        dest: '.tmp/META-INF/resources/chart'
                    }
                ]
            }
        },
        rename: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= vision.dist %>',
                    src: ['chart*.*'],
                    dest: '<%= vision.dist %>/chart'
                }]
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            dist: [
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        war: {
            target: {
                options: {
                    war_dist_folder: 'test-dist/',
                    /* Folder where to generate the WAR. */
                    war_name: 'test-client', /* The name fo the WAR file (.war will be the extension) */
                    webxml: function () {
                        return '<web-app version="3.0" xmlns="http://java.sun.com/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"><display-name>Grunt WAR</display-name><welcome-file-list><welcome-file>index.html</welcome-file></welcome-file-list><filter><filter-name>CorsFilter</filter-name><filter-class>org.apache.catalina.filters.CorsFilter</filter-class> </filter> <filter-mapping> <filter-name>CorsFilter</filter-name> <url-pattern>/*</url-pattern> </filter-mapping></web-app>';
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= vision.dist %>',
                        src: ['**'],
                        dest: ''
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: 'test-dist/test-clientui.jar'
                },
                expand: true,
                cwd: '.tmp/',
                src: ['META-INF/**']
            }
        }


    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'rename',
        'war',
        'copy:cxp',
        'compress'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build',
        'bump'
    ]);
};