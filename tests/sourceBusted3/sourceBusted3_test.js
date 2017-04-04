'use strict';

var grunt = require('grunt');

module.exports = {

    // The hardcoded source file is busted to a hashed filename, make sure that file is busted instead
    sourceBusted: function(test) {
        var html = grunt.file.read('tmp/sourceBusted3/sourceBusted3.html');
        test.ok(html.match(/\"assets\/css\/application\.123456789\.css\"/), 'testing /assets/css/application.css replaced in HTML');

        var css = grunt.file.read('tmp/sourceBusted3/assets/css/application.123456789.css');
        test.ok(css.match(/url\(\/assets\/images\/testbg\.123456789\.png\)/), 'testing /assets/images/testbg.png replaced in busted CSS');

        test.done();
    }

};
