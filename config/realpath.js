module.exports = {
    options: {
        assets: ['css/*.{css,jpg}'],
        baseDir: 'tmp/realpath',
        deleteOriginals: true,
        hash: '123456789'
    },
    files: [{
        expand: true,
        cwd: 'tmp/realpath',
        src: ['css/*.css', '*.html']
    }]
};
