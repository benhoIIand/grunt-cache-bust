module.exports = {
    options: {
        baseDir: 'tmp/cdnPath',
        cdnPath: 'domain.com'
    },
    files: [{
        expand: true,
        cwd: 'tmp/cdnPath',
        src: ['*.html']
    }]
};
