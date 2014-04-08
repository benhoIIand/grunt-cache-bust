'use strict';

module.exports = function(grunt) {

    var fs      = require('fs');
    var path    = require('path');
    var crypto  = require('crypto');
    var cheerio = require('cheerio');

    var remoteRegex    = /http:|https:|\/\/|data:image/;
    var extensionRegex = /(\.[a-zA-Z]{2,4})(|\?.*)$/;

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
        baseDir: './',
        deleteOriginals: false,
        encoding: 'utf8',
        length: 16,
        replaceTerms:[],
        rename: false,
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

    var checkIfRemote = function() {
        return remoteRegex.test(this.attr('src')) || remoteRegex.test(this.attr('href'));
    };

    var checkIfHasExtension = function() {
        return extensionRegex.test(this.attr('src')) || extensionRegex.test(this.attr('href'));
    };

    var checkIfValidFile = function() {
        return !checkIfRemote.call(this) && checkIfHasExtension.call(this);
    };

    var findStaticAssets = function(data, filters) {
        var $ = cheerio.load(data, cheerioOptions);

        // Add any conditional statements or assets in comments to the DOM
        var assets = '';

        $('head, body').contents().filter(function(){
            return this[0].type === 'comment';
        }).each(function(i, e) {
            assets += e.data.replace(/\[.*\]>|<!\[endif\]/g, '').trim();
        });

        $('body').append(assets);

        var paths = [];

        Object.keys(filters).forEach(function(key){
            var mappers = filters[key]
                , i
                , item;

            if (grunt.util.kindOf(mappers) === "array"){
                mappers.forEach(function(mapper){
                    paths = paths.concat($(key).filter(checkIfValidFile).map(mapper));
                });
            } else {
                item = $(key).filter(checkIfValidFile).map(mappers);

                for(i = 0; i < item.length; i ++){
                    if(typeof item[i] !== 'undefined'){
                        paths = paths.concat(item[i]);
                    }
                }
            }
        });

        return paths;
    };

    grunt.file.defaultEncoding = options.encoding;

    grunt.registerMultiTask('cacheBust', 'Bust static assets from the cache using content hashing', function() {
        var opts = grunt.util._.defaults(this.options(), options);
        var filters = grunt.util._.defaults(opts.filters, defaultFilters);

        var generateHash = function(fileData) {
            return opts.hash || crypto.createHash(opts.algorithm).update(fileData, opts.encoding).digest('hex').substring(0, opts.length);
        };

        this.files.forEach(function(f) {
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                var markup = grunt.file.read(filepath);

                findStaticAssets(markup, filters).forEach(function(reference) {
                    var _reference = reference;
                    var filePath   = opts.baseDir + '/';
                    var filename   = path.normalize((filePath + reference).split('?')[0]);
                    var extension  = path.extname(filename);

                    var newFilename;

                    if(opts.dir){
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
                        markup = markup.replace(new RegExp(regexEscape(reference), 'g'), _reference.replace(extension, '') +'_'+ hash + extension);

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
                        newFilename = reference.split('?')[0] + '?' + generateHash(grunt.file.read(filename));
                        markup = markup.replace(new RegExp(regexEscape(reference), 'g'), newFilename);
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