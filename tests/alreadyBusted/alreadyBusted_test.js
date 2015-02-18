'use strict';

var grunt = require('grunt');

module.exports = {

    alreadyBusted: function(test) {
        test.expect(6);

        var markup = grunt.file.read('tmp/alreadyBusted/alreadyBusted.html');

        test.ok(markup.match(/alreadyBusted\.(?!123abc456def789g)([a-z0-9]{16})\.js/), 'testing already busted JS assets in alreadyBusted');
        test.ok(grunt.file.exists('tmp/alreadyBusted/assets/' + markup.match(/alreadyBusted\.[a-z0-9]{16}\.js/)[0]));
        test.ok(markup.match(/alreadyBusted\.(?!123abc456def789g)([a-z0-9]{16})\.css/), 'testing already busted CSS assets in alreadyBusted');
        test.ok(grunt.file.exists('tmp/alreadyBusted/assets/' + markup.match(/alreadyBusted\.[a-z0-9]{16}\.css/)[0]));
        test.ok(markup.match(/alreadyBusted\.(?!123abc456def789g)([a-z0-9]{16})\.jpg/), 'testing already busted image assets in alreadyBusted');
        test.ok(grunt.file.exists('tmp/alreadyBusted/assets/' + markup.match(/alreadyBusted\.[a-z0-9]{16}\.jpg/)[0]));

        test.done();
    },

    alreadyBustedMultipleDots: function(test) {
        test.expect(3);

        var markup = grunt.file.read('tmp/alreadyBusted/alreadyBustedMultipleDots.html');

        test.ok(markup.match(/thisstring\.issixteenletters\.(?!5221569fawfwa2vc)([a-z0-9]{16})\.js/), 'testing already busted JS assets in replacealreadyBustedMultipleDots');
        test.ok(markup.match(/thisstring\.issixteenletters\.(?!5221569fawfwa2vc)([a-z0-9]{16})\.css/), 'testing already busted CSS assets in replacealreadyBustedMultipleDots');
        test.ok(markup.match(/thisstring\.issixteenletters\.(?!5221569fawfwa2vc)([a-z0-9]{16})\.png/), 'testing already busted image assets in replacealreadyBustedMultipleDots');

        test.done();
    }

};
