'use strict';

var grunt = require('grunt');

module.exports = {

    stylesheetImport: function(test) {
        test.expect(6);

        var stylesheet = grunt.file.read('tmp/stylesheets/stylesheetImport.html');

        test.ok(stylesheet.match(/stylesheet1\.[a-z0-9]{16}\.css/), 'testing stylesheet1');
        test.ok(stylesheet.match(/stylesheet2\.[a-z0-9]{16}\.css/), 'testing stylesheet2');
        test.ok(stylesheet.match(/stylesheet4\.[a-z0-9]{16}\.css/), 'testing stylesheet4');

        test.ok(stylesheet.match(/href="\/\/netdna.bootstrapcdn.com\/twitter-bootstrap\/2.3.2\/css\/bootstrap-combined.min.css"/), 'remotely hosted // syntax should remain untouched');
        test.ok(stylesheet.match(/href="https:\/\/twitter.github.com\/bootstrap\/assets\/css\/bootstrap.css"/), 'remotely hosted https:// syntax should remain untouched');
        test.ok(stylesheet.match(/href="http:\/\/twitter.github.com\/bootstrap\/assets\/css\/bootstrap.css"/), 'remotely hosted http:// syntax should remain untouched');

        test.done();
    },

    stylesheet: function(test) {
        test.expect(8);

        var markup = grunt.file.read('tmp/stylesheets/stylesheet.css');

        test.ok(markup.match(/css-image\.[a-z0-9]{16}\.jpg/), 'testing an image in a CSS file');
        test.ok(markup.match(/css-image-quotes.[a-z0-9]{16}\.jpg/), 'testing an image in a CSS file');
        test.ok(markup.match(/css-image-large\.[a-z0-9]{16}\.jpg/), 'testing an image in a CSS file');
        test.ok(markup.match(/image1\.[a-z0-9]{16}\.jpg/), 'testing an image in a CSS file within a media query');
        test.ok(markup.match(/image2\.[a-z0-9]{16}\.jpg/), 'testing an image in a CSS file within a media query');
        test.ok(markup.match(/'\/\/www\.external\.com\/external-image1.jpg'/), 'testing an external image in a CSS file');
        test.ok(markup.match(/'http:\/\/www\.external\.com\/external-image2.jpg'/), 'testing an external image in a CSS file');
        test.ok(markup.match(/'https:\/\/www\.external\.com\/external-image3.jpg'/), 'testing an external image in a CSS file');

        test.done();
    },

    replaceCssInSubdir: function(test) {
        test.expect(4);

        var markup = grunt.file.read('tmp/stylesheets/css/replaceCssInSubdir.css');

        test.ok(markup.match(/assets\/relative-css-image\.[a-z0-9]{16}\.jpg/), 'testing the replacement of an image when css in a different subdir than asset');
        test.ok(markup.match(/assets\/relative-css-image-quotes\.[a-z0-9]{16}\.jpg/), 'testing the replacement of an image when css in a different subdir than asset');
        test.ok(markup.match(/assets\/relative-css-image-large\.[a-z0-9]{16}\.jpg/), 'testing the replacement of an image when css in a different subdir than asset');
        test.ok(markup.match(/assets\/relative-image1\.[a-z0-9]{16}\.jpg/), 'testing the replacement of an image when css in a different subdir than asset');

        test.done();
    },

    multipleUrls: function(test) {
        test.expect(5);

        var markup = grunt.file.read('tmp/stylesheets/multipleUrls.css');

        test.ok(markup.match(/assets\/fonts\/icons\.[a-z0-9]{16}\.eot/), 'testing the that multiple urls busted');
        test.ok(markup.match(/assets\/fonts\/icons\.[a-z0-9]{16}\.eot\?#iefix/), 'testing the that multiple urls busted');
        test.ok(markup.match(/assets\/fonts\/icons\.[a-z0-9]{16}\.eot/), 'testing the that multiple urls busted');
        test.ok(markup.match(/assets\/fonts\/icons\.[a-z0-9]{16}\.woff/), 'testing the that multiple urls busted');
        test.ok(markup.match(/assets\/fonts\/icons\.[a-z0-9]{16}\.ttf/), 'testing the that multiple urls busted');

        test.done();
    }

};
