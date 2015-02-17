'use strict';

var grunt = require('grunt');

module.exports = {

    favicons: function(test) {
        test.expect(12);

        var markup = grunt.file.read('tmp/favicons/favicon.html');

        test.ok(markup.match(/favicon1\.png\?[a-z0-9]{16}/), 'testing favicon1.png');
        test.ok(markup.match(/favicon1\.ico\?[a-z0-9]{16}/), 'testing favicon1.ico');
        test.ok(markup.match(/favicon1\.gif\?[a-z0-9]{16}/), 'testing favicon1.gif');
        test.ok(markup.match(/favicon1\.jpeg\?[a-z0-9]{16}/), 'testing favicon1.jpeg');
        test.ok(markup.match(/favicon1\.jpg\?[a-z0-9]{16}/), 'testing favicon1.jpg');
        test.ok(markup.match(/favicon1\.bmp\?[a-z0-9]{16}/), 'testing favicon1.bmp');
        test.ok(markup.match(/FAVICON2\.png\?[a-z0-9]{16}/), 'testing FAVICON2.PNG');
        test.ok(markup.match(/FAVICON2\.ico\?[a-z0-9]{16}/), 'testing FAVICON2.ICO');
        test.ok(markup.match(/FAVICON2\.gif\?[a-z0-9]{16}/), 'testing FAVICON2.GIF');
        test.ok(markup.match(/FAVICON2\.jpeg\?[a-z0-9]{16}/), 'testing FAVICON2.JPEG');
        test.ok(markup.match(/FAVICON2\.jpg\?[a-z0-9]{16}/), 'testing FAVICON2.JPG');
        test.ok(markup.match(/FAVICON2\.bmp\?[a-z0-9]{16}/), 'testing FAVICON2.BMP');

        test.done();
    }

};
