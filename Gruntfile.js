module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        clean: {
            tmp: 'tmp'
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
            main: {
                files: [{
                    expand: true,
                    cwd: 'tmp/',
                    src: ['*']
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