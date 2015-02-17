module.exports = {
    options: {
        baseDir: 'tmp/jsonOutput'
    },
    files: [{
        expand: true,
        cwd: 'tmp/jsonOutput/',
        src: ['*.html']
    }]
};
