module.exports = {
    options: {
        assets: ['assets/**'],
        baseDir: 'tmp/absolutepath',
        deleteOriginals: true,
        hash: '123456789'
    },
    files: [{
        expand: true,
        cwd: 'tmp/absolutepath',
        src: ['css/*.css', '*.html']
    }]
};
