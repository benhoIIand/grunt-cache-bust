module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        clean: {
            tmp: 'tmp'
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'test/fixtures',
                    src: ['**'],
                    dest: 'tmp/'
                }]
            }
        },

        cacheBust: {
            options: {
                encoding: 'utf8',
                length: 16,
                algorithm: 'md5',
                baseDir: 'tmp/'
            },
            queryString: {
                options: {
                    jsonOutput: true,
                    rename: false,
                    ignorePatterns: ['toBeIgnoredCSS', 'toBeIgnoredJS', 'toBeIgnoredJPG']
                },
                files: [{
                    expand: true,
                    cwd: 'tmp/',
                    src: ['*.html', '*.css', '!replace*.*', '!*.php']
                }]
            },
            rename: {
                options: {
                    baseDir: './tmp',
                    deleteOriginals: true,
                    jsonOutput: 'output/replace-cachebuster-map.json',
                    replaceTerms: [{
                        '${Html.GetAppSetting(ThemeId)}': 'com'
                    }],
                    filters: {
                        script : [
                            function() { return this.attribs['data-main'] +'.js'; },
                            function() { return this.attribs['src']; }
                        ]
                    }
                },
                files: [{
                    src: ['tmp/replace*.*']
                }]
            },
            enableUrlFragmentHint: {
                options: {
                    enableUrlFragmentHint: true
                },
                files: [{
                    src: ['tmp/*.php']
                }]
            }
        },

        nodeunit: {
            tests: ['test/*_test.js']
        },

        watch: {
            task: {
                files: ['tasks/cacheBust.js', 'test/cachebust_test.js'],
                tasks: 'test'
            }
        }

    });


    // Load this plugins tasks
    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'bust');
    grunt.registerTask('bust', ['clean', 'copy', 'cacheBust']);
    grunt.registerTask('test', ['clean', 'copy', 'cacheBust', 'nodeunit']);
};
