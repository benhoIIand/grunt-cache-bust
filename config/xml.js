module.exports = {
    options: {
        baseDir: 'tmp/xml',
        assets: 'assets/*'
    },
    files: [{
        expand: true,
        cwd: 'tmp/xml/',
        src: ['*.xml']
    }]
};
