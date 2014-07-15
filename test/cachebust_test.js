'use strict';

var grunt = require('grunt');

exports.cachebust = {

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

    replaceName: function(test) {
        test.expect(6);

        var standard = grunt.file.read('tmp/replace.html');
        test.ok(standard.match(/replace\.[a-z0-9]{16}\.js/), 'testing replaceName combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replace\.[a-z0-9]{16}\.js/)[0]));
        test.ok(standard.match(/replace\.[a-z0-9]{16}\.css/), 'testing replaceName combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replace\.[a-z0-9]{16}\.css/)[0]));
        test.ok(standard.match(/replace\.[a-z0-9]{16}\.png/), 'testing replaceName combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replace\.[a-z0-9]{16}\.png/)[0]));

        test.done();
    },

    scriptsInDifferentFiles: function(test) {
        test.expect(6);

        var standard = grunt.file.read('tmp/replaceSameAssetsAcrossFiles.html');
        test.ok(standard.match(/replace\.[a-z0-9]{16}\.js/), 'testing replaceName combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replace\.[a-z0-9]{16}\.js/)[0]));
        test.ok(standard.match(/replace\.[a-z0-9]{16}\.css/), 'testing replaceName combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replace\.[a-z0-9]{16}\.css/)[0]));
        test.ok(standard.match(/replace\.[a-z0-9]{16}\.png/), 'testing replaceName combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replace\.[a-z0-9]{16}\.png/)[0]));

        test.done();
    },

    deletesOriginalFiles: function(test) {
        test.expect(3);

        test.ok(!grunt.file.exists('tmp/assets/replace.css'));
        test.ok(!grunt.file.exists('tmp/assets/replace.png'));
        test.ok(!grunt.file.exists('tmp/assets/replace.js'));

        test.done();
    },

    replaceNameAlreadyBusted: function(test) {
        test.expect(6);

        var standard = grunt.file.read('tmp/replaceAlreadyBusted.html');

        test.ok(standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.js/), 'testing already busted JS assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.js/)[0]));
        test.ok(standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.css/), 'testing already busted CSS assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.css/)[0]));
        test.ok(standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.jpg/), 'testing already busted image assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.jpg/)[0]));

        test.done();
    },

    replaceTerm: function(test) {
        test.expect(6);

        var standard = grunt.file.read('tmp/replaceTerm.html');
        test.ok(standard.match(/replaceTerm\.[a-z0-9]{16}\.js/), 'testing already busted JS assets in replaceTerm');
        test.ok(grunt.file.exists('tmp/assets/com/'+ standard.match(/replaceTerm\.[a-z0-9]{16}\.js/)[0]));
        test.ok(standard.match(/replaceTerm\.[a-z0-9]{16}\.css/), 'testing already busted CSS assets in replaceTerm');
        test.ok(grunt.file.exists('tmp/assets/com/'+ standard.match(/replaceTerm\.[a-z0-9]{16}\.css/)[0]));
        test.ok(standard.match(/replaceTerm\.[a-z0-9]{16}\.jpg/), 'testing already busted image assets in replaceTerm');
        test.ok(grunt.file.exists('tmp/assets/com/'+ standard.match(/replaceTerm\.[a-z0-9]{16}\.jpg/)[0]));

        test.done();
    },

    alreadyBusted: function(test) {
        test.expect(3);

        var alreadyBusted = grunt.file.read('tmp/alreadyBusted.html');
        test.ok(alreadyBusted.match(/alreadyBusted\.css\?(?!ba366c2f0f734f23)[a-z0-9]{16}/), 'testing alreadyBusted of CSS, JS and images');
        test.ok(alreadyBusted.match(/alreadyBusted\.jpg\?(?!f23467496aef741a)[a-z0-9]{16}/), 'testing alreadyBusted of CSS, JS and images');
        test.ok(alreadyBusted.match(/alreadyBusted\.js\?(?!b574cbb60333af12)[a-z0-9]{16}/), 'testing alreadyBusted of CSS, JS and images');

        test.done();
    },

    placeholder: function(test) {
        test.expect(1);

        var correctContent = grunt.file.read('test/fixtures/placeholder.html');
        var alreadyBusted  = grunt.file.read('tmp/placeholder.html');

        test.equal(correctContent, alreadyBusted, 'testing placeholder images');

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
    },

    comments: function(test) {
        test.expect(2);

        var comments = grunt.file.read('tmp/comments.html');

        test.ok(comments.match(/standard\.css\?[a-z0-9]{16}/), 'testing stylesheet');
        test.ok(comments.match(/standard\.js\?[a-z0-9]{16}/), 'testing javascript');

        test.done();
    },

    enableUrlFragmentHint: function(test) {
        test.expect(3);

        var phpFile = grunt.file.read('tmp/enableUrlFragmentHint.php');

        test.ok(phpFile.match(/'assets\/standard\.[a-z0-9]{16}\.css\#grunt-cache-bust'/), 'cache bust asset path in single-quoted PHP str');
        test.ok(phpFile.match(/"assets\/image2\.[a-z0-9]{16}\.jpg\#grunt-cache-bust"/), 'cache bust asset path in double-quoted PHP str');
        test.ok(phpFile.match(/"assets\/standard\.[a-z0-9]{16}\.js\#grunt-cache-bust"/), 'cache bust asset path in double-quoted PHP str');

        test.done();
    },

    testJSONOutput: function(test) {
        test.expect(2);

        test.ok(grunt.file.exists('tmp/cachebuster.json'));
        test.ok(grunt.file.exists('tmp/output/replace-cachebuster-map.json'));

        test.done();
    },

    srcSet: function(test) {
        test.expect(3);

        var srcset = grunt.file.read('tmp/srcset.html');

        test.ok(srcset.match(/srcset\.jpeg\?[a-z0-9]{16}/), 'testing the srcset image');
        test.ok(srcset.match(/srcset@2x\.jpeg\?[a-z0-9]{16}/), 'testing the srcset@2x image');
        test.ok(srcset.match(/srcset-mobile\.jpeg\?[a-z0-9]{16}/), 'testing the srcset-mobile image');

        test.done();
    },

    replaceSrcSet: function(test) {
        test.expect(3);

        var srcset = grunt.file.read('tmp/replaceSrcset.html');

        test.ok(srcset.match(/srcset\.[a-z0-9]{16}\.jpeg/), 'testing the replacement of srcset image');
        test.ok(srcset.match(/srcset@2x\.[a-z0-9]{16}\.jpeg/), 'testing the replacement of srcset@2x image');
        test.ok(srcset.match(/srcset-mobile\.[a-z0-9]{16}\.jpeg/), 'testing the replacement of srcset-mobile image');

        test.done();
    },

    cssFile: function(test) {
        test.expect(3);

        var srcset = grunt.file.read('tmp/stylesheet.css');

        test.ok(srcset.match(/css-image\.jpg\?[a-z0-9]{16}/), 'testing an image in a CSS file');
        test.ok(srcset.match(/css-image-quotes.jpg\?[a-z0-9]{16}/), 'testing an image in a CSS file');
        test.ok(srcset.match(/css-image-large\.jpg\?[a-z0-9]{16}/), 'testing an image in a CSS file');

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
