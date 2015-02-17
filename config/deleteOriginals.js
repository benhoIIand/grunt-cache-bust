module.exports = {
    options: {
        baseDir: 'tmp/deleteOriginals'
    },
    files: [{
        expand: true,
        cwd: 'tmp/deleteOriginals/',
        src: ['*.html']
    }]
};
