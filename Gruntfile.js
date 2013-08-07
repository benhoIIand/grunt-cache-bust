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
                    src: ['*'],
                    dest: 'tmp/'
                }]
            }
        },

        cachebust: {
            options: {
                encoding: 'utf8',
                length: 16,
                algorithm: 'md5'
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'tmp/',
                    src: ['*.html']
                }]
            }
        },

        nodeunit: {
            tests: ['test/*_test.js']
        }

    });


    // Load this plugins tasks
    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'copy', 'cachebust', 'nodeunit']);
};