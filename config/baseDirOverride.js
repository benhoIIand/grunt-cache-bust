module.exports = {
    options: {
        baseDir: 'tmp/baseDirOverride'
    },
    files: [{
        baseDir: './tmp/baseDirOverride/others',
        expand: true,
        cwd: 'tmp/baseDirOverride/',
        src: ['*.html']
    }]
};
