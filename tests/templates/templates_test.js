'use strict';

var grunt = require('grunt');

module.exports = {

    stylesheet: function(test) {
        test.expect(2);

        var markup = grunt.file.read('tmp/templates/base.html');

        test.ok(markup.match(/views\/view-b\.[a-z0-9]{16}\.html/), 'testing view A');
        test.ok(markup.match(/views\/view-a\.[a-z0-9]{16}\.html/), 'testing view B');

        test.done();
    }

};
