# grunt-cachebust [![Build Status](https://travis-ci.org/hollandben/grunt-cachebust.png?branch=master)](https://travis-ci.org/hollandben/grunt-cachebust)

> Bust static assets from the cache using content hashing

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-cache --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-cachebust');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "cachebust" task

Use the **cachebust** task for cache busting static files in your application. This allows them to be cached forever by the browser, justp oint the task towards any file that contains references to static assets.

_Currently supported static assets: **CSS**, **JavaScript** and **images**_

### Overview
In your project's Gruntfile, add a section named `cachebust` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cachebust: {
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

#### options.encoding
Type: `String`
Default value: `'utf8'`

The encoding of the file contents.

#### options.algorithm
Type: `String`
Default value: `'md5'`

`algorithm` is dependent on the available algorithms supported by the version of OpenSSL on the platform. Examples are `'sha1'`, `'md5'`, `'sha256'`, `'sha512'`

#### options.length
Type: `Number`
Default value: `16`

The number of characters of the file content hash to prefix the file name with.

#### options.rename
Type: `Boolean`
Default value: `false`

When true, `cachbust` will rename the refernce to the file and the file it's with a hash. When set to false, then a query string parameter is added to the end of the file reference.

### Usage Examples

#### Basic Asset Cache Busting

```js
grunt.initConfig({
  cachebust: {
    files: {
      src: ['index.html', 'contact.html']
    }
  }
})
```

#### Custom Options

```js
grunt.initConfig({
  cachebust: {
    options: {
      algorithm: 'sha1',
      length: 32
    },
    files: [{
      expand: true,
      cwd: 'src',
      src: ['*.html'],
      dest: 'dest/'
    }]
  }
})
```
