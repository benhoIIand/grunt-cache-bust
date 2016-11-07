'use strict';

var grunt = require('grunt');

module.exports = {

    realpath: function(test) {
        //test.expect(2);

        var markup = grunt.file.read('tmp/realpath/realpath.html');

        test.ok(markup.match(/\"\/css\/app\.123456789\.css\"/), 'testing /css/app.css replaced');
        test.ok(markup.match(/\"\/lib\/css\/app\.css\"/), 'testing /lib/css/app.css not replaced');
        test.ok(!markup.match(/\"\/lib\/css\/app\.123456789\.css\"/), 'testing /lib/css/app.css not replaced');

        test.done();
    }

};
