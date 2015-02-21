'use strict';

var grunt = require('grunt');

module.exports = {

    templates: function(test) {
        test.expect(3);

        var templates = grunt.file.read('tmp/templates/templates.html');

        test.ok(templates.match(/assets\/outside-template\.[a-z0-9]{16}\.js/), 'testing busting of assets outside of the template');
        test.ok(templates.match(/assets\/inside-native-template\.[a-z0-9]{16}\.js/), 'testing busting of assets inside of the template');
        test.ok(templates.match(/assets\/inside-template\.[a-z0-9]{16}\.js/), 'testing busting of assets inside of the template');

        test.done();
    }

};
