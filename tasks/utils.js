var grunt = require('grunt');
var crypto = require('crypto');

var regexs = require('./regexs');

module.exports = {
    checkFileExists: function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
        } else {
            return true;
        }
    },

    checkIfRemote: function(path) {
        return regexs.remote.test(path);
    },

    checkIfHasExtension: function(path) {
        return regexs.extension.test(path);
    },

    checkIfValidFile: function(path) {
        return path !== 'undefined' && path !== undefined && !this.checkIfRemote(path) && this.checkIfHasExtension(path);
    },

    /** @this Object An elem on which attr() may be called for src or href. */
    checkIfElemSrcValidFile: function(i, element) {
        return this.checkIfValidFile(element.attribs.src) || this.checkIfValidFile(element.attribs.href);
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