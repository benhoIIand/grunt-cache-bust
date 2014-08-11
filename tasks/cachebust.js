'use strict';

module.exports = function(grunt) {

    var fs = require('fs');
    var path = require('path');
    var crypto = require('crypto');
    var cheerio = require('cheerio');
    var css = require('css');

    var remoteRegex = /http:|https:|\/\/|data:image/;
    var extensionRegex = /(\.[a-zA-Z0-9]{2,4})(|\?.*)$/;
    var urlFragHintRegex = /'(([^']+)#grunt-cache-bust)'|"(([^"]+)#grunt-cache-bust)"/g;

    var filenameSwaps = {};

    var regexEscape = function(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };

    var cheerioOptions = {
        ignoreWhitespace: true,
        lowerCaseTags: true
    };

    var options = {
        algorithm: 'md5',
        deleteOriginals: false,
        encoding: 'utf8',
        length: 16,
        replaceTerms: [],
        rename: true,
        separator: '.',
        ignorePatterns: [],
        filters: {},
        jsonOutput: false,
        jsonOutputFilename: 'cachebuster.json'
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

    var checkIfRemote = function(path) {
        return remoteRegex.test(path);
    };

    var checkIfHasExtension = function(path) {
        return extensionRegex.test(path);
    };

    var checkIfValidFile = function(path) {
        return path !== 'undefined' && path !== undefined && !checkIfRemote(path) && checkIfHasExtension(path);
    };

    /** @this Object An elem on which attr() may be called for src or href. */
    var checkIfElemSrcValidFile = function() {
        return checkIfValidFile(this.attr('src')) || checkIfValidFile(this.attr('href'));
    };

    var findStaticAssets = function(data, filters, isCSS) {
        var $ = cheerio.load(data, cheerioOptions);

        var paths = [];

        if (isCSS) {
            var cssObj = css.parse(data);

            // Loop through each stylesheet rules
            cssObj.stylesheet.rules.forEach(function(rule) {

                // Loop through all declarations
                if (rule.declarations) {
                    rule.declarations.forEach(function(declaration) {

                        // Check if it has a background property, and if so, checkt that it contains a URL
                        if ((/background/).test(declaration.property) && (/url/).test(declaration.value)) {
                            paths.push(declaration.value.match(/url\(["|']?(.*?)['|"]?\)/)[1]);
                        }
                    });
                }
            });
        } else {
            // Add any conditional statements or assets in comments to the DOM
            var assets = '';

            $('head, body').contents().filter(function() {
                return this[0].type === 'comment';
            }).each(function(i, e) {
                assets += e.data.replace(/\[.*\]>|<!\[endif\]/g, '').trim();
            });

            $('body').append(assets);
        }

        Object.keys(filters).forEach(function(key) {
            var mappers = filters[key];

            var addPaths = function(mapper) {
                var i,
                    item,

                    foundPaths = $(key)
                    .filter(checkIfElemSrcValidFile)
                    .map(mapper)
                    .filter(function(path, el) {
                        var rtn = false;

                        if (el) {
                            rtn = true;
                        }

                        return rtn;
                    });

                for (i = 0; i < foundPaths.length; i++) {
                    paths = paths.concat(foundPaths[i]);
                }
            };

            if (grunt.util.kindOf(mappers) === 'array') {
                mappers.forEach(addPaths);
            } else {
                addPaths(mappers);
            }
        });

        var match, potentialPath;

        // Find any strings containing the hash `#grunt-cache-bust`
        while ((match = urlFragHintRegex.exec(data)) != null) {
            potentialPath = match[2] || match[4];

            if (checkIfValidFile(potentialPath)) {
                paths.push(potentialPath);
            }
        }

        return paths.filter(function(path, index) {
            return paths.indexOf(path) === index;
        });
    };

    grunt.file.defaultEncoding = options.encoding;

    grunt.registerMultiTask('cacheBust', 'Bust static assets from the cache using content hashing', function() {
        var opts = grunt.util._.defaults(this.options(), options);
        var filters = grunt.util._.defaults(opts.filters, defaultFilters);

        var generateHash = function(fileData) {
            return opts.hash || crypto.createHash(opts.algorithm).update(fileData, opts.encoding).digest('hex').substring(0, opts.length);
        };

        var addHash = function(str, hash, extension) {
            return str.replace(extension, '') + opts.separator + hash + extension;
        };

        var processedFileMap = {};

        this.files.forEach(function(file) {
            var src = file.src.filter(function(filepath) {

                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }

            }).map(function(filepath) {
                var markup = grunt.file.read(filepath);

                var isCSS = (/\.css$/).test(filepath);

                findStaticAssets(markup, filters, isCSS).forEach(function(reference) {
                    var newFilename;
                    var newFilePath;
                    var newReference;

                    var filePath = (opts.baseDir ? opts.baseDir : path.dirname(filepath)) + '/';
                    var filename = path.normalize((filePath + reference).split('?')[0]);
                    var originalFilename = filename;
                    var originalReference = reference;

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
                            markup = markup.replace(new RegExp(regexEscape(reference), 'g'), processedFileMap[filename]);
                        } else {
                            var hashReplaceRegex = new RegExp(regexEscape(opts.separator) + '(' + (opts.hash ? opts.hash + '|' : '') + '[a-zA-Z0-9]{' + opts.length + '})', 'ig');

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

                            var hash = generateHash(grunt.file.read(filename));

                            // Create our new filename
                            newFilename = addHash(filename, hash, path.extname(filename));

                            // Create the new reference
                            newReference = addHash(reference.replace(hashReplaceRegex, ''), hash, path.extname(filename));

                            // Update the reference in the markup
                            markup = markup.replace(new RegExp(regexEscape(originalReference), 'g'), newReference);

                            // Create our new file
                            grunt.file.copy(filename, newFilename);
                        }
                    } else {
                        newFilename = reference.split('?')[0] + '?' + generateHash(grunt.file.read(filename));
                        newReference = newFilename;
                        markup = markup.replace(new RegExp(regexEscape(reference), 'g'), newFilename);
                    }

                    if (newFilename) {
                        processedFileMap[originalFilename] = newReference;
                    }
                });

                grunt.file.write(filepath, markup);

                grunt.log.writeln(['The file ', filepath, ' was busted!'].join(''));
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

            grunt.log.writeln(['File map has been exported to ', opts.baseDir + name, '!'].join(''));
            grunt.file.write(path.normalize(opts.baseDir + '/' + name), JSON.stringify(processedFileMap));
        }
    });

};
