module.exports = {
    options: {
        baseDir: 'tmp/images'
    },
    files: [{
        expand: true,
        cwd: 'tmp/images/',
        src: ['*.html']
    }]
};
