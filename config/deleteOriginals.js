module.exports = {
    options: {
        baseDir: 'tmp/deleteOriginals',
        deleteOriginals: true
    },
    files: [{
        expand: true,
        cwd: 'tmp/deleteOriginals/',
        src: ['*.html']
    }]
};
