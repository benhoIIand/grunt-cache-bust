'use strict';

module.exports = function(grunt) {

    var fs      = require('fs');
    var path    = require('path');
    var crypto  = require('crypto');
    var cheerio = require('cheerio');

    var remoteRegex    = /http:|https:|\/\/|data:image/;
    var extensionRegex = /(\.[a-zA-Z0-9]{2,4})(|\?.*)$/;
    var urlFragHintRegex = /'(([^']+)#grunt-cache-bust)'|"(([^"]+)#grunt-cache-bust)"/g;

    var filenameSwaps = {};

    var that;

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
        replaceTerms:[],
        rename: false,
        enableUrlFragmentHint: false,
        filters : {},
        jsonOutput: false,
        jsonOutputFilename: 'cachebuster.json'
    };

    var defaultFilters = {
        'script' : function() { 
            return this.attribs['src']; 
        },
        'link[rel="stylesheet"]' : function() { 
            return this.attribs['href']; 
        },
        'img' : function() { 
            return this.attribs['src']; 
        },
        'link[rel="icon"], link[rel="shortcut icon"]' : function() { 
            return this.attribs['href']; 
        }
    };

    var checkIfRemote = function(href) {
        return remoteRegex.test(href);
    };

    var checkIfHasExtension = function(href) {
        return extensionRegex.test(href);
    };

    var checkIfValidFile = function(href) {
        return !checkIfRemote(href) && checkIfHasExtension(href);
    };

    /** @this Object An elem on which attr() may be called for src or href. */
    var checkIfElemSrcValidFile = function() {
        return checkIfValidFile(this.attr('src') || this.attr('href'));
    };

    var findStaticAssets = function(data, filters, enableUrlFragmentHint) {
        var $ = cheerio.load(data, cheerioOptions);

        // Add any conditional statements or assets in comments to the DOM
        var assets = '';

        $('head, body').contents().filter(function() {
            return this[0].type === 'comment';
        }).each(function(i, e) {
            assets += e.data.replace(/\[.*\]>|<!\[endif\]/g, '').trim();
        });

        $('body').append(assets);

        var paths = [];

        Object.keys(filters).forEach(function(key) {
            var mappers = filters[key],
                i,
                item;

            var addPaths = function(mapper) {
                var i,
                    item,

                    foundPaths = $(key)
                    .filter(checkIfElemSrcValidFile)
                    .map(mapper)
                    .filter(function(path, el){
                        var rtn = false;

                        if(el){
                            rtn = true;
                        }

                        return rtn;
                    });
                
                for(i = 0; i < foundPaths.length; i++){
                    paths = paths.concat(foundPaths[i]);
                }
            };

            if (grunt.util.kindOf(mappers) === 'array') {
                mappers.forEach(addPaths);
            } else {
                addPaths(mappers);
            }
        });

        if(enableUrlFragmentHint) {
            var match, potentialPath;

            while((match = urlFragHintRegex.exec(data)) != null) {
                potentialPath = match[2] || match[4];

                if(checkIfValidFile(potentialPath)) {
                    paths.push(potentialPath);
                }
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

                findStaticAssets(markup, filters, opts.enableUrlFragmentHint).forEach(function(reference) {
                    var _reference = reference;
                    var filePath   = (opts.baseDir ? opts.baseDir : path.dirname(filepath)) + '/';
                    var filename   = path.normalize((filePath + _reference).split('?')[0]);
                    var extension  = path.extname(filename);

                    var newFilename;

                    if(opts.dir) {
                        filename = opts.dir + filename;
                    }

                    if(opts.rename) {
                        var hashReplaceRegex = new RegExp('_('+ opts.hash +'|[a-zA-Z0-9]{'+ opts.length +'})', 'ig');

                        // Remove previous busts
                        filename   = filename.replace(hashReplaceRegex, '');
                        _reference = _reference.replace(hashReplaceRegex, '');


                        // Replacing specific terms in the import path so renaming files
                        if(opts.replaceTerms && opts.replaceTerms.length > 0) {
                            opts.replaceTerms.forEach(function(obj) {
                                grunt.util._.each(obj, function(replacement, term) {
                                    filename = filename.replace(term, replacement);
                                });
                            });
                        }

                        if(!grunt.file.exists(filename)) {
                            grunt.log.warn('Static asset "' + filename + '" skipped because it wasn\'t found.');
                            return false;
                        }

                        var hash = generateHash(grunt.file.read(filename));

                        // Create our new filename
                        newFilename = filename.replace(extension, '') +'_'+ hash + extension;

                        // Update the reference in the markup
                        markup = markup.replace(new RegExp(regexEscape(_reference), 'g'), _reference.replace(extension, '') +'_'+ hash + extension);

                        // Create our new file
                        grunt.file.copy(filename, newFilename);

                        //Generate a JSON with the swapped file names if requested
                        if(opts.jsonOutput){
                            filenameSwaps[filename] = newFilename;
                        }

                        // Delete the original file if the setting is true
                        if(opts.deleteOriginals) {
                            grunt.file.delete(filename);
                        }
                    } else {
                        newFilename = _reference.split('?')[0] + '?' + generateHash(grunt.file.read(filename));
                        markup = markup.replace(new RegExp(regexEscape(_reference), 'g'), newFilename);
                    }
                });

                //Generate a JSON with the swapped file names if requested
                if(opts.jsonOutput){
                    grunt.log.writeln(opts.dir + opts.jsonOutputFilename + ' created!');
                    grunt.file.write(opts.dir + opts.jsonOutputFilename, JSON.stringify(filenameSwaps));
                }

                grunt.file.write(filepath, markup);

                grunt.log.writeln(filepath + ' was busted!');
            });
        });
    });

};