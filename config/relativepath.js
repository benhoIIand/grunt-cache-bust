module.exports = {
    options: {
        assets: ['assets/**'],
        baseDir: 'tmp/relativepath',
        deleteOriginals: true,
        hash: '123456789',
        jsonOutput: true
    },
    files: [{
        expand: true,
        cwd: 'tmp/relativepath',
        src: ['assets/css/*.css', '*.html']
    }]
};
