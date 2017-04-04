module.exports = {
    options: {
        assets: ['assets/**'],
        baseDir: './tmp/relativepath2/',
        deleteOriginals: true,
        hash: '123456789'
    },
    files: [{
        cwd: './tmp/relativepath2/',
        src: ['assets/css/application.css', 'relativepath2.html']
    }]
};
