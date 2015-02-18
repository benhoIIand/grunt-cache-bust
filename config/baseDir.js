module.exports = {
    options: {
        baseDir: 'tmp/baseDir/dummyDir'
    },
    files: [{
        expand: true,
        cwd: 'tmp/baseDir/',
        src: ['*.html']
    }]
};
