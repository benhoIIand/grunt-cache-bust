'use strict';

var grunt = require('grunt');

module.exports = {

    complex: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/complex/complex.html');
        var css = grunt.file.read('tmp/complex/css/complex.123456789.css');

        test.ok(markup.match(/css\/complex\.123456789\.css/), 'testing css/complex.css');
        test.ok(markup.match(/imgs\/complex-background\.123456789\.jpg/), 'testing imgs/complex-background.jpg in markup');
        test.ok(css.match(/imgs\/complex-background\.123456789\.jpg/), 'testing imgs/complex-background.jpg in css');

        test.done();
    }

};
