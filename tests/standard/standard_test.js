'use strict';

var grunt = require('grunt');

module.exports = {

    standard: function(test) {
        test.expect(4);

        var markup = grunt.file.read('tmp/standard/standard.html');

        test.ok(markup.match(/assets\/standard\.[a-z0-9]{16}\.css/), 'testing assets/standard.css');
        test.ok(markup.match(/assets\/standard\.[a-z0-9]{16}\.jpg/), 'testing assets/standard.jpg');
        test.ok(markup.match(/assets\/standard\.[a-z0-9]{16}\.js/ ), 'testing assets/standard.js');
        test.ok(markup.match(/assets\/standard-apple-touch-icon\.[a-z0-9]{16}\.jpg/), 'testing assets/standard-apple-touch-icon.jpg');

        test.done();
    },

    relative: function(test) {
        test.expect(4);

        var markup = grunt.file.read('tmp/standard/subfolder/relative-standard.html');

        test.ok(markup.match(/assets\/standard\.[a-z0-9]{16}\.css/), 'testing relative file path of assets/standard.css');
        test.ok(markup.match(/assets\/standard\.[a-z0-9]{16}\.jpg/), 'testing relative file path of assets/standard.jpg');
        test.ok(markup.match(/assets\/standard\.[a-z0-9]{16}\.js/ ), 'testing relative file path of assets/standard.js');
        test.ok(markup.match(/assets\/standard-apple-touch-icon\.[a-z0-9]{16}\.jpg/ ), 'testing relative file path of assets/standard-apple-touch-icon.jpg');

        test.done();
    }

};
