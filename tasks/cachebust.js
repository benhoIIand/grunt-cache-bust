'use strict';

var url = require('url');
var path = require('path');
var grunt = require('grunt');
var crypto = require('crypto');

var _ = grunt.util._;

var DEFAULT_OPTIONS = {
    algorithm: 'md5',
    baseDir: './',
    deleteOriginals: false,
    encoding: 'utf8',
    jsonOutput: false,
    jsonOutputFilename: 'grunt-cache-bust.json',
    length: 16,
    separator: '.'
};

module.exports = function() {
    grunt.registerMultiTask('cacheBust', 'Bust static assets from the cache using content hashing', function() {
        var opts = this.options(DEFAULT_OPTIONS);

        var discoveryOpts = {
            cwd: path.resolve(opts.baseDir),
            filter: 'isFile'
        };

        // Generate an asset map
        var assetMap = grunt.file
            .expand(discoveryOpts, opts.assets)
            .reduce(hashFile, {});

        // Write out assetMap
        if(opts.jsonOutput !== false) {
            var filename = typeof opts.jsonOutput === 'string' ? opts.jsonOutput : opts.jsonOutputFilename;
            grunt.file.write(path.resolve(opts.baseDir, filename), JSON.stringify(assetMap));
        }

        // Go through each source file and replace terms
        this.files.forEach(function (file) {
            file.src.forEach(replaceInFile);
        });

        function replaceInFile(filepath) {
            var markup = grunt.file.read(filepath);

            _.each(assetMap, function(hashed, original) {
                markup = markup.split(original).join(hashed);
            });

            grunt.file.write(filepath, markup);
        }

        function hashFile(obj, file) {
            var absPath = path.resolve(opts.baseDir, file);
            var hash = generateFileHash(grunt.file.read(absPath, {
                encoding: null
            }));
            var newFilename = addFileHash(file, hash, opts.separator);

            grunt.file.copy(absPath, path.resolve(opts.baseDir, newFilename));

            if(opts.deleteOriginals) {
                grunt.file.delete(absPath);
            }

            obj[file] = newFilename;

            return obj;
        }

        function generateFileHash(data) {
            return opts.hash || crypto.createHash(opts.algorithm).update(data, opts.encoding).digest('hex').substring(0, opts.length);
        }

        function addFileHash(str, hash, separator) {
            var parsed = url.parse(str);
            var ext = path.extname(parsed.pathname);

            return (parsed.hostname ? parsed.protocol + parsed.hostname : '') + parsed.pathname.replace(ext, '') + separator + hash + ext;
        }

    });

};
