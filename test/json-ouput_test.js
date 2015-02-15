'use strict';

var grunt = require('grunt');

module.exports = {

    testJSONOutput: function(test) {
        test.expect(2);

        test.ok(grunt.file.exists('tmp/cachebuster.json'));
        test.ok(grunt.file.exists('tmp/output/replace-cachebuster-map.json'));

        test.done();
    }

};
