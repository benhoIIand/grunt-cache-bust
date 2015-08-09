'use strict';

var grunt = require('grunt');

module.exports = {

    jsonOutput: function(test) {
        test.expect(1);

        var outputMap = grunt.file.read('tmp/jsonOutput/jsonOutput-map.json');
        var expectedMap = JSON.stringify({
            'assets/jsonOutput.js': 'assets/jsonOutput.3bc124f632c7cdbc.js'
        });

        test.equal(outputMap, expectedMap, 'testing output of json file');

        test.done();
    }

};
