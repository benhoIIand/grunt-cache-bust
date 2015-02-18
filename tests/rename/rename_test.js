'use strict';

var grunt = require('grunt');

module.exports = {

    renaming: function(test) {
        test.expect(6);

        var markup = grunt.file.read('tmp/rename/rename.html');

        test.ok(markup.match(/rename\.[a-z0-9]{16}\.js/), 'testing renaming combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/rename/assets/' + markup.match(/rename\.[a-z0-9]{16}\.js/)[0]));
        test.ok(markup.match(/rename\.[a-z0-9]{16}\.css/), 'testing renaming combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/rename/assets/' + markup.match(/rename\.[a-z0-9]{16}\.css/)[0]));
        test.ok(markup.match(/rename\.[a-z0-9]{16}\.png/), 'testing renaming combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/rename/assets/' + markup.match(/rename\.[a-z0-9]{16}\.png/)[0]));

        test.done();
    },

    scriptsInDifferentFiles: function(test) {
        test.expect(6);

        var markup = grunt.file.read('tmp/rename/renameSameAssets.html');

        test.ok(markup.match(/rename\.[a-z0-9]{16}\.js/), 'testing renaming combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/rename/assets/' + markup.match(/rename\.[a-z0-9]{16}\.js/)[0]));
        test.ok(markup.match(/rename\.[a-z0-9]{16}\.css/), 'testing renaming combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/rename/assets/' + markup.match(/rename\.[a-z0-9]{16}\.css/)[0]));
        test.ok(markup.match(/rename\.[a-z0-9]{16}\.png/), 'testing renaming combination of CSS, JS and images');
        test.ok(grunt.file.exists('tmp/rename/assets/' + markup.match(/rename\.[a-z0-9]{16}\.png/)[0]));

        test.done();
    },

};
