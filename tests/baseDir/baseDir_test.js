'use strict';

var grunt = require('grunt');

module.exports = {

    baseDir: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/baseDir/baseDir.html');

        test.ok(markup.match(/baseDir\.[a-z0-9]{16}\.js/), 'testing baseDir combination of CSS, JS and images');
        test.ok(markup.match(/baseDir\.[a-z0-9]{16}\.css/), 'testing baseDir combination of CSS, JS and images');
        test.ok(markup.match(/baseDir\.[a-z0-9]{16}\.jpg/), 'testing baseDir combination of CSS, JS and images');

        test.done();
    }

};
