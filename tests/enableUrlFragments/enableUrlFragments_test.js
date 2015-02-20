'use strict';

var grunt = require('grunt');

module.exports = {

    enableUrlFragment: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/enableUrlFragments/enableUrlFragments.php');

        test.ok(markup.match(/'assets\/standard\.[a-z0-9]{16}\.css\#grunt-cache-bust'/), 'cache bust asset path in single-quoted PHP str');
        test.ok(markup.match(/"assets\/standard\.[a-z0-9]{16}\.jpg\#grunt-cache-bust"/), 'cache bust asset path in double-quoted PHP str');
        test.ok(markup.match(/"assets\/standard\.[a-z0-9]{16}\.js\#grunt-cache-bust"/), 'cache bust asset path in double-quoted PHP str');

        test.done();
    }

};
