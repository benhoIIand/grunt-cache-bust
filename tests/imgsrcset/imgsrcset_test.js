'use strict';

var grunt = require('grunt');

module.exports = {

    imgsrcset: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/imgsrcset/imgsrcset.html');

        test.ok(markup.match(/assets\/imgsrcset\.[a-z0-9]{16}\.jpg/), 'testing assets/imgsrcset.jpg');
        test.ok(markup.match(/assets\/imgsrcset-big\.[a-z0-9]{16}\.jpg/), 'testing assets/imgsrcset-big.jpg');
        test.ok(markup.match(/assets\/imgsrcset-small\.[a-z0-9]{16}\.jpg/), 'testing assets/imgsrcset-small.jpg');

        test.done();
    }

};
