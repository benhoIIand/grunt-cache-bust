'use strict';

var grunt = require('grunt');

module.exports = {

    cssFile: function(test) {
        test.expect(5);

        var srcset = grunt.file.read('tmp/stylesheet.css');

        test.ok(srcset.match(/css-image\.jpg\?[a-z0-9]{16}/), 'testing an image in a CSS file');
        test.ok(srcset.match(/css-image-quotes.jpg\?[a-z0-9]{16}/), 'testing an image in a CSS file');
        test.ok(srcset.match(/css-image-large\.jpg\?[a-z0-9]{16}/), 'testing an image in a CSS file');
        test.ok(srcset.match(/image1\.jpg\?[a-z0-9]{16}/), 'testing an image in a CSS file within a media query');
        test.ok(srcset.match(/image2\.jpg\?[a-z0-9]{16}/), 'testing an image in a CSS file within a media query');

        test.done();
    },

    replaceCssFile: function(test) {
        test.expect(3);

        var srcset = grunt.file.read('tmp/replaceStylesheet.css');

        test.ok(srcset.match(/css-image.[a-z0-9]{16}\.jpg/), 'testing the replacement of an image in a CSS file');
        test.ok(srcset.match(/css-image-quotes.[a-z0-9]{16}\.jpg/), 'testing the replacement of an image in a CSS file');
        test.ok(srcset.match(/css-image-large.[a-z0-9]{16}\.jpg/), 'testing the replacement of an image in a CSS file');

        test.done();
    }

};
