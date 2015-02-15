'use strict';

var grunt = require('grunt');

module.exports = {

    alreadyBusted: function(test) {
        test.expect(3);

        var alreadyBusted = grunt.file.read('tmp/alreadyBusted.html');
        test.ok(alreadyBusted.match(/alreadyBusted\.css\?(?!ba366c2f0f734f23)[a-z0-9]{16}/), 'testing alreadyBusted of CSS, JS and images');
        test.ok(alreadyBusted.match(/alreadyBusted\.jpg\?(?!f23467496aef741a)[a-z0-9]{16}/), 'testing alreadyBusted of CSS, JS and images');
        test.ok(alreadyBusted.match(/alreadyBusted\.js\?(?!b574cbb60333af12)[a-z0-9]{16}/), 'testing alreadyBusted of CSS, JS and images');

        test.done();
    },

    replaceNameAlreadyBusted: function(test) {
        test.expect(6);

        var standard = grunt.file.read('tmp/replaceAlreadyBusted.html');

        test.ok(standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.js/), 'testing already busted JS assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.js/)[0]));
        test.ok(standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.css/), 'testing already busted CSS assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.css/)[0]));
        test.ok(standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.jpg/), 'testing already busted image assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/'+ standard.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.jpg/)[0]));

        test.done();
    }

};
