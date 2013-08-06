var grunt = require('grunt');

exports.cachebust = {
    main: function(test) {
        test.expect(10);

        var scripts = grunt.file.read('tmp/script.html');
        test.ok(scripts.match(/script1\.js\?[a-z0-9]{32}/), 'script1');
        test.ok(scripts.match(/script2\.js\?[a-z0-9]{32}/), 'script2');
        test.ok(scripts.match(/script3\.js\?[a-z0-9]{32}/), 'script3');
        test.ok(scripts.match(/script4\.js\?[a-z0-9]{32}/), 'script4');

        var stylesheet = grunt.file.read('tmp/stylesheet.html');
        test.ok(stylesheet.match(/stylesheet1\.css\?[a-z0-9]{32}/), 'stylesheet1');
        test.ok(stylesheet.match(/stylesheet2\.css\?[a-z0-9]{32}/), 'stylesheet2');
        test.ok(stylesheet.match(/stylesheet3\.css\?[a-z0-9]{32}/), 'stylesheet3');
        test.ok(stylesheet.match(/stylesheet4\.css\?[a-z0-9]{32}/), 'stylesheet4');

        var standard = grunt.file.read('tmp/standard.html');
        test.ok(standard.match(/standard\.js\?[a-z0-9]{32}/), 'testing stuff');
        test.ok(standard.match(/standard\.css\?[a-z0-9]{32}/), 'testing stuff');

        test.done();
    }
};