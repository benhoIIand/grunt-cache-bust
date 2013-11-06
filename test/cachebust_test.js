var grunt = require('grunt');

exports.cachebust = {

    minified: function(test) {
        test.expect(6);

        var minified = grunt.file.read('tmp/minified.html');

        test.ok(minified.match(/stylesheet1\.css\?[a-z0-9]{16}/), 'testing stylesheet1');
        test.ok(minified.match(/stylesheet2\.css\?[a-z0-9]{16}/), 'testing stylesheet2');

        test.ok(minified.match(/javascript1\.js\?[a-z0-9]{16}/), 'testing javascript1');
        test.ok(minified.match(/javascript2\.js\?[a-z0-9]{16}/), 'testing javascript2');

        test.ok(minified.match(/image1\.png\?[a-z0-9]{16}/), 'testing image1');
        test.ok(minified.match(/image2\.png\?[a-z0-9]{16}/), 'testing image2');

        test.done();
    }
};