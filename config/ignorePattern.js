module.exports = {
    options: {
        baseDir: 'tmp/ignorePattern',
        assets: ['assets/*', '!assets/*.jpg']
    },
    files: [{
        expand: true,
        cwd: 'tmp/ignorePattern/',
        src: ['*.html']
    }]
};
