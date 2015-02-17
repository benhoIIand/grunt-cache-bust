'use strict';

var grunt = require('grunt');

module.exports = {

    ignore: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/ignorePattern/ignorePattern.html');

        test.ok(markup.match(/assets\/toBeIgnoredCSS\.css"/), 'testing toBeIgnoredCSS');
        test.ok(markup.match(/assets\/toBeIgnoredJPG\.jpg"/), 'testing toBeIgnoredJPG');
        test.ok(markup.match(/assets\/toBeIgnoredJS\.js"/), 'testing toBeIgnoredJS');

        test.done();
    }

};
