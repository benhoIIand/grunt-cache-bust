'use strict';

var grunt = require('grunt');

module.exports = {

    scripts: function(test) {
        test.expect(1);

        var markup = grunt.file.read('tmp/scripts/scripts.js');

        test.ok(markup.match(/script\.[a-z0-9]{16}\.js/), 'testing script');

        test.done();
    }

};
