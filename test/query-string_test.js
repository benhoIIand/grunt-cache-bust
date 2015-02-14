'use strict';

var grunt = require('grunt');

module.exports = {

    ignore: function(test) {
        test.expect(3);

        var scripts = grunt.file.read('tmp/ignorePattern.html');
        test.ok(scripts.match(/assets\/toBeIgnoredCSS\.css"/), 'testing toBeIgnoredCSS');
        test.ok(scripts.match(/assets\/toBeIgnoredJPG\.jpg"/), 'testing toBeIgnoredJPG');
        test.ok(scripts.match(/assets\/toBeIgnoredJS\.js"/), 'testing toBeIgnoredJS');

        test.done();
    },

    scripts: function(test) {
        test.expect(8);

        var scripts = grunt.file.read('tmp/scripts.html');
        test.ok(scripts.match(/script1\.js\?[a-z0-9]{16}/), 'testing script1');
        test.ok(scripts.match(/script2\.js\?[a-z0-9]{16}/), 'testing script2');
        test.ok(scripts.match(/script3\.js\?[a-z0-9]{16}/), 'testing script3');
        test.ok(scripts.match(/script4\.js\?[a-z0-9]{16}/), 'testing script4');

        test.ok(scripts.match(/src="\/\/ajax.googleapis.com\/ajax\/libs\/angularjs\/1.0.6\/angular.min.js"/), 'remotely hosted // syntax should remain untouched');
        test.ok(scripts.match(/src="https:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.10.2\/jquery.min.js"/), 'remotely hosted https:// syntax should remain untouched');
        test.ok(scripts.match(/src="http:\/\/code.jquery.com\/qunit\/qunit-1.12.0.js"/), 'remotely hosted http:// syntax should remain untouched');

        test.ok(scripts.match(/defer src="assets\/script1.js\?[a-z0-9]{16}/), 'testing script1 again to see if duplicates are busted');

        test.done();
    },

    stylesheets: function(test) {
        test.expect(6);

        var stylesheet = grunt.file.read('tmp/stylesheet.html');

        test.ok(stylesheet.match(/stylesheet1\.css\?[a-z0-9]{16}/), 'testing stylesheet1');
        test.ok(stylesheet.match(/stylesheet2\.css\?[a-z0-9]{16}/), 'testing stylesheet2');
        test.ok(stylesheet.match(/stylesheet4\.css\?[a-z0-9]{16}/), 'testing stylesheet4');

        test.ok(stylesheet.match(/href="\/\/netdna.bootstrapcdn.com\/twitter-bootstrap\/2.3.2\/css\/bootstrap-combined.min.css"/), 'remotely hosted // syntax should remain untouched');
        test.ok(stylesheet.match(/href="https:\/\/twitter.github.com\/bootstrap\/assets\/css\/bootstrap.css"/), 'remotely hosted https:// syntax should remain untouched');
        test.ok(stylesheet.match(/href="http:\/\/twitter.github.com\/bootstrap\/assets\/css\/bootstrap.css"/), 'remotely hosted http:// syntax should remain untouched');

        test.done();
    },

    images: function(test) {
        test.expect(17);

        var images = grunt.file.read('tmp/images.html');
        test.ok(images.match(/image1\.jpg\?[a-z0-9]{16}/), 'testing image1 .jpg');
        test.ok(images.match(/image1\.png\?[a-z0-9]{16}/), 'testing image1 .png');
        test.ok(images.match(/image1\.gif\?[a-z0-9]{16}/), 'testing image1 .gif');
        test.ok(images.match(/image1\.svg\?[a-z0-9]{16}/), 'testing image1 .svg');
        test.ok(images.match(/image1\.webp\?[a-z0-9]{16}/), 'testing image1 .webp');

        test.ok(images.match(/image2\.jpg\?[a-z0-9]{16}/), 'testing image2 .jpg');
        test.ok(images.match(/image2\.png\?[a-z0-9]{16}/), 'testing image2 .png');
        test.ok(images.match(/image2\.gif\?[a-z0-9]{16}/), 'testing image2 .gif');
        test.ok(images.match(/image2\.svg\?[a-z0-9]{16}/), 'testing image2 .svg');
        test.ok(images.match(/image2\.webp\?[a-z0-9]{16}/), 'testing image2 .webp');

        test.ok(images.match(/image3\.jpg\?[a-z0-9]{16}/), 'testing image3 .jpg');
        test.ok(images.match(/image3\.png\?[a-z0-9]{16}/), 'testing image3 .png');
        test.ok(images.match(/image3\.gif\?[a-z0-9]{16}/), 'testing image3 .gif');
        test.ok(images.match(/image3\.svg\?[a-z0-9]{16}/), 'testing image3 .svg');
        test.ok(images.match(/image3\.webp\?[a-z0-9]{16}/), 'testing image3 .webp');

        test.ok(images.match(/src=\"data:image\/png\;base64\,iVBORw0KGgoAAAANS"/), 'testing image4 base64');
        test.ok(images.match(/src=\"https:\/\/gravatar.example.com\/avatar\/d3b2094f1b3386e660bb737e797f5dcc\?s=420"/), 'remotely hosted https:// syntax should remain untouched');

        test.done();
    },

    favicons: function(test) {
        test.expect(12);

        var favicon = grunt.file.read('tmp/favicon.html');

        test.ok(favicon.match(/favicon1\.png\?[a-z0-9]{16}/), 'testing favicon1.png');
        test.ok(favicon.match(/favicon1\.ico\?[a-z0-9]{16}/), 'testing favicon1.ico');
        test.ok(favicon.match(/favicon1\.gif\?[a-z0-9]{16}/), 'testing favicon1.gif');
        test.ok(favicon.match(/favicon1\.jpeg\?[a-z0-9]{16}/), 'testing favicon1.jpeg');
        test.ok(favicon.match(/favicon1\.jpg\?[a-z0-9]{16}/), 'testing favicon1.jpg');
        test.ok(favicon.match(/favicon1\.bmp\?[a-z0-9]{16}/), 'testing favicon1.bmp');
        test.ok(favicon.match(/FAVICON2\.png\?[a-z0-9]{16}/), 'testing FAVICON2.PNG');
        test.ok(favicon.match(/FAVICON2\.ico\?[a-z0-9]{16}/), 'testing FAVICON2.ICO');
        test.ok(favicon.match(/FAVICON2\.gif\?[a-z0-9]{16}/), 'testing FAVICON2.GIF');
        test.ok(favicon.match(/FAVICON2\.jpeg\?[a-z0-9]{16}/), 'testing FAVICON2.JPEG');
        test.ok(favicon.match(/FAVICON2\.jpg\?[a-z0-9]{16}/), 'testing FAVICON2.JPG');
        test.ok(favicon.match(/FAVICON2\.bmp\?[a-z0-9]{16}/), 'testing FAVICON2.BMP');

        test.done();
    },

    standard: function(test) {
        test.expect(3);

        var standard = grunt.file.read('tmp/standard.html');
        test.ok(standard.match(/standard\.js\?[a-z0-9]{16}/), 'testing combination of CSS, JS and images');
        test.ok(standard.match(/standard\.css\?[a-z0-9]{16}/), 'testing combination of CSS, JS and images');
        test.ok(standard.match(/standard\.jpg\?[a-z0-9]{16}/), 'testing combination of CSS, JS and images');

        test.done();
    },

    minified: function(test) {
        test.expect(6);

        var minified = grunt.file.read('tmp/minified.html');

        test.ok(minified.match(/stylesheet1\.css\?[a-z0-9]{16}/), 'testing stylesheet1');
        test.ok(minified.match(/stylesheet2\.css\?[a-z0-9]{16}/), 'testing stylesheet2');

        test.ok(minified.match(/script1\.js\?[a-z0-9]{16}/), 'testing javascript1');
        test.ok(minified.match(/script2\.js\?[a-z0-9]{16}/), 'testing javascript2');

        test.ok(minified.match(/image1\.png\?[a-z0-9]{16}/), 'testing image1');
        test.ok(minified.match(/image2\.png\?[a-z0-9]{16}/), 'testing image2');

        test.done();
    }

};
