'use strict';

var grunt = require('grunt');

module.exports = {

    standard: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/standard/standard.html');

        test.ok(markup.match(/assets\/standard\.[a-z0-9]{16}\.css/), 'testing assets/standard.css');
        test.ok(markup.match(/assets\/standard\.[a-z0-9]{16}\.jpg/), 'testing assets/standard.jpg');
        test.ok(markup.match(/assets\/standard\.[a-z0-9]{16}\.js/ ), 'testing assets/standard.js');

        test.done();
    }

};
