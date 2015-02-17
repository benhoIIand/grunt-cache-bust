'use strict';

var grunt = require('grunt');

module.exports = {

    replaceTerm: function(test) {
        test.expect(6);

        var markup = grunt.file.read('tmp/replaceTerm/replaceTerm.html');

        test.ok(markup.match(/com\/replaceTerm\.[a-z0-9]{16}\.js/), 'testing already busted JS replaceTerm/assets in replaceTerm');
        test.ok(grunt.file.exists('tmp/replaceTerm/assets/com/' + markup.match(/replaceTerm\.[a-z0-9]{16}\.js/)[0]));
        test.ok(markup.match(/com\/replaceTerm\.[a-z0-9]{16}\.css/), 'testing already busted CSS replaceTerm/assets in replaceTerm');
        test.ok(grunt.file.exists('tmp/replaceTerm/assets/com/' + markup.match(/replaceTerm\.[a-z0-9]{16}\.css/)[0]));
        test.ok(markup.match(/com\/replaceTerm\.[a-z0-9]{16}\.jpg/), 'testing already busted image replaceTerm/assets in replaceTerm');
        test.ok(grunt.file.exists('tmp/replaceTerm/assets/com/' + markup.match(/replaceTerm\.[a-z0-9]{16}\.jpg/)[0]));

        test.done();
    }

};
