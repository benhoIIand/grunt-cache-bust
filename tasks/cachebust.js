'use strict';

var fs = require('fs-extra');
var url = require('url');
var path = require('path');
var crypto = require('crypto');
var _ = require('grunt').util._;

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
    queryString: false,
    outputDir: '',
    clearOutputDir: false
};

module.exports = function(grunt) {
    grunt.registerMultiTask('cacheBust', 'Bust static assets from the cache using content hashing', function() {
        var opts = this.options(DEFAULT_OPTIONS);

        var discoveryOpts = {
            cwd: path.resolve(opts.baseDir),
            filter: 'isFile'
        };

        //clear output dir if it was set
        if (opts.clearOutputDir && opts.outputDir.length > 0) {
            fs.removeSync(path.resolve((discoveryOpts.cwd ? discoveryOpts.cwd + opts.clearOutputDir : opts.clearOutputDir)));
        }

        // Generate an asset map
        var assetMap = grunt.file
            .expand(discoveryOpts, opts.assets)
            .sort()
            .reverse()
            .reduce(hashFile, {});

        grunt.verbose.write('Assets found:', assetMap);

        // Write out assetMap
        if (opts.jsonOutput === true) {
            grunt.file.write(path.resolve(opts.baseDir, opts.jsonOutputFilename), JSON.stringify(assetMap));
        }

        // don't just split on the filename, if the filename = 'app.css' it will replace
        // all app.css references, even to files in other dirs
        // so replace this:
        // "{file}"
        // '{file}'
        // ({file}) (css url(...))
        // ={file}> (unquoted html attribute)
        // ={file}\s (unquoted html attribute fonllowed by more attributes)
        // "{file}\s (first entry of img srcset)
        // \s{file}\s (other entries of img srcset)
        // files may contain a querystring, so all with ? as closing too
        var replaceEnclosedBy = [
            ['"', '"'],
            ["'", "'"],
            ['(', ')'],
            ['=', '>'],
            ['=', ' '],
            ['"', ' '],
            [' ', ' '],
        ];
        replaceEnclosedBy = replaceEnclosedBy.concat(replaceEnclosedBy.map(function(reb) {
            return [reb[0], '?'];
        }));

        // Go through each source file and replace them with busted file if available
        var map = opts.queryString ? undefined : assetMap;
        getFilesToBeRenamed(this.files, map, opts.baseDir).forEach(replaceInFile);

        function replaceInFile(filepath) {
            var markup = grunt.file.read(filepath);
            var baseDir = discoveryOpts.cwd + '/';
            var relativeFileDir = path.dirname(filepath).substr(baseDir.length);
            var fileDepth = 0;

            if (relativeFileDir !== '') {
                fileDepth = relativeFileDir.split('/').length;
            }

            var baseDirs = filepath.substr(baseDir.length).split('/');

            _.each(assetMap, function(hashed, original) {
                var replace = [
                    // abs path
                    ['/' + original, '/' + hashed],
                    // relative
                    [grunt.util.repeat(fileDepth, '../') + original, grunt.util.repeat(fileDepth, '../') + hashed],
                ];
                // find relative paths for shared dirs
                var originalDirParts = path.dirname(original).split('/');
                for (var i = 1; i <= fileDepth; i++) {
                    var fileDir = originalDirParts.slice(0, i).join('/');
                    var baseDir = baseDirs.slice(0, i).join('/');
                    if (fileDir === baseDir) {
                        var originalFilename = path.basename(original);
                        var hashedFilename = path.basename(hashed);
                        var dir = grunt.util.repeat(fileDepth - 1, '../') + originalDirParts.slice(i).join('/');
                        if (dir.substr(-1) !== '/') {
                            dir += '/';
                        }
                        replace.push([dir + originalFilename, dir + hashedFilename]);
                    }
                }

                _.each(replace, function(r) {
                    var original = r[0];
                    var hashed = r[1];
                    _.each(replaceEnclosedBy, function(reb) {
                        markup = markup.split(reb[0] + original + reb[1]).join(reb[0] + hashed + reb[1]);
                    });
                });
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
                var pathToFile = opts.outputDir.length > 0 ? path.join(opts.outputDir, parsed.pathname.replace(/^.*[\\\/]/, '')) : parsed.pathname;
                var ext = path.extname(parsed.pathname);

                return (parsed.hostname ? parsed.protocol + parsed.hostname : '') + pathToFile.replace(ext, '') + separator + hash + ext;
            }
        }

        function getFilesToBeRenamed(files, assetMap, baseDir) {
            var originalConfig = files[0].orig;
            // check if fully specified filenames have been busted and replace with busted file
            originalConfig.src = originalConfig.src.map(function(file) {
                if (file.substr(0, baseDir.length) === baseDir && (file.substr(baseDir.length + 1)) in assetMap) {
                    return baseDir + '/' + assetMap[file.substr(baseDir.length + 1)];
                }
                return file;
            });

            return grunt.file
                .expand(originalConfig, originalConfig.src)
                .map(function(file) {

                    // if the file is hashed, then the hashed file should be
                    // used instead of the original for replacement.  This will
                    // only be the case if an outputDir is being used.
                    if (!opts.queryString && opts.outputDir && _.has(assetMap, file)) {
                        file = assetMap[file];
                    }
                    grunt.log.ok('Busted:', file);
                    return path.resolve((originalConfig.cwd ? originalConfig.cwd + path.sep : '') + file);
                });
        }

    });

};