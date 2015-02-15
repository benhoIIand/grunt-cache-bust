module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        clean: {
            tmp: 'tmp'
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
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
                    src: ['*.html', '*.css', '!replace*.*', '!*.php', '!cdnPath.html']
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
                        script: [
                            function() {
                                return this.attribs['data-main'];
                            },
                            function() {
                                return this.attribs['src'];
                            }
                        ]
                    }
                },
                files: [{
                    src: ['tmp/replace*.*', 'cdnPath.html']
                }]
            },
            enableUrlFragmentHint: {
                options: {
                    enableUrlFragmentHint: true
                },
                files: [{
                    src: ['tmp/enableUrlFragmentHint.php']
                }]
            },
            removeUrlFragmentHint: {
                options: {
                    enableUrlFragmentHint: true,
                    removeUrlFragmentHint: true
                },
                files: [{
                    src: ['tmp/removeUrlFragmentHint.php']
                }]
            },
            fileLevelBaseDirOverride: {
                options: {
                    baseDir: './tmp',
                    deleteOriginals: true
                },
                files: [{
                    baseDir: './tmp/assets/others',
                    src: ['tmp/baseDirOverride.html']
                }]
            },
            cdnPath: {
                files: [{
                    src: ['tmp/cdnPath.html']
                }]
            }
        },

        nodeunit: {
            tests: ['test/*_test.js']
        },

        watch: {
            task: {
                files: ['tasks/**/*.js', 'test/*_test.js'],
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
    grunt.registerTask('test', ['bust', 'nodeunit']);
    grunt.registerTask('bust', ['jshint', 'clean', 'copy', 'cacheBust']);
};
