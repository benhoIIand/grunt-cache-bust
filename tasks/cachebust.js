module.exports = function(grunt) {

    var fs     = require('fs'),
        path   = require('path'),
        crypto = require('crypto');

    var regexs = {
        js: {
            src: /<script.+src=['"]([^"']+)["']/gm,
            file: /src=['"]([^"']+)["']/m
        },
        css: {
            src: /<link.+href=.*\.css["']/gm,
            file: /href=['"]([^"']+)["']/m
        },
        images: {
            src: /<img[^\>]+src=['"](?!data:image)([^"']+)["']/gm,
            file: /src=['"]([^"']+)["']/m
        }
    };

    var fileOptions = {
        encoding: 'utf-8'
    };

    var options = {
        encoding: 'utf8',
        length: 16,
        algorithm: 'md5',
        rename: false
    };

    grunt.registerMultiTask('cacheBust', 'Add a hash as a query string parameter on static assets', function() {

        grunt.util._.extend(options, this.options());

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
                    console.log(matches);
                    matches.forEach(function(snippet) {

                        // Generate hash
                        var hash = crypto.createHash(options.algorithm).update(data, options.encoding).digest('hex').substring(0, options.length);

                        var extension = type !== 'images' ? '.'+type : snippet.match(/\.\w+/)[0];

                        if(options.rename) {
                            var path = filepath.split('/');
                            path.pop();
                            path = path.join('/') + '/';

                            var name = snippet.match(regex.file)[1];

                            var filename = path + name;
                            var newFilename = path + name.replace(extension, '') +'_'+ hash + extension;

                            snippet = snippet.substring(0, snippet.length - 1);
                            data = data.replace(snippet, snippet.replace(extension, '') +'_'+ hash + extension);

                            grunt.file.copy(filename, newFilename);
                            grunt.file.delete(filename);
                        } else {
                            snippet = snippet.substring(0, snippet.length - 1);
                            data = data.replace(snippet, snippet + '?' + hash);
                        }
                    });
                });

                grunt.file.write(filepath, data, fileOptions);

                grunt.log.writeln(filepath + ' was busted!');
            });
        });
    });

};