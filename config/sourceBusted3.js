module.exports = {
    options: {
        assets: ['assets/**'],
        baseDir: './tmp/sourceBusted3', // here ./tmp/
        deleteOriginals: true,
        hash: '123456789',
    },
    files: [{
        src: ['tmp/sourceBusted3/assets/css/application.css', 'tmp/sourceBusted3/sourceBusted3.html'] // here tmp
    }]
};
