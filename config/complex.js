module.exports = {
    options: {
        assets: ['**/*.{css,jpg}'],
        baseDir: 'tmp/complex',
        deleteOriginals: true,
        hash: '123456789'
    },
    files: [{
        expand: true,
        cwd: 'tmp/complex',
        src: ['css/*.css', '*.html']
    }]
};
