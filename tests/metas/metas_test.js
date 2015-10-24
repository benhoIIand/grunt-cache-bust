'use strict';

var grunt = require('grunt');

module.exports = {

    metas: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/metas/metas.html');

        test.ok(markup.match(/image1\.[a-z0-9]{16}\.jpg/), 'testing meta .jpg');
        test.ok(markup.match(/image1\.[a-z0-9]{16}\.png/), 'testing meta .png');
        test.ok(markup.match(/image1\.[a-z0-9]{16}\.gif/), 'testing meta .gif');

        test.done();
    }

};
