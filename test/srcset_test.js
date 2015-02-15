'use strict';

var grunt = require('grunt');

module.exports = {

    srcSet: function(test) {
        test.expect(3);

        var srcset = grunt.file.read('tmp/srcset.html');

        test.ok(srcset.match(/srcset\.jpeg\?[a-z0-9]{16}/), 'testing the srcset image');
        test.ok(srcset.match(/srcset@2x\.jpeg\?[a-z0-9]{16}/), 'testing the srcset@2x image');
        test.ok(srcset.match(/srcset-mobile\.jpeg\?[a-z0-9]{16}/), 'testing the srcset-mobile image');

        test.done();
    },

    replaceSrcSet: function(test) {
        test.expect(3);

        var srcset = grunt.file.read('tmp/replaceSrcset.html');

        test.ok(srcset.match(/srcset\.[a-z0-9]{16}\.jpeg/), 'testing the replacement of srcset image');
        test.ok(srcset.match(/srcset@2x\.[a-z0-9]{16}\.jpeg/), 'testing the replacement of srcset@2x image');
        test.ok(srcset.match(/srcset-mobile\.[a-z0-9]{16}\.jpeg/), 'testing the replacement of srcset-mobile image');

        test.done();
    }

};
