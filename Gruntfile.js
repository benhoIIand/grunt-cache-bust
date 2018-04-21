module.exports = function(grunt) {
    'use strict';

    var configFiles = grunt.file.expand('./config/*.js');

    // Default cacheBust options
    var cacheBustObj = {
        options: {
            encoding: 'utf8',
            length: 16,
            algorithm: 'md5'
        }
    };

    // Load each cacheBust config
    configFiles.forEach(function(filename) {
        var taskName = filename.replace('./config/', '').replace('.js', '');
        cacheBustObj[taskName] = require(filename);
    });

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
                    dot: true,
                    cwd: 'tests/',
                    src: ['<%= tests + "/**" || "**" %>', '!**/*_test.js'],
                    dest: 'tmp/'
                }]
            }
        },

        cacheBust: cacheBustObj,

        nodeunit: {
            tests: ['tests/<%= tests || "**" %>/*_test.js']
        },

        watch: {
            task: {
                files: ['tasks/**/*.js', 'tests/**/*', 'config/*.js'],
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

    grunt.task.registerTask('single', 'Run a single test', function(testName) {
        console.info('Testint /tests/'+testName+'/*_test.js');
        grunt.config.set('tests', testName);
        grunt.task.run(['jshint', 'clean', 'copy', 'cacheBust:'+testName, 'nodeunit']);
    });

};
