module.exports = {
    options: {
        assets: '**/*.{js,css,jpg}',
        baseDir: 'tmp/hash/',
        hash: 'abcdef123456'
    },
    src: ['tmp/hash/**/*.html']
};
