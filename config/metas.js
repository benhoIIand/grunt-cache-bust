module.exports = {
    options: {
        baseDir: 'tmp/metas'
    },
    files: [{
        expand: true,
        cwd: 'tmp/metas/',
        src: ['*.html']
    }]
};
