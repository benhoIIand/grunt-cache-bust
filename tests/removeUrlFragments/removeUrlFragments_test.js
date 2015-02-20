'use strict';

var grunt = require('grunt');

module.exports = {

    removeUrlFragments: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/removeUrlFragments/removeUrlFragments.php');

        test.ok(markup.match(/'assets\/standard\.[a-z0-9]{16}\.css'/), 'cache bust asset path in single-quoted PHP str');
        test.ok(markup.match(/"assets\/standard\.[a-z0-9]{16}\.jpg"/), 'cache bust asset path in double-quoted PHP str');
        test.ok(markup.match(/"assets\/standard\.[a-z0-9]{16}\.js"/), 'cache bust asset path in double-quoted PHP str');

        test.done();
    }

};
