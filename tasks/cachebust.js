module.exports = function(grunt) {

    var fs     = require('fs'),
        path   = require('path'),
        crypto = require('crypto');

    var regexs = [
        /<script.+src=['"]([^"']+)["']/gm,
        /<link.+href=.*\.css["']/gm
    ];

    var fileOptions = {
        encoding: 'utf-8'
    };

    grunt.registerMultiTask('cachebust', 'Add a hash as a query string parameter on static assets', function() {

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

                regexs.forEach(function(regex) {
                    var matches = data.match(regex) || [];
                    matches.forEach(function(snippet) {
                        var hash = crypto.createHash('md5').update(data + new Date().getTime(), 'utf8').digest('hex');
                        snippet = snippet.substring(0, snippet.length - 1);
                        data = data.replace(snippet, snippet + '?' + hash);
                    });
                });

                grunt.file.write(filepath, data, fileOptions);

                grunt.log.writeln(filepath + ' was busted!');
            });
        });
    });

};