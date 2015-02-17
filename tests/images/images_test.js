'use strict';

var grunt = require('grunt');

module.exports = {

    images: function(test) {
        test.expect(17);

        var markup = grunt.file.read('tmp/images/images.html');

        test.ok(markup.match(/image1\.[a-z0-9]{16}\.jpg/), 'testing image1 .jpg');
        test.ok(markup.match(/image1\.[a-z0-9]{16}\.png/), 'testing image1 .png');
        test.ok(markup.match(/image1\.[a-z0-9]{16}\.gif/), 'testing image1 .gif');
        test.ok(markup.match(/image1\.[a-z0-9]{16}\.svg/), 'testing image1 .svg');
        test.ok(markup.match(/image1\.[a-z0-9]{16}\.webp/), 'testing image1 .webp');

        test.ok(markup.match(/image2\.[a-z0-9]{16}\.jpg/), 'testing image2 .jpg');
        test.ok(markup.match(/image2\.[a-z0-9]{16}\.png/), 'testing image2 .png');
        test.ok(markup.match(/image2\.[a-z0-9]{16}\.gif/), 'testing image2 .gif');
        test.ok(markup.match(/image2\.[a-z0-9]{16}\.svg/), 'testing image2 .svg');
        test.ok(markup.match(/image2\.[a-z0-9]{16}\.webp/), 'testing image2 .webp');

        test.ok(markup.match(/image3\.[a-z0-9]{16}\.jpg/), 'testing image3 .jpg');
        test.ok(markup.match(/image3\.[a-z0-9]{16}\.png/), 'testing image3 .png');
        test.ok(markup.match(/image3\.[a-z0-9]{16}\.gif/), 'testing image3 .gif');
        test.ok(markup.match(/image3\.[a-z0-9]{16}\.svg/), 'testing image3 .svg');
        test.ok(markup.match(/image3\.[a-z0-9]{16}\.webp/), 'testing image3 .webp');

        test.ok(markup.match(/src=\"data:image\/png\;base64\,iVBORw0KGgoAAAANS"/), 'testing image4 base64');
        test.ok(markup.match(/src=\"https:\/\/gravatar.example.com\/avatar\/d3b2094f1b3386e660bb737e797f5dcc\?s=420"/), 'remotely hosted https:// syntax should remain untouched');

        test.done();
    },

    srcSet: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/images/srcset.html');

        test.ok(markup.match(/srcset\.[a-z0-9]{16}\.jpeg/), 'testing the replacement of srcset image');
        test.ok(markup.match(/srcset@2x\.[a-z0-9]{16}\.jpeg/), 'testing the replacement of srcset@2x image');
        test.ok(markup.match(/srcset-mobile\.[a-z0-9]{16}\.jpeg/), 'testing the replacement of srcset-mobile image');

        test.done();
    },

    placeholder: function(test) {
        test.expect(1);

        var correctContent = grunt.file.read('tests/images/placeholder.html');
        var alreadyBusted = grunt.file.read('tmp/images/placeholder.html');

        test.equal(correctContent, alreadyBusted, 'testing placeholder images');

        test.done();
    }

};
