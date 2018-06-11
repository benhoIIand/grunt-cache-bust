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
    clearOutputDir: false,
    urlPrefixes: []
};

module.exports = function(grunt) {
    var isUsingQueryString = function(opts) {
        return opts.queryString;
    };
    grunt.registerMultiTask('cacheBust', 'Bust static assets from the cache using content hashing', function() {
        var opts = this.options(DEFAULT_OPTIONS);
        if( opts.baseDir.substr(-1) !== '/' ) {
            opts.baseDir += '/';
        }

        var discoveryOpts = {
            cwd: path.resolve(opts.baseDir),
            filter: 'isFile'
        };

        //clear output dir if it was set
        if (opts.clearOutputDir && opts.outputDir.length > 0) {
            fs.removeSync(path.resolve((discoveryOpts.cwd ? discoveryOpts.cwd + '/' +opts.outputDir : opts.outputDir)));
        }

        // Generate an asset map
        var assetMap = grunt.file
            .expand(discoveryOpts, opts.assets)
            .sort()
            .reverse()
            .reduce(hashFile, {});

        grunt.verbose.writeln('Assets found:', JSON.stringify(assetMap, null, 2));

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
        // /{file} (css url(...))
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
            [' ', ' ']
        ];

        // add urlPrefixes to enclosing scenarios
        if (opts.urlPrefixes && Array.isArray(opts.urlPrefixes) && opts.urlPrefixes.length > 0) {
            opts.urlPrefixes.forEach(function(urlPrefix) {
                replaceEnclosedBy.push([urlPrefix, '"']);
                replaceEnclosedBy.push([urlPrefix, "'"]);
                replaceEnclosedBy.push([urlPrefix, ")"]);
                replaceEnclosedBy.push([urlPrefix, ">"]);
                replaceEnclosedBy.push([urlPrefix, " "]);
            });
        }
        // don't replace references that are already cache busted
        if (!isUsingQueryString(opts)) {
            replaceEnclosedBy = replaceEnclosedBy.concat(replaceEnclosedBy.map(function(reb) {
                return [reb[0], '?'];
            }));
        }

        // Go through each source file and replace them with busted file if available
        var map = opts.queryString ? {} : assetMap;
        var files = getFilesToBeRenamed(this.files, map, opts.baseDir);
        files.forEach(replaceInFile);
        grunt.log.ok(files.length + ' file' + (files.length !== 1 ? 's ' : ' ') + 'busted.');

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
            var baseDirResolved = path.resolve(baseDir) + '/';
            var cwd = process.cwd() + '/';
            originalConfig.src = originalConfig.src.map(function(file) {
                if( assetMap ) {
                    var files = [file];
                    if(path.resolve(cwd + file).substr(0, baseDirResolved.length) === baseDirResolved) {
                        files.push(path.resolve(cwd + file).substr(baseDirResolved.length));
                    }
                    var result;
                    files.forEach(function(file2) {
                        var fileResolved = path.resolve(baseDirResolved + file2);
                        if (!result && fileResolved.substr(0, baseDirResolved.length) === baseDirResolved && (fileResolved.substr(baseDirResolved.length)) in assetMap) {
                            result = assetMap[fileResolved.substr(baseDirResolved.length)];
                            // if original file had baseDir at the start, make sure it's there now
                            var baseDirNormalized = path.normalize(baseDir);
                            if(path.normalize(file).substr(0, baseDirNormalized.length) === baseDirNormalized) {
                                result = baseDir + result;
                            }
                        }
                    });
                    if(result) {
                        return result;
                    }
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
                    grunt.verbose.writeln('Busted:', file);
                    return path.resolve((originalConfig.cwd ? originalConfig.cwd + path.sep : '') + file);
                });
        }

    });

};
