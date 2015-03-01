'use strict';

var url = require('url');
var path = require('path');
var utils = require('../../tasks/lib/utils');

module.exports = {

    isRelativePath: function(test) {
        test.expect(4);

        test.equal(utils.isRelativePath(url.parse('relative/to/root')), true);
        test.equal(utils.isRelativePath(url.parse('/relative/to/root')), false);
        test.equal(utils.isRelativePath(url.parse('./relative/to/file')), true);
        test.equal(utils.isRelativePath(url.parse('../../relative/to/file')), true);

        test.done();
    },

    isRemotePath: function(test) {
        test.expect(11);

        test.equal(utils.isRemotePath(url.parse('/path/to/file.js')), false);
        test.equal(utils.isRemotePath(url.parse('./path/to/file.js')), false);
        test.equal(utils.isRemotePath(url.parse('../path/to/file.js')), false);
        test.equal(utils.isRemotePath(url.parse('data:image/png;base64')), true);
        test.equal(utils.isRemotePath(url.parse('//domain.com/path/to/file.js')), true);
        test.equal(utils.isRemotePath(url.parse('http://domain.com/path/to/file.js')), true);
        test.equal(utils.isRemotePath(url.parse('https://domain.com/path/to/file.js?something')), true);

        // Using it's own CDN hostname
        test.equal(utils.isRemotePath(url.parse('/path/to/file.js'), 'domain.com'), false);
        test.equal(utils.isRemotePath(url.parse('//domain.com/path/to/file.js'), 'domain.com'), false);
        test.equal(utils.isRemotePath(url.parse('http://domain.com/path/to/file.js'), 'domain.com'), false);
        test.equal(utils.isRemotePath(url.parse('https://domain.com/path/to/file.js?something'), 'domain.com'), false);

        test.done();
    },

    isDataImage: function(test) {
        test.expect(3);

        test.equal(utils.isDataImage(url.parse('/path/to/file.js')), false);
        test.equal(utils.isDataImage(url.parse('data:image/png;base64')), true);
        test.equal(utils.isDataImage(url.parse('http://domain.com/path/to/file.js')), false);

        test.done();
    },

    hasExtension: function(test) {
        test.expect(4);

        test.equal(utils.hasExtension(url.parse('/path/to/file')), false);
        test.equal(utils.hasExtension(url.parse('/path/to/file.j')), true);
        test.equal(utils.hasExtension(url.parse('/path/to/file.js')), true);
        test.equal(utils.hasExtension(url.parse('/path/to/file.js.something')), true);

        test.done();
    },

    checkIfValidFile: function(test) {
        test.expect(10);

        test.equal(utils.checkIfValidFile(undefined), false);
        test.equal(utils.checkIfValidFile('undefined'), false);
        test.equal(utils.checkIfValidFile(url.parse('/path/to/file')), false);
        test.equal(utils.checkIfValidFile(url.parse('/path/to/file.js')), true);
        test.equal(utils.checkIfValidFile(url.parse('./path/to/file.js')), true);
        test.equal(utils.checkIfValidFile(url.parse('../path/to/file.js')), true);
        test.equal(utils.checkIfValidFile(url.parse('data:image/png;base64')), false);
        test.equal(utils.checkIfValidFile(url.parse('//domain.com/path/to/file.js')), false);
        test.equal(utils.checkIfValidFile(url.parse('http://domain.com/path/to/file.js')), false);
        test.equal(utils.checkIfValidFile(url.parse('https://domain.com/path/to/file.js?something')), false);

        test.done();
    },

    removeHashInUrl: function(test) {
        test.expect(4);

        test.equal(utils.removeHashInUrl('/assets/styles.css'), '/assets/styles.css');
        test.equal(utils.removeHashInUrl('/assets/styles.css#123456'), '/assets/styles.css');
        test.equal(utils.removeHashInUrl('/assets/scripts.js#'), '/assets/scripts.js');
        test.equal(utils.removeHashInUrl('/assets/scripts.js#4567#678'), '/assets/scripts.js');

        test.done();
    },

    normalizePath: function(test) {
        test.expect(4);

        var dirname = path.dirname('test/some.html');

        test.equal(utils.normalizePath({}, {}, dirname, url.parse('./assets/styles.css')), 'test/assets/styles.css');

        test.equal(utils.normalizePath({
            baseDir: 'tmp/test'
        }, {}, dirname, url.parse('/assets/styles.css')), 'tmp/test/assets/styles.css');

        test.equal(utils.normalizePath({
            baseDir: 'tmp/test'
        }, {
            baseDir: 'file/test'
        }, dirname, url.parse('/assets/styles.css')), 'file/test/assets/styles.css');

        test.equal(utils.normalizePath({
            baseDir: 'tmp/test',
            cdnPath: 'domain.com'
        }, {}, dirname, url.parse('https://domain.com/assets/styles.css')), 'tmp/test/assets/styles.css');

        test.done();
    }

};
