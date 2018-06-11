Change Log
==========

**v1.7.0**
* Add urlPrefixes option (#234)

**v1.6.0**
* Log out busted files in verbose mode only (#228)
* Updating documentation to show the loadNpmTasks business (#231)
* Fix for clearOutputDir option (#230)
* Fix multiple cache bust query params being added (#227)

**v1.5.1**
* Fix "Warning: Cannot use 'in' operator to search" error when queryString option is passed
* Fix several paths issues
* Enable Busting of img srcset

**v1.5.0**
* Fix paths in hashed files (#211)
* Files in outputDir should have files replaced (#210)

**v1.4.1**
* Move `fs-extra` from dev dependency to dependency

**v1.4.0**
* Added option `outputDir`, a directory where all hashed assets will be copied

**v1.3.0**
* Upgraded to `grunt@1.x.x`

**v1.2.0**
* Added option `queryString` to bust using a query string and keep original files intact

**v1.1.0**
* Added option `createCopies` to disable creating hashed copies of the files

**v1.0.0**
* Fundamental breaking changes - see issue [#147](https://github.com/hollandben/grunt-cache-bust/issues/147) for more details
* Re-wrote the way the plugin functions. Instead of finding assets in files, the plugin now goes through a given assets folder and builds an object based on the original and hashed file name. Read more about the changes in [#147](https://github.com/hollandben/grunt-cache-bust/issues/147)
* Remove string option for `jsonOutput`, enforcing the use of `jsonOutputFilename`
* Sorting and reversing to collection of assets - fixes #176
* Updated documentation

**v0.6.1**
* Support cache busting for meta tags
* Support cache busting for all favicons

**v0.6.0**
* Support cache busting for video tag
* Fix CSS processing for media queries with comments
* Use passed in grunt when registering

**v0.5.1**
* Reading files to be hashed as a buffer rather than string

**v0.5.0** - 2015-08-09
* Using Node's path module to help with getting the correct paths to assets

**v0.4.13** - 2015-02-27
* Fixes issue with deleting the original files when referenced in more than one source file.
* Fixed issue with hashe in the url of assets when referenced in CSS

**v0.4.12** - 2015-02-26 
* Fixed tests and implementation when deleting original files.

**v0.4.12** - 2015-02-25
* Ignoring data-images when parsing CSS.

**v0.4.12** - 2015-02-20
* Added support for Windows 8.1 and IE titles browser config file.

**v0.4.2** - 2015-02-19
* Tidied up tests. Improved README readability.

**v0.4.2** - 2015-02-18
* Improved detection of remote resources

**v0.4.2** - 2015-02-18
* Fix for working with relative paths

**v0.4.2** - 2015-02-15
* Added options to remove frag hints and use a local CDN. Busting multiple values in CSS files. Bust SVG xlink:href path. Override `baseDir` on a per file basis.
