'use strict';

var grunt = require('grunt');

module.exports = {

    hash: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/hash/hash.html');

        test.ok(markup.match(/assets\/hash\.abcdef123456\.css/), 'testing assets/hash.css');
        test.ok(markup.match(/assets\/hash\.abcdef123456\.jpg/), 'testing assets/hash.jpg');
        test.ok(markup.match(/assets\/hash\.abcdef123456\.js/ ), 'testing assets/hash.js');

        test.done();
    }

};
