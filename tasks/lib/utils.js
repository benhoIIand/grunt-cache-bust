'use strict';

var grunt = require('grunt');
var crypto = require('crypto');

var regexs = require('./regexs');

module.exports = {
    checkIfRemote: function(path, cdnPath) {
        if (cdnPath) {
            var cdnPattern = new RegExp(cdnPath);
            return regexs.remote.test(path) && !cdnPattern.test(path);
        } else {
            return regexs.remote.test(path);
        }
    },

    checkIfHasExtension: function(path) {
        return regexs.extension.test(path);
    },

    checkIfValidFile: function(path, cdnPath) {
        return path !== 'undefined' && path !== undefined && !this.checkIfRemote(path, cdnPath) && this.checkIfHasExtension(path);
    },

    /** @this Object An elem on which attr() may be called for src or href. */
    checkIfElemSrcValidFile: function(element, cdnPath) {
        return this.checkIfValidFile(element.attribs.src, cdnPath) ||
            this.checkIfValidFile(element.attribs['xlink:href'] ? element.attribs['xlink:href'].split('#')[0] : '', cdnPath) ||
            this.checkIfValidFile(element.attribs.href, cdnPath);
    },

    regexEscape: function(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },

    addHash: function(str, hash, extension, separator) {
        return str.replace(extension, '') + separator + hash + extension;
    },

    generateHash: function(opts) {
        return function(fileData) {
            return opts.hash || crypto.createHash(opts.algorithm).update(fileData, opts.encoding).digest('hex').substring(0, opts.length);
        };
    }
};
