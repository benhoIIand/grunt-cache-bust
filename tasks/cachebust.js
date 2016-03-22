'use strict';

var url = require('url');
var path = require('path');
var grunt = require('grunt');
var crypto = require('crypto');

var _ = grunt.util._;

var DEFAULT_OPTIONS = {
    algorithm: 'md5',
    baseDir: './',
    createCopies: true,
    deleteOriginals: false,
    encoding: 'utf8',
    jsonOutput: false,
    jsonOutputFilename: 'grunt-cache-bust.json',
    length: 16,
    separator: '.',
    queryString: false
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
            .sort()
            .reverse()
            .reduce(hashFile, {});

        grunt.verbose.write('Assets found:', assetMap);

        // Write out assetMap
        if(opts.jsonOutput === true) {
            grunt.file.write(path.resolve(opts.baseDir, opts.jsonOutputFilename), JSON.stringify(assetMap));
        }

        // Go through each source file and replace terms
        getFilesToBeRenamed(this.files).forEach(replaceInFile);

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

            if (!opts.queryString) {
                if (opts.createCopies) {
                    grunt.file.copy(absPath, path.resolve(opts.baseDir, newFilename));
                }

                if (opts.deleteOriginals) {
                    grunt.file.delete(absPath);
                }
            }

            obj[file] = newFilename;

            return obj;
        }

        function generateFileHash(data) {
            return opts.hash || crypto.createHash(opts.algorithm).update(data, opts.encoding).digest('hex').substring(0, opts.length);
        }

        function addFileHash(str, hash, separator) {
            if (opts.queryString) {
                return str + '?' + hash;
            } else {
                var parsed = url.parse(str);
                var ext = path.extname(parsed.pathname);

                return (parsed.hostname ? parsed.protocol + parsed.hostname : '') + parsed.pathname.replace(ext, '') + separator + hash + ext;
            }
        }

        function getFilesToBeRenamed(files) {
            var originalConfig = files[0].orig;

            return grunt.file
                .expand(originalConfig, originalConfig.src)
                .map(function (file) {
                    grunt.log.ok('Busted:', file);
                    return path.resolve((originalConfig.cwd ? originalConfig.cwd + path.sep : '') + file);
                });
        }

    });

};
