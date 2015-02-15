'use strict';

var fs = require('fs');
var path = require('path');

var options = {
    algorithm: 'md5',
    cdnPath: false,
    deleteOriginals: false,
    enableUrlFragmentHint: false,
    encoding: 'utf8',
    filters: {},
    ignorePatterns: [],
    jsonOutput: false,
    jsonOutputFilename: 'cachebuster.json',
    length: 16,
    replaceTerms: [],
    removeUrlFragmentHint: false,
    rename: true,
    separator: '.'
};

var defaultFilters = {
    'script': function() {
        return this.attribs['src'];
    },
    'link[rel="stylesheet"]': function() {
        return this.attribs['href'];
    },
    'img': [
        function() {
            return this.attribs['src'];
        },
        function() {
            var srcset = this.attribs['srcset'];

            if (!srcset) {
                return false;
            }

            return srcset.split(',').map(function(src) {
                return src.trim().split(' ')[0];
            });
        }
    ],
    'link[rel="icon"], link[rel="shortcut icon"]': function() {
        return this.attribs['href'];
    }
};

module.exports = function(grunt) {

    // Set the default encoding for all grunt utils
    grunt.file.defaultEncoding = 'utf8';

    grunt.registerMultiTask('cacheBust', 'Bust static assets from the cache using content hashing', function() {
        var opts = this.options(options);
        var filters = grunt.util._.defaults(opts.filters, defaultFilters);
        var processedFileMap = {};

        var regexs = require('./lib/regexs');
        var utils = require('./lib/utils')(opts);
        var findStaticAssets = require('./lib/findStaticAssets')(opts, filters);

        var processFile = function(file, filepath) {
            var markup = grunt.file.read(filepath);
            var isCSS = (/\.css$/).test(filepath);

            findStaticAssets(markup, isCSS).forEach(function(reference) {
                var filePath = (opts.baseDir ? opts.baseDir : path.dirname(filepath)) + '/';

                // check for file level overrides
                filePath = file.baseDir ? (file.baseDir + '/') : filePath;

                var filename = path.normalize((filePath + (opts.cdnPath ? reference.replace(opts.cdnPath, '') : reference)).split('?')[0]);
                var originalFilename = filename;
                var originalReference = reference;
                var newFilename;
                var newFilePath;
                var newReference;

                if (opts.ignorePatterns) {
                    var matched = opts.ignorePatterns.some(function(pattern) {
                        return new RegExp(pattern, 'ig').test(filename);
                    });

                    if (matched) {
                        return false;
                    }
                }

                if (opts.rename) {

                    // If the file has already been cached, use that
                    if (processedFileMap[filename]) {
                        markup = markup.replace(new RegExp(utils.regexEscape(reference), 'g'), processedFileMap[filename]);
                    } else {
                        var hashReplaceRegex = new RegExp(utils.regexEscape(opts.separator) + '(' + (opts.hash ? opts.hash + '|' : '') + '[a-zA-Z0-9]{' + opts.length + '})', 'ig');

                        // Get the original filename
                        filename = filename.replace(hashReplaceRegex, '');

                        // Replacing specific terms in the import path so renaming files
                        if (opts.replaceTerms && opts.replaceTerms.length > 0) {
                            opts.replaceTerms.forEach(function(obj) {
                                grunt.util._.each(obj, function(replacement, term) {
                                    filename = filename.replace(term, replacement);
                                    reference = reference.replace(term, replacement);
                                });
                            });
                        }

                        if (!grunt.file.exists(filename)) {
                            grunt.log.warn('Static asset "' + filename + '" skipped because it wasn\'t found.');
                            return false;
                        }

                        var hash = utils.generateHash(grunt.file.read(filename));

                        // Create our new filename
                        newFilename = utils.addHash(filename, hash, path.extname(filename), opts.separator);

                        // Create the new reference
                        newReference = utils.addHash(reference.replace(hashReplaceRegex, ''), hash, path.extname(filename), opts.separator);

                        // Update the reference in the markup
                        markup = markup.replace(new RegExp(utils.regexEscape(originalReference), 'g'), newReference);

                        // Create our new file
                        grunt.file.copy(filename, newFilename);

                        grunt.verbose.writeln(newFilename + ' was created!');
                    }
                } else {
                    if (!grunt.file.exists(filename) && !utils.checkIfRemote(filename, opts.cdnPath)) {
                        grunt.log.warn('Static asset "' + filename + '" skipped because it wasn\'t found.');
                        return false;
                    }

                    newFilename = reference.split('?')[0] + '?' + utils.generateHash(grunt.file.read(filename));
                    newReference = newFilename;
                    markup = markup.replace(new RegExp(utils.regexEscape(reference), 'g'), newFilename);
                }

                if (newFilename) {
                    processedFileMap[originalFilename] = newReference;
                }
            });

            if (opts.enableUrlFragmentHint && opts.removeUrlFragmentHint) {
                markup = markup.replace(regexs.removeFragHint, '');
            }

            // Write back to the source file with changes
            grunt.file.write(filepath, markup);

            // Log that we've busted the file
            grunt.log.writeln(['The file ', filepath, ' was busted!'].join(''));
        };

        // Kick things off!
        this.files.forEach(function(file) {
            file.src
                .filter(function(filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                })
                .forEach(function(filepath) {
                    processFile(file, filepath);
                });
        });

        // Delete the original files, if enabled
        if (opts.rename && opts.deleteOriginals) {
            for (var file in processedFileMap) {
                if (grunt.file.exists(file)) {
                    grunt.file.delete(file);
                }
            }
        }

        // Generate a JSON with the swapped file names if requested
        if (opts.jsonOutput) {
            var name = typeof opts.jsonOutput === 'string' ? opts.jsonOutput : opts.jsonOutputFilename;

            grunt.log.writeln(['File map has been exported to ', path.normalize(opts.baseDir + '/' + name), '!'].join(''));
            grunt.file.write(path.normalize(opts.baseDir + '/' + name), JSON.stringify(processedFileMap));
        }
    });

};
