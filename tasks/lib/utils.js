'use strict';

var grunt = require('grunt');
var crypto = require('crypto');

var regexs = require('./regexs');

module.exports = function(opts) {
    return {

        isRelativePath: function(path) {
            return (regexs.relativePath).test(path);
        },

        checkIfRemote: function(path) {
            if (opts.cdnPath) {
                var cdnPattern = new RegExp(opts.cdnPath);
                return regexs.remote.test(path) && !cdnPattern.test(path);
            } else {
                return regexs.remote.test(path);
            }
        },

        checkIfHasExtension: function(path) {
            return regexs.extension.test(path);
        },

        checkIfValidFile: function(path) {
            return path !== 'undefined' && path !== undefined && !this.checkIfRemote(path) && this.checkIfHasExtension(path);
        },

        checkIfElemSrcValidFile: function(element) {
            return this.checkIfValidFile(element.attribs.src) ||
                this.checkIfValidFile(element.attribs['xlink:href'] ? element.attribs['xlink:href'].split('#')[0] : '') ||
                this.checkIfValidFile(element.attribs.href);
        },

        regexEscape: function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },

        removeHashInUrl: function(url) {
            return url.split('#')[0];
        },

        addFileHash: function(str, hash, extension) {
            var splitbyUrlHash = str.split('#');
            var hashInUrl = splitbyUrlHash[1] ? '#' + splitbyUrlHash[1] : '';

            return splitbyUrlHash[0].replace(extension, '') + opts.separator + hash + extension + hashInUrl;
        },

        generateFileHash: function(fileData) {
            return opts.hash || crypto.createHash(opts.algorithm).update(fileData, opts.encoding).digest('hex').substring(0, opts.length);
        },

        removePreviousHash: function(str) {
            var findHash = new RegExp(this.regexEscape(opts.separator) + '([a-zA-Z0-9]{' + opts.length + '})(\\.\\w+)$', 'ig');

            return str.replace(findHash, function(match, hash, extension) {
                return extension;
            });
        }

    };
};
