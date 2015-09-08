'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');
var grunt = require('grunt');

var opts;

var fileDoesntExist = function(normalizedPath, reference) {
    grunt.log.warn('Static asset "' + normalizedPath + '" skipped because it wasn\'t found, original reference=' + reference);
    return false;
};

var doesFileExist = function(filepath) {
    if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
    } else {
        return true;
    }
};

var removeIgnoredPatterns = function(parsedUrl) {
    if (opts.ignorePatterns) {
        var matched = opts.ignorePatterns.some(function(pattern) {
            return new RegExp(pattern, 'ig').test(parsedUrl.href);
        });

        if (matched) {
            return false;
        }
    }

    return true;
};

module.exports = function(grunt) {
    grunt.registerMultiTask('cacheBust', 'Bust static assets from the cache using content hashing', function() {
        opts = this.options(require('./lib/defaultOptions'));

        var processedFileMap = {};
        var filesToDelete = [];

        var utils = require('./lib/utils');
        var findStaticAssets = require('./lib/findStaticAssets')(opts);

        // Kick things off!
        this.files.forEach(function(file) {
            file.src
                .filter(doesFileExist)
                .forEach(function(filepath) {
                    var markup = grunt.file.read(filepath);

                    findStaticAssets(markup, (/\.css$/).test(filepath))
                        .filter(removeIgnoredPatterns)
                        .forEach(function(parsedUrl) {
                            var normalizedPath = utils.normalizePath(opts, file, path.dirname(filepath), parsedUrl);
                            var originalReference = decodeURI(parsedUrl.href);
                            var newPathname = decodeURI(parsedUrl.pathname);
                            var generateFileHash = utils.generateFileHash(opts);
                            var removePreviousHash = utils.removePreviousHash(opts);
                            var newReference;
                            var domain;

                            if (opts.rename) {

                                // If the file has already been cached, use that
                                if (processedFileMap[parsedUrl.pathname]) {
                                    markup = markup.replace(new RegExp(utils.regexEscape(parsedUrl.pathname), 'g'), processedFileMap[parsedUrl.pathname]);
                                } else {
                                    // Remove any previous hashes from the filename
                                    normalizedPath = removePreviousHash(normalizedPath);
                                    newPathname = removePreviousHash(newPathname);

                                    // Replacing specific terms in the import path so renaming files
                                    if (opts.replaceTerms && opts.replaceTerms.length > 0) {
                                        opts.replaceTerms.forEach(function(obj) {
                                            grunt.util._.each(obj, function(replacement, term) {
                                                normalizedPath = normalizedPath.replace(term, replacement);
                                                newPathname = newPathname.replace(term, replacement);
                                            });
                                        });
                                    }

                                    // Check if file exists
                                    if (!grunt.file.exists(normalizedPath)) {
                                        return fileDoesntExist(normalizedPath, parsedUrl.pathname);
                                    }

                                    // Generate the file hash
                                    var fileHash = generateFileHash(grunt.file.read(normalizedPath, {
                                        encoding: null
                                    }));

                                    // Create our new filename
                                    var newFilename = utils.addFileHash(normalizedPath, fileHash, opts.separator);

                                    // Create the new reference
                                    domain = (parsedUrl.hostname ? (parsedUrl.protocol ? parsedUrl.protocol : '') + '//' + (parsedUrl.hostname ? parsedUrl.hostname : '') : '');
                                    newReference = domain + utils.addFileHash(newPathname, fileHash, opts.separator) + (parsedUrl.hash ? parsedUrl.hash : '');

                                    // Update the reference in the markup
                                    markup = markup.replace(new RegExp(utils.regexEscape(originalReference)), newReference);

                                    // Create our new file
                                    grunt.file.copy(normalizedPath, newFilename);

                                    grunt.verbose.writeln(newFilename + ' was created!');
                                }
                            } else {
                                // Remove any previous hashes from the filename
                                normalizedPath = removePreviousHash(normalizedPath);
                                newPathname = removePreviousHash(newPathname);

                                // Check if file exists
                                if (!grunt.file.exists(normalizedPath)) {
                                    return fileDoesntExist(normalizedPath, parsedUrl.pathname);
                                }

                                // Create the new reference
                                domain = (parsedUrl.hostname ? (parsedUrl.protocol ? parsedUrl.protocol : '') + '//' + (parsedUrl.hostname ? parsedUrl.hostname : '') : '');
                                newReference = domain + newPathname + '?' + generateFileHash(grunt.file.read(normalizedPath, {
                                        encoding: null
                                    })) + (parsedUrl.hash ? parsedUrl.hash : '');

                                // Update the reference in the markup
                                markup = markup.replace(new RegExp(utils.regexEscape(originalReference)), newReference);
                            }

                            processedFileMap[parsedUrl.pathname] = newReference;

                            if (opts.deleteOriginals) {
                                filesToDelete.push(normalizedPath);
                            }
                        });

                    if (opts.enableUrlFragmentHint && opts.removeUrlFragmentHint) {
                        markup = markup.replace(/#grunt-cache-bust/g, '');
                    }

                    // Write back to the source file with changes
                    grunt.file.write(filepath, markup);

                    // Log that we've busted the file
                    grunt.log.writeln(['The file ', filepath, ' was busted!'].join(''));
                });
        });

        // Delete the original files
        if (opts.deleteOriginals) {
            filesToDelete.forEach(function(filename) {
                if (grunt.file.exists(filename)) {
                    grunt.file.delete(filename);
                }
            });
        }

        // Generate a JSON file with the swapped file names if requested
        if (opts.jsonOutput) {
            var name = typeof opts.jsonOutput === 'string' ? opts.jsonOutput : opts.jsonOutputFilename;

            grunt.log.writeln(['File map has been exported to ', path.normalize(opts.baseDir + '/' + name), '!'].join(''));
            grunt.file.write(path.normalize(opts.baseDir + '/' + name), JSON.stringify(processedFileMap));
        }
    });

};
