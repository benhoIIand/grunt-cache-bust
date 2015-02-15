'use strict';

var grunt = require('grunt');
var cheerio = require('cheerio');
var css = require('css');

var regexs = require('./regexs');
var processCssFile = require('./processCssFile');

var cheerioOptions = {
    ignoreWhitespace: true,
    lowerCaseTags: true
};

module.exports = function(opts, filters) {
    var utils = require('./utils')(opts);

    return function(data, isCSS) {
        var $ = cheerio.load(data, cheerioOptions);
        var paths = [];
        var match;
        var potentialPath;

        function parseConditionalStatements() {
            var assets = '';

            // Add any conditional statements or assets in comments to the DOM
            $('head, body')
                .contents()
                .filter(function() {
                    return this[0].type === 'comment';
                })
                .each(function(i, element) {
                    assets += element.data.replace(/\[.*\]>|<!\[endif\]/g, '').trim();
                });

            $('body').append(assets);
        }

        if (isCSS) {
            paths = paths.concat(processCssFile(data));
        } else {
            parseConditionalStatements();
        }

        // Loop through each filter in the filter object
        Object.keys(filters).forEach(function(key) {
            var mappers = filters[key];

            var addPaths = function(mapper) {
                var foundPaths = $(key)
                    .filter(function(i, element) {
                        return utils.checkIfElemSrcValidFile(element);
                    })
                    .map(mapper)
                    .filter(function(i, path) {
                        return path ? true : false;
                    });

                for (var i = 0; i < foundPaths.length; i++) {
                    paths = paths.concat(foundPaths[i]);
                }
            };

            if (grunt.util.kindOf(mappers) === 'array') {
                mappers.forEach(addPaths);
            } else {
                addPaths(mappers);
            }
        });

        // Find any strings containing the hash `#grunt-cache-bust`
        while ((match = regexs.urlFragHint.exec(data)) !== null) {
            potentialPath = match[2] || match[4];

            if (utils.checkIfValidFile(potentialPath)) {
                paths.push(potentialPath);
            }
        }

        return paths.filter(function(path, index) {
            return paths.indexOf(path) === index;
        });
    };
};
