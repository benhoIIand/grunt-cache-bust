'use strict';

var grunt = require('grunt');

module.exports = {

    urlPrefixes: function(test) {
        var markup = grunt.file.read('tmp/urlPrefixes/urlPrefixes.html');

        test.ok(markup.match(/\/css\/app\.123456789\.css\"/), 'testing /css/app.css replaced');
        test.ok(markup.match(/http:\/\/owncdn1\.test\.com\/path\/css\/app\.123456789\.css\"/), 'testing http://owncdn1.test.com/path/css/app.css replaced');

        test.ok(markup.match(/http:\/\/owncdn1\.test\.com\/path\/assets\/imgsrcset\.123456789\.jpg/), 'testing srcset assets/imgsrcset.jpg');
        test.ok(markup.match(/http:\/\/owncdn1\.test\.com\/path\/assets\/imgsrcset-big\.123456789\.jpg/), 'testing srcset assets/imgsrcset-big.jpg');
        test.ok(markup.match(/http:\/\/owncdn2\.test\.com\/path\/assets\/imgsrcset-small\.123456789\.jpg/), 'testing srcset assets/imgsrcset-small.jpg');

        test.done();
    }

};
