'use strict';

var grunt = require('grunt');

module.exports = {

    indexHash: function(test) {
        test.expect(1);

        var indexHash = grunt.file.read('tmp/indexHash/INDEX_HASH');

        test.ok(indexHash.match(/^123456789$/), 'testing hash is present in file');

        test.done();
    }

};
