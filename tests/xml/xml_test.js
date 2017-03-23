'use strict';

var grunt = require('grunt');

module.exports = {

    xml: function(test) {
        test.expect(4);

        var browserConfig = grunt.file.read('tmp/xml/xml.xml');

        test.ok(browserConfig.match(/assets\/mstile-70x70\.[a-z0-9]{16}\.png/), 'testing busting of an xml file');
        test.ok(browserConfig.match(/assets\/mstile-150x150\.[a-z0-9]{16}\.png/), 'testing busting of an xml file');
        test.ok(browserConfig.match(/assets\/mstile-310x310\.[a-z0-9]{16}\.png/), 'testing busting of an xml file');
        test.ok(browserConfig.match(/assets\/mstile-310x150\.[a-z0-9]{16}\.png/), 'testing busting of an xml file');

        test.done();
    }

};
