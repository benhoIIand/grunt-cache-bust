'use strict';

var grunt = require('grunt');

module.exports = {

    jsonOutput: function(test) {
        test.expect(2);

        var expected = grunt.file.read('tests/jsonOutput/jsonOutputExpected.json').trim();
        var output = grunt.file.read('tmp/jsonOutput/output/cachebuster-map.json').trim();

        test.ok(grunt.file.exists('tmp/jsonOutput/output/cachebuster-map.json'));
        test.equal(expected, output);

        test.done();
    }

};
