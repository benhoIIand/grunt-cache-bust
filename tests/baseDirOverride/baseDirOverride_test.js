'use strict';

var grunt = require('grunt');

module.exports = {

    baseDirOverride: function(test) {
        test.expect(6);

        var markup = grunt.file.read('tmp/baseDirOverride/baseDirOverride.html');

        test.ok(markup.match(/baseDirOverride\.[a-z0-9]{16}\.js/), 'testing baseDirOverride combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/baseDirOverride/others/' + markup.match(/baseDirOverride\.[a-z0-9]{16}\.js/)[0]));
        test.ok(markup.match(/baseDirOverride\.[a-z0-9]{16}\.css/), 'testing baseDirOverride combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/baseDirOverride/others/' + markup.match(/baseDirOverride\.[a-z0-9]{16}\.css/)[0]));
        test.ok(markup.match(/baseDirOverride\.[a-z0-9]{16}\.png/), 'testing baseDirOverride combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/baseDirOverride/others/' + markup.match(/baseDirOverride\.[a-z0-9]{16}\.png/)[0]));

        test.done();
    }

};
