module.exports = {
    options: {
        assets: ['**/*.{css,jpg}'],
        baseDir: 'tmp/indexHash',
        indexFilename: 'indexHash.html',
        indexHashFilename: 'INDEX_HASH',
        hash: '123456789'
    },
    files: [{
        expand: true,
        cwd: 'tmp/indexHash',
        src: ['css/*.css', '*.html']
    }]
};
