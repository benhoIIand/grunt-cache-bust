module.exports = {
    options: {
        assets: ['css/*.{css,jpg}'],
        baseDir: 'tmp/cdnpath',
        cdnPath: 'http://owncdn.test.com/path',
        deleteOriginals: true,
        hash: '123456789'
    },
    files: [{
        expand: true,
        cwd: 'tmp/cdnpath',
        src: ['css/*.css', '*.html']
    }]
};
