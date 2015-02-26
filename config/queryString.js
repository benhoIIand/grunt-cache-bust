module.exports = {
    options: {
        baseDir: 'tmp/queryString',
        rename: false
    },
    files: [{
        expand: true,
        cwd: 'tmp/queryString/',
        src: ['*.html', '*.css']
    }]
};
