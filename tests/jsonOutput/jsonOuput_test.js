'use strict';

var grunt = require('grunt');

module.exports = {

    jsonOutput: function(test) {
        test.expect(2);

        test.ok(grunt.file.exists('tmp/jsonOutput/cachebuster.json'));
        test.ok(grunt.file.exists('tmp/jsonOutput/output/replace-cachebuster-map.json'));

        test.done();
    }

};
