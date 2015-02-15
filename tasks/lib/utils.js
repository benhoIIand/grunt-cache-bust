'use strict';

var grunt = require('grunt');
var crypto = require('crypto');

var regexs = require('./regexs');

module.exports = function(opts) {
    return {
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
            return path !== 'undefined' && path !== undefined && !this.checkIfRemote(path, opts.cdnPath) && this.checkIfHasExtension(path);
        },

        /** @this Object An elem on which attr() may be called for src or href. */
        checkIfElemSrcValidFile: function(element) {
            return this.checkIfValidFile(element.attribs.src) ||
                this.checkIfValidFile(element.attribs['xlink:href'] ? element.attribs['xlink:href'].split('#')[0] : '') ||
                this.checkIfValidFile(element.attribs.href);
        },

        regexEscape: function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },

        addHash: function(str, hash, extension) {
            return str.replace(extension, '') + opts.separator + hash + extension;
        },

        generateHash: function(fileData) {
            return opts.hash || crypto.createHash(opts.algorithm).update(fileData, opts.encoding).digest('hex').substring(0, opts.length);
        }
    };
};
