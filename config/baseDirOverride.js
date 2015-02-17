module.exports = {
    options: {
        baseDir: 'tmp/baseDirOverride'
    },
    files: [{
        expand: true,
        cwd: 'tmp/baseDirOverride/',
        src: ['*.html']
    }]
};
