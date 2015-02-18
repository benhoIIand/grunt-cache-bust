module.exports = {
    options: {
        baseDir: 'tmp/requirejs'
    },
    files: [{
        expand: true,
        cwd: 'tmp/requirejs/',
        src: ['*.html']
    }]
};
