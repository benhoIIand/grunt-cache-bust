'use strict';

var grunt = require('grunt');

module.exports = {

    deleteOriginalsFiles: function(test) {
        test.expect(6);

        var markup = grunt.file.read('tmp/deleteOriginals/deleteOriginals.html');

        test.ok(!grunt.file.exists('tmp/deleteOriginals/assets/delete.css'));
        test.ok(!grunt.file.exists('tmp/deleteOriginals/assets/delete.png'));
        test.ok(!grunt.file.exists('tmp/deleteOriginals/assets/delete.js'));

        test.ok(markup.match(/delete\.[a-z0-9]{16}\.js/), 'testing already busted JS assets in replaceNameAlreadyBusted');
        test.ok(markup.match(/delete\.[a-z0-9]{16}\.css/), 'testing already busted CSS assets in replaceNameAlreadyBusted');
        test.ok(markup.match(/delete\.[a-z0-9]{16}\.png/), 'testing already busted image assets in replaceNameAlreadyBusted');

        test.done();
    }

};
