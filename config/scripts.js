module.exports = {
    options: {
        baseDir: 'tmp/scripts',
        assets: 'assets/*'
    },
    files: [{
        expand: true,
        cwd: 'tmp/scripts/',
        src: ['*.js']
    }]
};
