module.exports = {
    options: {
        assets: ['**/*.{css,jpg}'],
        baseDir: 'tmp/urlPrefixes',
        urlPrefixes: ['http://owncdn1.test.com/path', 'http://owncdn2.test.com/path'],
        deleteOriginals: true,
        hash: '123456789'
    },
    files: [{
        expand: true,
        cwd: 'tmp/urlPrefixes',
        src: ['css/*.css', '*.html']
    }]
};
