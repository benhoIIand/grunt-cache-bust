'use strict';

var grunt = require('grunt');
var fs = require('fs');

module.exports = {

    outputDir: function(test) {
        test.expect(4);

        var markup = grunt.file.read('tmp/outputDir/outputDir.html');
        var actual = fs.readdirSync('tmp/outputDir/assets').sort();
        var expected = fs.readdirSync('tests/outputDir/assets').sort();

        test.ok(markup.match(/outputDir\/outputDir\.abcdef123456\.css/), 'testing outputDir/outputDir.css');
        test.ok(markup.match(/outputDir\/outputDir\.abcdef123456\.png/), 'testing outputDir/outputDir.png');
        test.ok(markup.match(/outputDir\/outputDir\.abcdef123456\.js/ ), 'testing outputDir/outputDir.js');

        test.deepEqual(expected, actual, 'should not have files in assets folder');

        test.done();
    }
};
