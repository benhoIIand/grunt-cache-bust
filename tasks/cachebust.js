module.exports = function(grunt) {

    var fs     = require('fs'),
        path   = require('path'),
        crypto = require('crypto');

    var regexs = {
        js: {
            src: /<script.+?src=['"](?!http:|https:|\/\/)([^"']+?)["']/gm,
            file: /src=['"]([^"']+)["']/m
        },
        css: {
            src: /<link.+?href=["'](?!http:|https:|\/\/).+?\.css("|\?.+?")/gm,
            file: /href=['"]([^"']+)["']/m
        },
        images: {
            src: /<img[^\>]+src=['"](?!http:|https:|\/\/|data:image)([a-zA-Z0-9\/]*)(\.[a-zA-Z]{2,})([^"']+)(["'])/gm,
            file: /src=['"]([^"']+)["']/m
        },
        favicon: {
            src: /<link.+?href=["'](?!http:|https:|\/\/).+?\.(gif|jpeg|jpg|png|ico|bmp)("|\?.+?")/gmi,
            file: /href=['"]([^"']+)["']/m
        }
    };

    var fileOptions = {
        encoding: 'utf-8'
    };

    var options = {
        algorithm: 'md5',
        baseDir: './',
        deleteOriginals: false,
        encoding: 'utf8',
        length: 16,
        replaceTerms:[],
        rename: false
    };

    grunt.registerMultiTask('cacheBust', 'Bust static assets from the cache using content hashing', function() {

        var opts = grunt.util._.defaults(this.options(), options);

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
                var data = grunt.file.read(filepath, fileOptions);

                grunt.util._.each(regexs, function(regex, type) {
                    var matches = data.match(regex.src) || [];
                    matches.forEach(function(snippet) {

                        // Generate hash
                        var hash = opts.hash || crypto.createHash(opts.algorithm).update(data, opts.encoding).digest('hex').substring(0, opts.length);

                        var extension = type !== 'images' ? '.'+ type : snippet.match(/\.\w+/)[0];

                        if(opts.rename) {
                            var path     = opts.baseDir + '/';
                            var _snippet = snippet;

                            // Replacing specific terms in the import path so renaming files
                            if(opts.replaceTerms && opts.replaceTerms.length > 0) {
                                opts.replaceTerms.forEach(function(obj) {
                                    grunt.util._.each(obj, function(replacement, term) {
                                        snippet = snippet.replace(term, replacement);
                                    });
                                });
                            }

                            // Remove duplicate hashes
                            snippet = snippet.replace(new RegExp('_'+ opts.hash+'|[a-zA-Z0-9]{'+ opts.length +'}', 'ig'), '');
                            _snippet = _snippet.replace(new RegExp('_'+ opts.hash+'|[a-zA-Z0-9]{'+ opts.length +'}', 'ig'), '');

                            var name = snippet.match(regex.file)[1];
                            var filename    = path + name;
                            var newFilename = path + name.replace(extension, '') +'_'+ hash + extension;


                            _snippet = _snippet.substring(0, _snippet.length - 1);
                            data     = data.replace(_snippet, _snippet.replace(extension, '') +'_'+ hash + extension);

                            grunt.file.copy(filename, newFilename);

                            if(opts.deleteOriginals) {
                                grunt.file.delete(filename);
                            }
                        } else {
                            snippet = snippet.substring(0, snippet.length - 1);
                            data    = data.replace(snippet, snippet.split('?')[0] + '?' + hash);
                        }
                    });
                });

                grunt.file.write(filepath, data, fileOptions);

                grunt.log.writeln(filepath + ' was busted!');
            });
        });
    });

};