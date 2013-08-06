module.exports = function (grunt) {

    var fs     = require('fs'),
        path   = require('path'),
        crypto = require('crypto');

    var regexs = [
        /<script.+src=['"]([^"']+)["']/gm,
        /<link rel="stylesheet"[^\>]+href=.*\.css["']/gm
    ];

    grunt.registerMultiTask('cachebust', 'Add a hash as a query string parameter on static assets', function() {
        var options  = this.options(),
            srcFiles = this.files;

        grunt.verbose.writeflags(options, 'Options');

        if (srcFiles.length < 1) {
            grunt.log.warn('Destination not written because no source files were provided.');
        }

        grunt.util.async.forEachSeries(srcFiles, readFile);
    }

    function readFile(file) {
        var fileData;

        fs.readFile(file, {
            encoding: 'utf8'
        }, function(err, data) {
            if (err) {
                throw err;
            }
            fileData = data;

            regexs.forEach(function(regex) {
                var matches = data.match(regex) || [];
                matches.forEach(bustFile);
            });

            fs.writeFile(file, data, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(file +' was busted!');
                }
            });
        });


        function bustFile(matchedFile) {
            var hash = crypto.createHash('md5').update(fileData + new Date().getTime(), 'utf8').digest('hex');
            matchedFile = matchedFile.substring(0, matchedFile.length -1);
            fileData = fileData.replace(matchedFile, matchedFile+ '?'+ hash);
        }
    }

};