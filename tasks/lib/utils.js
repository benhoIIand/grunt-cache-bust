'use strict';

var url = require('url');
var path = require('path');
var crypto = require('crypto');
var pathIsAbsolute = require('path-is-absolute');

module.exports = {

    isRelativePath: function(parsedUrl) {
        return !pathIsAbsolute(parsedUrl.pathname);
    },

    isRemotePath: function(parsedUrl, cdnHostname) {
        if (cdnHostname) {
            var domainRegex = new RegExp('^\/\/' + cdnHostname, 'i');

            if (parsedUrl.hostname === cdnHostname) {
                return false;
            }

            if (domainRegex.test(parsedUrl.pathname)) {
                return false;
            }

            return this.isRemotePath(parsedUrl);
        }

        if (parsedUrl.protocol === null) {
            if ((/^\/\//).test(parsedUrl.href)) {
                return true;
            }

            return false;
        }

        return true;
    },

    isDataImage: function(parsedUrl) {
        return parsedUrl.protocol === 'data:';
    },

    hasExtension: function(parsedUrl) {
        return path.extname(parsedUrl.pathname) !== '';
    },

    checkIfValidFile: function(parsedUrl, cdnPath) {
        return parsedUrl !== 'undefined' &&
            parsedUrl !== undefined &&
            !this.isRemotePath(parsedUrl, cdnPath) &&
            !this.isDataImage(parsedUrl) &&
            this.hasExtension(parsedUrl);
    },

    checkIfElemContainsValidFile: function(element, cdnPath) {
        var filePath;

        if (element.attribs.src) {
            filePath = element.attribs.src;
        }

        if (element.attribs['xlink:href']) {
            filePath = element.attribs['xlink:href'].split('#')[0];
        }

        if (element.attribs.href) {
            filePath = element.attribs.href;
        }

        return filePath ? this.checkIfValidFile(url.parse(filePath), cdnPath) : false;
    },

    regexEscape: function(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },

    removeHashInUrl: function(url) {
        return url.split('#')[0];
    },

    addFileHash: function(str, hash, separator) {
        var parsed = url.parse(str);
        var ext = path.extname(parsed.pathname);

        return (parsed.hostname ? parsed.protocol + parsed.hostname : '') + parsed.pathname.replace(ext, '') + separator + hash + ext;
    },

    generateFileHash: function(opts) {
        return function(fileData) {
            return opts.hash || crypto.createHash(opts.algorithm).update(fileData, opts.encoding).digest('hex').substring(0, opts.length);
        }.bind(this);
    },

    removePreviousHash: function(opts) {
        return function(str) {
            var findHash = new RegExp(this.regexEscape(opts.separator) + '([a-zA-Z0-9]{' + opts.length + '})(\\.\\w+)$', 'ig');

            return str.replace(findHash, function(match, hash, extension) {
                return extension;
            });
        }.bind(this);
    },

    normalizePath: function(opts, file, sourceFileDir, parsedUrl) {
        if (opts.baseDir && !this.isRelativePath(parsedUrl)) {
            sourceFileDir = opts.baseDir ? opts.baseDir : sourceFileDir;
        }

        if (file.baseDir) {
            sourceFileDir = file.baseDir;
        }

        if (opts.cdnPath) {
            parsedUrl.pathname.replace(opts.cdnPath, '');
        }

        sourceFileDir += '/';

        return decodeURI(path.normalize(sourceFileDir + parsedUrl.pathname));
    }

};
