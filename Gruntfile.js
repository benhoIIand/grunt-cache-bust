module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
};