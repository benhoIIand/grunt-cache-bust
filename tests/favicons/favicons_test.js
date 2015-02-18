'use strict';

var grunt = require('grunt');

module.exports = {

    favicons: function(test) {
        test.expect(12);

        var markup = grunt.file.read('tmp/favicons/favicon.html');

        test.ok(markup.match(/favicon1\.[a-z0-9]{16}\.png/), 'testing favicon1.png');
        test.ok(markup.match(/favicon1\.[a-z0-9]{16}\.ico/), 'testing favicon1.ico');
        test.ok(markup.match(/favicon1\.[a-z0-9]{16}\.gif/), 'testing favicon1.gif');
        test.ok(markup.match(/favicon1\.[a-z0-9]{16}\.jpeg/), 'testing favicon1.jpeg');
        test.ok(markup.match(/favicon1\.[a-z0-9]{16}\.jpg/), 'testing favicon1.jpg');
        test.ok(markup.match(/favicon1\.[a-z0-9]{16}\.bmp/), 'testing favicon1.bmp');
        test.ok(markup.match(/FAVICON2\.[a-z0-9]{16}\.png/), 'testing FAVICON2.PNG');
        test.ok(markup.match(/FAVICON2\.[a-z0-9]{16}\.ico/), 'testing FAVICON2.ICO');
        test.ok(markup.match(/FAVICON2\.[a-z0-9]{16}\.gif/), 'testing FAVICON2.GIF');
        test.ok(markup.match(/FAVICON2\.[a-z0-9]{16}\.jpeg/), 'testing FAVICON2.JPEG');
        test.ok(markup.match(/FAVICON2\.[a-z0-9]{16}\.jpg/), 'testing FAVICON2.JPG');
        test.ok(markup.match(/FAVICON2\.[a-z0-9]{16}\.bmp/), 'testing FAVICON2.BMP');

        test.done();
    }

};
