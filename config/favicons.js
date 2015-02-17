module.exports = {
    options: {
        baseDir: 'tmp/favicons'
    },
    files: [{
        expand: true,
        cwd: 'tmp/favicons/',
        src: ['*.html']
    }]
};
