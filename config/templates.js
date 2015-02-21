module.exports = {
    options: {
        baseDir: 'tmp/templates'
    },
    files: [{
        expand: true,
        cwd: 'tmp/templates/',
        src: ['*.html']
    }]
};
