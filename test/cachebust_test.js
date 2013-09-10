var grunt = require('grunt');

exports.cachebust = {
    scripts: function(test) {
        test.expect(7);

        var scripts = grunt.file.read('tmp/script.html');
        test.ok(scripts.match(/script1\.js\?[a-z0-9]{16}/), 'testing script1');
        test.ok(scripts.match(/script2\.js\?[a-z0-9]{16}/), 'testing script2');
        test.ok(scripts.match(/script3\.js\?[a-z0-9]{16}/), 'testing script3');
        test.ok(scripts.match(/script4\.js\?[a-z0-9]{16}/), 'testing script4');

        test.ok(scripts.match(/src="\/\/ajax.googleapis.com\/ajax\/libs\/angularjs\/1.0.6\/angular.min.js"/), 'remotely hosted // syntax should remain untouched');
        test.ok(scripts.match(/src="https:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.10.2\/jquery.min.js"/), 'remotely hosted https:// syntax should remain untouched');
        test.ok(scripts.match(/src="http:\/\/code.jquery.com\/qunit\/qunit-1.12.0.js"/), 'remotely hosted http:// syntax should remain untouched');

        test.done();
    },

    stylesheets: function(test) {
        test.expect(7);

        var stylesheet = grunt.file.read('tmp/stylesheet.html');
        console.log(stylesheet);
        test.ok(stylesheet.match(/stylesheet1\.css\?[a-z0-9]{16}/), 'testing stylesheet1');
        test.ok(stylesheet.match(/stylesheet2\.css\?[a-z0-9]{16}/), 'testing stylesheet2');
        test.ok(stylesheet.match(/stylesheet3\.css\?[a-z0-9]{16}/), 'testing stylesheet3');
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
        console.log(images);
        test.ok(images.match(/src=\"https:\/\/gravatar.example.com\/avatar\/d3b2094f1b3386e660bb737e797f5dcc\?s=420"/), 'remotely hosted https:// syntax should remain untouched');

        test.done();
    },

    replaceName: function(test) {
        test.expect(3);

        var standard = grunt.file.read('tmp/replace.html');
        test.ok(standard.match(/replace_[a-z0-9]{16}\.js/), 'testing replaceName combination of CSS, JS and images');
        test.ok(standard.match(/replace_[a-z0-9]{16}\.css/), 'testing replaceName combination of CSS, JS and images');
        test.ok(standard.match(/replace_[a-z0-9]{16}\.png/), 'testing replaceName combination of CSS, JS and images');

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

        var correctContent = grunt.file.read('test/fixtures/placeholder.html'),
            alreadyBusted  = grunt.file.read('tmp/placeholder.html');

        test.equal(correctContent, alreadyBusted, 'testing placeholder images');

        test.done();
    },

    all: function(test) {
        test.expect(3);

        var standard = grunt.file.read('tmp/standard.html');
        test.ok(standard.match(/standard\.js\?[a-z0-9]{16}/), 'testing combination of CSS, JS and images');
        test.ok(standard.match(/standard\.css\?[a-z0-9]{16}/), 'testing combination of CSS, JS and images');
        test.ok(standard.match(/standard\.jpg\?[a-z0-9]{16}/), 'testing combination of CSS, JS and images');

        test.done();
    }
};