'use strict';

var grunt = require('grunt');
var fs = require('fs');
var _ = require('grunt').util._;

module.exports = {

    outputDir: function(test) {
        test.expect(8);

        var markup = grunt.file.read('tmp/outputDir/outputDir.html');
        var css = grunt.file.read('tmp/outputDir/outputDir/outputDir.abcdef123456.css');
        var actual = fs.readdirSync('tmp/outputDir/assets').sort();
        var expected = fs.readdirSync('tests/outputDir/assets').sort();

        test.ok(markup.match(/outputDir\/outputDir\.abcdef123456\.css/), 'testing outputDir/outputDir.css in html');
        test.ok(markup.match(/outputDir\/outputDir\.abcdef123456\.png/), 'testing outputDir/outputDir.png in html');
        test.ok(markup.match(/outputDir\/outputDir\.abcdef123456\.js/ ), 'testing outputDir/outputDir.js in html');
        test.ok(css.match(/outputDir\.abcdef123456\.png/ ), 'testing outputDir/outputDir.png in css');

        test.deepEqual(expected, actual, 'should not have files in assets folder');

        // original files should not be changed
        _.each(['outputDir.png', 'outputDir.css', 'outputDir.js'], function(file) {
            var original = grunt.file.read('tests/outputDir/assets/' + file);
            var copied = grunt.file.read('tmp/outputDir/assets/' + file);
            test.equal(original, copied, file + ' should not have changed');
        });

        test.done();
    }
};
