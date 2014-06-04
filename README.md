# grunt-cache-bust

[![Build Status](https://travis-ci.org/hollandben/grunt-cache-bust.png?branch=master)](https://travis-ci.org/hollandben/grunt-cache-bust)

> Bust static assets from the cache using content hashing

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-cache-bust --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-cache-bust');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "cacheBust" task

Use the **cacheBust** task for cache busting static files in your application. This allows them to be cached forever by the browser, just point the task towards any file that contains references to static assets.

_Currently supported static assets: **CSS**, **JavaScript**, **images** and **favicons**_

_Note:_ Remote URLs for CSS, JavaScript, and images are ignored by cacheBust.  This assumes that remote URLs for these assets will
be CDN hosted content, typically for well known libraries like jQuery or Bootstrap. For example, all of below URLs will be ignored:

```html
<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">
<link href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css" rel="stylesheet">
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="http://code.jquery.com/qunit/qunit-1.12.0.js"></script>
<img src="https://secure.gravatar.com/avatar/d3b2094f1b3386e660bb737e797f5dcc?s=420" alt="test" />
```

### Overview
In your project's Gruntfile, add a section named `cacheBust` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cacheBust: {
    options: {
      encoding: 'utf8',
      algorithm: 'md5',
      length: 16
    },
    assets: {
        files: [{
            src: ['index.html']
        }]
    }
  },
})
```

### Options

#### options.algorithm
Type: `String`
Default value: `'md5'`

`algorithm` is dependent on the available algorithms supported by the version of OpenSSL on the platform. Examples are `'sha1'`, `'md5'`, `'sha256'`, `'sha512'`

#### options.dir
Type: `String`
Default value: `false`

When set, `cachebust` will try to find the asset files using the dir as base path.

#### options.enableUrlFragmentHint
Type: `Boolean`
Default value: `false`

When true, `cachebust` will search single- and double-quoted strings in scripting languages such as PHP for asset paths.
Asset paths must have the "#grunt-cache-bust" URL fragment appended. See Usage Examples section below.

#### options.encoding
Type: `String`
Default value: `'utf8'`

#### options.filters
Type : `Object`
Default value:
```js
{
    'script' : function() { return this.attribs['src']; },
    'link[rel="stylesheet"]' : function() { return this.attribs['href']; },
    'img' : function() { return this.attribs['src']; },
    'link[rel="icon"], link[rel="shortcut icon"]' : function() { return this.attribs['href']; }
}
```

The key in the object is the `selector`, and the value provided is the filter. Filters will be merged with the defaults above.

#### options.ignorePatterns
Type: `Array`
Default value: `[]`
This is a regex test against a file reference. If returned true for patterns in the array, then that file will be ignored.
```js
ignorePatterns: ['test', 'requirejs']
```

#### options.jsonOutput
Type: `Boolean`
Default value: `false`

When true, `cachbust` will create a json file with an object inside that contains key value pairs of the original file name, and the renamed md5 hash name for each file.

The format looks like this:
`{`
  `'app.js' : 'app_23E6F7AC5623E96F7AC56293E6F7AC56.js'`
`}`

#### options.jsonOutputFilename
Type: `String`
Default value: `'cachebuster.json'`

Allows you to specify the filename for your cachebuster JSON file.

#### options.length
Type: `Number`
Default value: `16`

The number of characters of the file content hash to prefix the file name with.

#### options.rename
Type: `Boolean`
Default value: `false`

When true, `cachebust` will rename the reference to the file and the file itself with the generated hash. When set to false, then a query string parameter is added to the end of the file reference.

### Usage Examples

#### Basic Asset Cache Busting

```js
grunt.initConfig({
  cacheBust: {
    files: {
      src: ['index.html', 'contact.html']
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
      dir: '.tmp/public/',
      filters: {
        'script' : [
            function() { return this.attribs['data-main']; } // for requirejs mains.js
            function() { return this.attribs['src']; }, // keep default 'src' mapper
        ]
      }
    },
    files: [{
      expand: true,
      cwd: 'src',
      src: ['*.html'],
      dest: 'dest/'
    }]
  }
});
```

#### URL-Fragment Hints

```js
grunt.initConfig({
  cacheBust: {
    options: {
      enableUrlFragmentHint: true
    },
    files: ['example.php']
  }
});
```

Before cache bust:

```php
// example.php
$foo = '/some/asset/path.jpg#grunt-cache-bust';
$other = '/wont/be/busted.jpg';
```

After cache bust:

```php
// example.php
$foo = '/some/asset/path.jpg?fa59cbed61b15262#grunt-cache-bust';
$other = '/wont/be/busted.jpg';
```
