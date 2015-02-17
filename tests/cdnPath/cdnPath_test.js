'use strict';

var grunt = require('grunt');

module.exports = {

    cdnPath: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/cdnPath/cdnPath.html');

        test.ok(markup.match(/cdnPath\.[a-z0-9]{16}\.css/), 'testing cdnPath is ignored');
        test.ok(markup.match(/cdnPath\.[a-z0-9]{16}\.png/), 'testing cdnPath is ignored');
        test.ok(markup.match(/cdnPath\.[a-z0-9]{16}\.js/), 'testing cdnPath is ignored');

        test.done();
    }

};
