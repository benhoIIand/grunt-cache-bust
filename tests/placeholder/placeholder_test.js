'use strict';

var grunt = require('grunt');

module.exports = {

    placeholder: function(test) {
        test.expect(1);

        var correctContent = grunt.file.read('test/placeholder/placeholder.html');
        var alreadyBusted = grunt.file.read('tmp/placeholder/placeholder.html');

        test.equal(correctContent, alreadyBusted, 'testing placeholder images');

        test.done();
    }

};
