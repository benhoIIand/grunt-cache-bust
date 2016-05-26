'use strict';

var grunt = require('grunt');

module.exports = {

    jsonOutput: function(test) {
        test.expect(1);

        var outputMap = grunt.file.read('tmp/jsonOnly/jsonOnly-map.json');
        var expectedMap = JSON.stringify({
            'assets/jsonOnly.js': 'assets/jsonOnly.3bc124f632c7cdbc.js'
        });

        test.equal(outputMap, expectedMap, 'testing output of json with jsonOnly file');

        test.done();
    }

};
