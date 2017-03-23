module.exports = {
    options: {
        assets: ['**/*.{css,jpg}'],
        baseDir: 'tmp/queryString',
        queryString: true,
        hash: '123456789'
    },
    files: [{
        expand: true,
        cwd: 'tmp/queryString',
        src: ['css/*.css', '*.html']
    }]
};
