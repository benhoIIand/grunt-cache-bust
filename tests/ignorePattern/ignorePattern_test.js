'use strict';

var grunt = require('grunt');

module.exports = {

    ignore: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/ignorePattern/ignorePattern.html');

        test.ok(markup.match(/assets\/toBeIgnoredCSS\.[a-z0-9]{16}\.css"/), 'testing toBeIgnoredCSS');
        test.ok(markup.match(/assets\/toBeIgnoredJPG\.jpg"/), 'testing toBeIgnoredJPG');
        test.ok(markup.match(/assets\/toBeIgnoredJS\.[a-z0-9]{16}\.js"/), 'testing toBeIgnoredJS');

        test.done();
    }

};
