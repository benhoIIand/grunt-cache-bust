'use strict';

var grunt = require('grunt');

module.exports = {

    alreadyBusted: function(test) {
        test.expect(6);

        var markup = grunt.file.read('tmp/alreadyBusted/replaceAlreadyBusted.html');

        test.ok(markup.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.js/), 'testing already busted JS assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/' + markup.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.js/)[0]));
        test.ok(markup.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.css/), 'testing already busted CSS assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/' + markup.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.css/)[0]));
        test.ok(markup.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.jpg/), 'testing already busted image assets in replaceNameAlreadyBusted');
        test.ok(grunt.file.exists('tmp/assets/' + markup.match(/replaceAlreadyBusted\.[a-z0-9]{16}\.jpg/)[0]));

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
