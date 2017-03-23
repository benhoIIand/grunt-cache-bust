module.exports = {
    options: {
        baseDir: 'tmp/createCopies',
        createCopies: false,
        assets: 'assets/*'
    },
    files: [{
        expand: true,
        cwd: 'tmp/createCopies/',
        src: ['*.html']
    }]
};
