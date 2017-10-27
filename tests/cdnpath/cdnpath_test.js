'use strict';

var grunt = require('grunt');

module.exports = {

    realpath: function(test) {
        var markup = grunt.file.read('tmp/cdnpath/cdnpath.html');

        test.ok(markup.match(/\"\/css\/app\.123456789\.css\"/), 'testing /css/app.css replaced');
        test.ok(markup.match(/\"http:\/\/owncdn\.test\.com\/path\/css\/app.123456789\.css\"/), 'testing http://owncdn.test.com/path/css/app.css replaced');

        test.done();
    }

};
