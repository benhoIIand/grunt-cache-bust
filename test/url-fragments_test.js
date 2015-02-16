'use strict';

var grunt = require('grunt');

module.exports = {

    enableUrlFragmentHint: function(test) {
        test.expect(3);

        var phpFile = grunt.file.read('tmp/enableUrlFragmentHint.php');

        test.ok(phpFile.match(/'assets\/standard\.[a-z0-9]{16}\.css\#grunt-cache-bust'/), 'cache bust asset path in single-quoted PHP str');
        test.ok(phpFile.match(/"assets\/image2\.[a-z0-9]{16}\.jpg\#grunt-cache-bust"/), 'cache bust asset path in double-quoted PHP str');
        test.ok(phpFile.match(/"assets\/standard\.[a-z0-9]{16}\.js\#grunt-cache-bust"/), 'cache bust asset path in double-quoted PHP str');

        test.done();
    },

    removeUrlFragmentHint: function(test) {
        test.expect(3);

        var phpFile = grunt.file.read('tmp/removeUrlFragmentHint.php');

        test.ok(phpFile.match(/'assets\/standard\.[a-z0-9]{16}\.css'/), 'cache bust asset path in single-quoted PHP str');
        test.ok(phpFile.match(/"assets\/image2\.[a-z0-9]{16}\.jpg"/), 'cache bust asset path in double-quoted PHP str');
        test.ok(phpFile.match(/"assets\/standard\.[a-z0-9]{16}\.js"/), 'cache bust asset path in double-quoted PHP str');

        test.done();
    }

};
