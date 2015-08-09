module.exports = {
    options: {
        baseDir: 'tmp/deleteOriginals',
        deleteOriginals: true,
        assets: 'assets/*'
    },
    files: [{
        expand: true,
        cwd: 'tmp/deleteOriginals/',
        src: ['*.html']
    }]
};
