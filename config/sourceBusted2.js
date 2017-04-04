module.exports = {
    options: {
        assets: ['assets/**'],
        baseDir: 'tmp/sourceBusted2',
        deleteOriginals: true,
        hash: '123456789',
    },
    files: [{
        cwd: './tmp/sourceBusted2/',
        src: ['assets/css/application.css', 'sourceBusted2.html']
    }]
};
