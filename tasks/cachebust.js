'use strict';

module.exports = function(grunt) {

    var fs      = require('fs');
    var path    = require('path');
    var crypto  = require('crypto');
    var cheerio = require('cheerio');

    var remoteRegex      = /http:|https:|\/\/|data:image/;
    var extensionRegex   = /(\.[a-zA-Z]{2,6})(|\?.*)$/;
    var urlFragHintRegex = /'(([^']+)#grunt-cache-bust)'|"(([^"]+)#grunt-cache-bust)"/g;

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
        enableUrlFragmentHint: false,
        filters : {}
    };

    var defaultFilters = {
        'script' : function() { return this.attr('src'); },
        'link[rel="stylesheet"]' : function() { return this.attr('href'); },
        'img' : function() { return this.attr('src'); },
        'link[rel="icon"], link[rel="shortcut icon"]' : function() { return this.attr('href'); }
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

        $('head, body').contents().filter(function(){
            return this[0].type === 'comment';
        }).each(function(i, e) {
            assets += e.data.replace(/\[.*\]>|<!\[endif\]/g, '').trim();
        });

        $('body').append(assets);

        var paths = [];
        Object.keys(filters).forEach(function(key){
            var mappers = filters[key];
            if (grunt.util.kindOf(mappers) === "array"){
                mappers.forEach(function(mapper){
                    paths = paths.concat($(key).filter(checkIfElemSrcValidFile).map(mapper));
                });
            } else {
                paths = paths.concat($(key).filter(checkIfElemSrcValidFile).map(mappers));
            }
        });

        if(enableUrlFragmentHint) {
            var match,
                potentialPath;

            while((match = urlFragHintRegex.exec(data)) != null) {
                potentialPath = match[2] || match[4];

                if(checkIfValidFile(potentialPath))
                    paths.push(potentialPath);
            }
        }

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

                findStaticAssets(markup, filters, opts.enableUrlFragmentHint).forEach(function(reference) {
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

                        // Delete the original file if the setting is true
                        if(opts.deleteOriginals) {
                            grunt.file.delete(filename);
                        }
                    } else {
                        newFilename = reference.split('?')[0] + '?' + generateHash(grunt.file.read(filename));
                        markup = markup.replace(new RegExp(regexEscape(reference), 'g'), newFilename);
                    }
                });

                grunt.file.write(filepath, markup);

                grunt.log.writeln(filepath + ' was busted!');
            });
        });
    });

};