'use strict';

var grunt = require('grunt');

module.exports = {

    standard: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/queryString/standard.html');

        test.ok(markup.match(/standard\.js\?[a-z0-9]{16}/), 'testing combination of CSS, JS and images');
        test.ok(markup.match(/standard\.css\?[a-z0-9]{16}/), 'testing combination of CSS, JS and images');
        test.ok(markup.match(/standard\.jpg\?[a-z0-9]{16}/), 'testing combination of CSS, JS and images');

        test.done();
    },

    alreadyBustedQueryString: function(test) {
        test.expect(6);

        var markup = grunt.file.read('tmp/queryString/alreadyBustedQueryString.html');

        test.ok(markup.match(/alreadyBustedQueryString\.[a-z0-9]{16}\.js/), 'testing already busted JS assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/' + markup.match(/alreadyBustedQueryString\.[a-z0-9]{16}\.js/)[0]));
        test.ok(markup.match(/alreadyBustedQueryString\.[a-z0-9]{16}\.css/), 'testing already busted CSS assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/' + markup.match(/alreadyBustedQueryString\.[a-z0-9]{16}\.css/)[0]));
        test.ok(markup.match(/alreadyBustedQueryString\.[a-z0-9]{16}\.jpg/), 'testing already busted image assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/' + markup.match(/alreadyBustedQueryString\.[a-z0-9]{16}\.jpg/)[0]));

        test.done();
    },

    minified: function(test) {
        test.expect(6);

        var markup = grunt.file.read('tmp/queryString/minified.html');

        test.ok(markup.match(/stylesheet1\.css\?[a-z0-9]{16}/), 'testing stylesheet1');
        test.ok(markup.match(/stylesheet2\.css\?[a-z0-9]{16}/), 'testing stylesheet2');

        test.ok(markup.match(/script1\.js\?[a-z0-9]{16}/), 'testing javascript1');
        test.ok(markup.match(/script2\.js\?[a-z0-9]{16}/), 'testing javascript2');

        test.ok(markup.match(/image1\.png\?[a-z0-9]{16}/), 'testing image1');
        test.ok(markup.match(/image2\.png\?[a-z0-9]{16}/), 'testing image2');

        test.done();
    }

};
