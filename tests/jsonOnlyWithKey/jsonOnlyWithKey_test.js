'use strict';

var grunt = require('grunt');

module.exports = {

    jsonOutput: function(test) {
        test.expect(1);

        var outputMap = grunt.file.read('tmp/jsonOnlyWithKey/jsonOnlyWithKey-map.json');
        var expectedMap = JSON.stringify({
            'custom-key': 'assets/jsonOnlyWithKey.3bc124f632c7cdbc.js',
            "core-js":"assets/coreFile.7024c34ca835c674.js"
        });

        test.equal(outputMap, expectedMap, 'testing output of json with jsonOnlyWithKey file');

        test.done();
    }

};
