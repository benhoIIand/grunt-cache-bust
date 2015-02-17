'use strict';

var grunt = require('grunt');

module.exports = {

    scripts: function(test) {
        test.expect(8);

        var markup = grunt.file.read('tmp/scripts/scripts.html');

        test.ok(markup.match(/script1\.[a-z0-9]{16}\.js/), 'testing script1');
        test.ok(markup.match(/script2\.[a-z0-9]{16}\.js/), 'testing script2');
        test.ok(markup.match(/script3\.[a-z0-9]{16}\.js/), 'testing script3');
        test.ok(markup.match(/script4\.[a-z0-9]{16}\.js/), 'testing script4');

        test.ok(markup.match(/src="\/\/ajax.googleapis.com\/ajax\/libs\/angularjs\/1.0.6\/angular.min.js"/), 'remotely hosted // syntax should remain untouched');
        test.ok(markup.match(/src="https:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.10.2\/jquery.min.js"/), 'remotely hosted https:// syntax should remain untouched');
        test.ok(markup.match(/src="http:\/\/code.jquery.com\/qunit\/qunit-1.12.0.js"/), 'remotely hosted http:// syntax should remain untouched');

        test.ok(markup.match(/defer src="assets\/script1.[a-z0-9]{16}\.js/), 'testing script1 again to see if duplicates are busted');

        test.done();
    }

};
