'use strict';

var grunt = require('grunt');

module.exports = {

    queryString: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/queryString/queryString.html');
        var css = grunt.file.read('tmp/queryString/css/test.css');

        test.ok(markup.match(/css\/test\.css\?123456789/), 'testing css/test.css');
        test.ok(markup.match(/imgs\/background\.jpg\?123456789/), 'testing imgs/background.jpg in markup');
        test.ok(css.match(/imgs\/background\.jpg\?123456789/), 'testing imgs/background.jpg in css');

        test.done();
    }

};
