'use strict';

var grunt = require('grunt');

module.exports = {

    replaceTerm: function(test) {
        test.expect(6);

        var standard = grunt.file.read('tmp/replaceTerm.html');
        test.ok(standard.match(/replaceTerm\.[a-z0-9]{16}\.js/), 'testing already busted JS assets in replaceTerm');
        test.ok(grunt.file.exists('tmp/assets/com/' + standard.match(/replaceTerm\.[a-z0-9]{16}\.js/)[0]));
        test.ok(standard.match(/replaceTerm\.[a-z0-9]{16}\.css/), 'testing already busted CSS assets in replaceTerm');
        test.ok(grunt.file.exists('tmp/assets/com/' + standard.match(/replaceTerm\.[a-z0-9]{16}\.css/)[0]));
        test.ok(standard.match(/replaceTerm\.[a-z0-9]{16}\.jpg/), 'testing already busted image assets in replaceTerm');
        test.ok(grunt.file.exists('tmp/assets/com/' + standard.match(/replaceTerm\.[a-z0-9]{16}\.jpg/)[0]));

        test.done();
    }

};
