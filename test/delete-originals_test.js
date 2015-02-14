'use strict';

var grunt = require('grunt');

module.exports = {

    deletesOriginalFiles: function(test) {
        test.expect(3);

        test.ok(!grunt.file.exists('tmp/assets/replace.css'));
        test.ok(!grunt.file.exists('tmp/assets/replace.png'));
        test.ok(!grunt.file.exists('tmp/assets/replace.js'));

        test.done();
    }

};
