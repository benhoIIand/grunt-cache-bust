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
        test.expect(3);

        var markup = grunt.file.read('tmp/queryString/alreadyBustedQueryString.html');

        test.ok(markup.match(/alreadyBustedQueryString\.js\?(?!123abc456def789g)([a-z0-9]{16})/), 'testing already busted JS assets in alreadyBustedQueryString');
        test.ok(markup.match(/alreadyBustedQueryString\.css\?(?!123abc456def789g)([a-z0-9]{16})/), 'testing already busted CSS assets in alreadyBustedQueryString');
        test.ok(markup.match(/alreadyBustedQueryString\.jpg\?(?!123abc456def789g)([a-z0-9]{16})/), 'testing already busted image assets in alreadyBustedQueryString');

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
    },

    css: function(test) {
        test.expect(4);

        var css = grunt.file.read('tmp/queryString/queryString.css');

        test.ok(css.match(/\/assets\/fonts\/glyphicons-halflings-regular\.eot\?[a-z0-9]{16}/), 'testing glyphicons-halflings-regular.eot');
        test.ok(css.match(/\/assets\/fonts\/glyphicons-halflings-regular\.woff\?[a-z0-9]{16}/), 'testing glyphicons-halflings-regular.woff');
        test.ok(css.match(/\/assets\/fonts\/glyphicons-halflings-regular\.ttf\?[a-z0-9]{16}/), 'testing glyphicons-halflings-regular.ttf');
        test.ok(css.match(/\/assets\/fonts\/glyphicons-halflings-regular\.svg\?[a-z0-9]{16}\#glyphicons_halflingsregular'/), 'testing glyphicons-halflings-regular.svg');

        test.done();
    }

};
