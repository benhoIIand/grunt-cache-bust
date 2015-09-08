module.exports = {
    options: {
        baseDir: 'tmp/videos'
    },
    files: [{
        expand: true,
        cwd: 'tmp/videos/',
        src: ['*.html']
    }]
};
