'use strict';

var url = require('url');
var path = require('path');
var grunt = require('grunt');
var crypto = require('crypto');

var _ = require('lodash');

var DEFAULT_OPTIONS = {
    algorithm: 'md5',
    baseDir: './',
    createCopies: true,
    deleteOriginals: false,
    encoding: 'utf8',
    jsonOnly: false,
    jsonOutput: false,
    jsonOutputFilename: 'grunt-cache-bust.json',
    length: 16,
    separator: '.',
    queryString: false
};

module.exports = function() {
    grunt.registerMultiTask('cacheBustKey', 'Bust static assets from the cache using content hashing', function() {
        var opts = this.options(DEFAULT_OPTIONS);
        if (opts.jsonOnly === true) {
            opts.jsonOutput = true;
            opts.queryString = false;
        }
        if (opts.jsonDir === undefined && typeof opts.baseDir === 'string' && opts.baseDir.length > 1) {
            opts.jsonDir = opts.baseDir;
        }
        
        var discoveryOpts = {
            cwd: path.resolve(opts.baseDir),
            filter: 'isFile'
        };

        // Support object maps
        var assetArr = opts.assets;
        if (opts.jsonOnly && typeof assetArr === 'object' && !Array.isArray(assetArr)) {
            assetArr = grunt.util.toArray(assetArr);
        }

        // Generate an asset map
        var assetMap = grunt.file
            .expand(discoveryOpts, assetArr)
            .sort()
            .reverse()
            .reduce(hashFile, {});

        grunt.verbose.write('Assets found:', assetMap);

        // Write out assetMap
        if (opts.jsonOutput === true) {
            grunt.file.write(path.resolve(opts.jsonDir, opts.jsonOutputFilename), JSON.stringify(assetMap));
        }

        if (!opts.jsonOnly) {
            // Go through each source file and replace terms
            getFilesToBeRenamed(this.files).forEach(replaceInFile);
        }

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

            // This is probably a horrific way to remap the files back to the keys, and I'm very sorry.
            if (opts.jsonOnly && typeof opts.assets === 'object' && !Array.isArray(opts.assets)) {
                for (var i in opts.assets) {
                    if (!Object.prototype.hasOwnProperty.call(opts.assets, i)) {
                        continue;
                    }
                    if (opts.assets[i] === file) {
                        obj[i] = newFilename;
                    }
                }
            } else {
                obj[file] = newFilename;
            }
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
