'use strict';

var grunt = require('grunt');

module.exports = {

    fileLevelBaseOverride: function(test) {
        test.expect(6);

        var override = grunt.file.read('tmp/baseDirOverride.html');

        test.ok(override.match(/baseDirOverride\.[a-z0-9]{16}\.js/), 'testing baseDirOverride combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/assets/others/'+ override.match(/baseDirOverride\.[a-z0-9]{16}\.js/)[0]));
        test.ok(override.match(/baseDirOverride\.[a-z0-9]{16}\.css/), 'testing baseDirOverride combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/assets/others/'+ override.match(/baseDirOverride\.[a-z0-9]{16}\.css/)[0]));
        test.ok(override.match(/baseDirOverride\.[a-z0-9]{16}\.png/), 'testing baseDirOverride combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/assets/others/'+ override.match(/baseDirOverride\.[a-z0-9]{16}\.png/)[0]));

        test.done();
    }

};
