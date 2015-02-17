'use strict';

var grunt = require('grunt');

module.exports = {

    images: function(test) {
        test.expect(17);

        var markup = grunt.file.read('tmp/images/images.html');

        test.ok(markup.match(/image1\.jpg\?[a-z0-9]{16}/), 'testing image1 .jpg');
        test.ok(markup.match(/image1\.png\?[a-z0-9]{16}/), 'testing image1 .png');
        test.ok(markup.match(/image1\.gif\?[a-z0-9]{16}/), 'testing image1 .gif');
        test.ok(markup.match(/image1\.svg\?[a-z0-9]{16}/), 'testing image1 .svg');
        test.ok(markup.match(/image1\.webp\?[a-z0-9]{16}/), 'testing image1 .webp');

        test.ok(markup.match(/image2\.jpg\?[a-z0-9]{16}/), 'testing image2 .jpg');
        test.ok(markup.match(/image2\.png\?[a-z0-9]{16}/), 'testing image2 .png');
        test.ok(markup.match(/image2\.gif\?[a-z0-9]{16}/), 'testing image2 .gif');
        test.ok(markup.match(/image2\.svg\?[a-z0-9]{16}/), 'testing image2 .svg');
        test.ok(markup.match(/image2\.webp\?[a-z0-9]{16}/), 'testing image2 .webp');

        test.ok(markup.match(/image3\.jpg\?[a-z0-9]{16}/), 'testing image3 .jpg');
        test.ok(markup.match(/image3\.png\?[a-z0-9]{16}/), 'testing image3 .png');
        test.ok(markup.match(/image3\.gif\?[a-z0-9]{16}/), 'testing image3 .gif');
        test.ok(markup.match(/image3\.svg\?[a-z0-9]{16}/), 'testing image3 .svg');
        test.ok(markup.match(/image3\.webp\?[a-z0-9]{16}/), 'testing image3 .webp');

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
    }

};
