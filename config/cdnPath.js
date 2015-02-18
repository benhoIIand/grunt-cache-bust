module.exports = {
    options: {
        baseDir: 'tmp/cdnPath'
    },
    files: [{
        expand: true,
        cwd: 'tmp/cdnPath',
        src: ['*.html']
    }]
};
