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
    deleteOriginals: false,              // Delete the original file after hashing
    encoding: 'utf8',                    // The encoding used when reading/writing files
    jsonOutput: false,                   // Output the original => new URLs to a JSON file
    length: 16,                          // The length of the hash from a file
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

When set, `cachebust` will try to find the assets using the baseDir as base path.

```js
assets: {
  options: {
    baseDir: 'public/',
  },
  files: [
      {   
        expand: true,
        cwd: 'public/',
        src: ['modules/**/*.html']
      }
  ]   
}   
```

#### options.deleteOriginals
Type: `Boolean`

Default value: `false`

When set, `cachebust` will delete the original versions of the files that have been renamed.  For example, `style.css` will be deleted after being copied to `style.dcf1d324cb50a1f9.css`.

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

### Change Log

**v1.0.0**
* Re-wrote the way the plugin functions. Instead of finding assets in files, the plugin now goes through a given assets folder and builds an object based on the original and hashed file name. You can read more later...

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
