'use strict';

var grunt = require('grunt');

module.exports = {

    comments: function(test) {
        test.expect(2);

        var comments = grunt.file.read('tmp/comments.html');

        test.ok(comments.match(/standard\.css\?[a-z0-9]{16}/), 'testing stylesheet');
        test.ok(comments.match(/standard\.js\?[a-z0-9]{16}/), 'testing javascript');

        test.done();
    }

};
