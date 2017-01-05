'use strict';

var grunt = require('grunt');

module.exports = {

    php: function(test) {
        test.expect(2);

        var markup = grunt.file.read('tmp/php/php.html');

        test.ok(markup.match(/assets\/css\/app\.[a-z0-9]{16}\.css/ ), 'testing assets/css/app.css');
        test.ok(markup.match(/assets\/js\/app\.[a-z0-9]{16}\.js/ ), 'testing assets/js/app.js');

        test.done();
    }

};
