# grunt-cache-bust

[![npm version](https://badge.fury.io/js/grunt-cache-bust.svg)](http://badge.fury.io/js/grunt-cache-bust)
[![Build Status](https://travis-ci.org/hollandben/grunt-cache-bust.png?branch=master)](https://travis-ci.org/hollandben/grunt-cache-bust)
[![Dependencies](https://david-dm.org/hollandben/grunt-cache-bust.svg)](https://david-dm.org/hollandben/grunt-cache-bust.svg)
[![devDependency Status](https://david-dm.org/alanshaw/david/dev-status.svg?style=flat)](https://david-dm.org/alanshaw/david#info=devDependencies)

> Bust static assets from the cache using content hashing

* [Getting Started](#getting-started)
* [Introduction](#the-cachebust-task)
* [Overview](#overview)
* [Options](#options)
* [Usage Examples](#usage-examples)
* [CDNs](#cdns)
* [Change Log](#change-log)

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-cache-bust --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "cacheBust" task

Use the `cacheBust` task for cache busting static files in your application. This allows the assets to have a large expiry time in the browsers cache and will only be forced to use an updated file when the contents of it changes. This is a good practice.

Give the `cacheBust` a list of files that contain your resources and let it work it's magic.

__By 
default, it will bust the following file type: **CSS**, **JavaScript**, **images** and **favicons**_
__You can manually add more if needed__

### Overview
In your project's Gruntfile, add a section named `cacheBust` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cacheBust: {
    options: {
      encoding: 'utf8',
      algorithm: 'md5',
      length: 16,
      deleteOriginals: true
    },
    assets: {
      files: [{
        src: ['index.html']
      }]
    }
  }
})
```

```html
<!doctype html>
<html>
<head>
    <title>This is a test page</title>
    <link rel="stylesheet" href="/assets/standard.css" />
</head>
<body>
    <img src="/assets/standard.jpg" alt="bird">
    <script defer src="/assets/standard.js" type="text/javascript"></script>
</body>
</html>
```

### Options

#### Summary

```
// Here is a short summary of the options and some of their 
defaults. Extra details are below.
{
    algorithm: 'md5',                    // Algoirthm used for hashing files
    baseDir: './',                       // The base directory for all assets
    cdnPath: false,                      // You're own CDN path
    deleteOriginals: false,              // Delete the original file after hashing
    enableUrlFragmentHint: false,        // Look for the URL fragment in URLs
    encoding: 'utf8',                    // The encoding used when reading/writing files
    filters: {},                         // Filters used when searching the DOM for assets
    ignorePatterns: [],                  // Ignore files that match given patterns
    jsonOutput: false,                   // Output the original => new URLs to a JSON file
    length: 16,                          // The length of the hash from a file
    replaceTerms: [],                    // Replace terms in URLs
    removeUrlFragmentHint: false,        // Remove the URL fragment from URLs after hashing
    rename: true,                        // Rename files instead of appending a query string
    separator: '.'                       // The separator between the original file name and hash
}
```

#### options.algorithm
Type: `String`

Default value: `'md5'`

`algorithm` is dependent on the available algorithms supported by the version of OpenSSL on the platform. Examples are `'sha1'`, `'md5'`, `'sha256'`, `'sha512'`

#### options.baseDir
Type: `String`

Default value: `false`

When set, `cachebust` will try to find the asset files using the baseDir as base path.

You can override this at the file level, e.g:

```js
assets: {
  files: [
      {   
        expand: true,
        cwd: 'public/',
        baseDir: 'public/',
        src: ['modules/**/*.html']
      },  
      {   
        baseDir: '/',
        src: ['config/config.js']
      }   
  ]   
}   
```

#### options.cdnPath
Type: `String`

Default value: `false`

When set, `cachebust` test paths against this string when attempting to determine a path to be remote or not. This allows all assets to be busted locally and than uploaded to your own CDN. This string will be ignored in paths during file-handling to find files in `baseDir`.

#### options.deleteOriginals
Type: `Boolean`

Default value: `false`

When set, `cachebust` will delete the original versions of the files that have been renamed.  For example, `style.css` will be deleted after being copied to `style.dcf1d324cb50a1f9.css`.

#### options.enableUrlFragmentHint

Type: `Boolean`

Default value: `false`

When true, cachebust will search single and double-quoted strings in the given files for any resource ending in `#grunt-cache-bust`. See [an example](https://github.com/hollandben/grunt-cache-bust/blob/master/test/fixtures/enableUrlFragmentHint.php) for more details.

#### options.encoding
Type: `String`

Default value: `'utf8'`

The encoding of the file contents.

#### options.filters
Type : `Object`

Default value:
```js
{
    'SELECTOR' : function() { return this.attribs['ATTR']; }
}
```

The key in the object is the `selector`, and the value provided is the filter. Filters will be merged with the 
defaults above. See [an example](https://github.com/hollandben/grunt-cache-bust/blob/master/tasks/cachebust.js#L39) for more details.

#### options.ignorePatterns
Type: `Array`

Default value: `[]`

This is a regex test against a file reference. If returned true for patterns in the array, then that file will be ignored.

```js
ignorePatterns: ['test', 'requirejs']
```

#### options.jsonOutput
Type: `Boolean|String`

Default value: `false`

When set as `true`, `cachbust` will create a json file with an object inside that contains key value pairs of the original file name, and the renamed md5 hash name for each file.

The default output file will be named `grunt-cache-bust.json` and is relative to the root of the project, or the `baseDir` option if set.

Alternatively, you can set this option as a string i.e. `example-file-name.json`, and this will be used.

Output format looks like this:
```
{
  '/scripts/app.js' : '/scripts/app.23e6f7ac5623e96f.js',
  '/scripts/vendor.js': '/scripts/vendor.h421fwaj124bfaf5.js'
}
```

#### options.length
Type: `Number`

Default value: `16`

The number of characters of the file content hash to prefix the file name with.

#### options.replaceTerms
Type: `Array`

Default value: `[]`

Replace terms within URLs. See the `replaceTerm` folder in `tests`.

#### options.removeUrlFragmentHint

Type: `Boolean`

Default value: `false`

Removes the URL fragment after it's been processed.

#### options.rename
Type: `Boolean`

Default value: `true`

When true, `cachebust` will rename the reference to the file and the file itself with the generated hash. When set to false, then a query string parameter is added to the end of the file reference.

#### options.separator
Type: `String`

Default value: `.`

The separator between the original file name and hash

### Usage Examples

#### Basic Asset Cache Busting

```js
grunt.initConfig({
  cacheBust: {
    assets: {
      files: {
        src: ['index.html', 'contact.html']
      }
    }
  }
});
```

#### Custom Options

```js
grunt.initConfig({
  cacheBust: {
    options: {
      algorithm: 'sha1',
      length: 32,
      baseDir: '.tmp/public/',
      filters: {
        'script': [
          function() {
            return this.attribs['data-main'];
          }, // for requirejs mains.js
          function() {
            return this.attribs.src;
          } // keep 
          default 'src' mapper
        ]
      }
    },
    assets: {
      files: [{
        expand: true,
        cwd: 'src',
        src: ['*.html'],
        dest: 'dest/'
      }]
    }
  }
});
```

### CDNs

Remote URLs for CSS, JavaScript, and images are ignored by cacheBust. This assumes that remote URLs for these assets will be CDN hosted content, typically for well known libraries like jQuery or Bootstrap. For example, all these URLs will be ignored:

```html
<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">
<link href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css" rel="stylesheet">
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="http://code.jquery.com/qunit/qunit-1.12.0.js"></script>
<img src="https://secure.gravatar.com/avatar/d3b2094f1b3386e660bb737e797f5dcc?s=420" alt="test" />
```

### Change Log

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
