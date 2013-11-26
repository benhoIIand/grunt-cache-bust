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
            main: {
                files: [{
                    expand: true,
                    cwd: 'tmp/',
                    src: ['*.html', '!replace.html']
                }]
            },
            replace: {
                options: {
                    baseDir: './tmp',
                    rename: true
                },
                files: [{
                    src: 'tmp/replace.html'
                }]
            }
        },

        nodeunit: {
            tests: ['test/*_test.js']
        },

        watch: {
            task: {
                files: 'tasks/cacheBust.js',
                tasks: 'nodeunit'
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

    grunt.registerTask('bust', ['clean', 'copy', 'cacheBust']);
    grunt.registerTask('test', ['clean', 'copy', 'cacheBust', 'nodeunit']);
};