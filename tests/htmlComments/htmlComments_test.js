'use strict';

var grunt = require('grunt');

module.exports = {

    comments: function(test) {
        test.expect(2);

        var markup = grunt.file.read('tmp/htmlComments/htmlComments.html');

        test.ok(markup.match(/standard\.[a-z0-9]{16}\.css/), 'testing stylesheet');
        test.ok(markup.match(/standard\.[a-z0-9]{16}\.js/), 'testing javascript');

        test.done();
    }

};
