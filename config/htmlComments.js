module.exports = {
    options: {
        baseDir: 'tmp/htmlComments'
    },
    files: [{
        expand: true,
        cwd: 'tmp/htmlComments/',
        src: ['*.html']
    }]
};
