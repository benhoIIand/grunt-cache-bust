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
        src: ['assets/css/*.css', '*.html']
    }]
};
