'use strict';

var utils = require('../../tasks/lib/utils')();

module.exports = {

    isRelativePath: function(test) {
        test.expect(2);

        test.equal(utils.isRelativePath('/relative/to/root'), false);
        test.equal(utils.isRelativePath('../../relative/to/file'), true);

        test.done();
    },

    removeHashInUrl: function(test) {
        test.expect(4);

        test.equal(utils.removeHashInUrl('/assets/styles.css'), '/assets/styles.css');
        test.equal(utils.removeHashInUrl('/assets/styles.css#123456'), '/assets/styles.css');
        test.equal(utils.removeHashInUrl('/assets/scripts.js#'), '/assets/scripts.js');
        test.equal(utils.removeHashInUrl('/assets/scripts.js#4567#678'), '/assets/scripts.js');

        test.done();
    }

};
