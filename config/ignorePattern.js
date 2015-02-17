module.exports = {
    options: {
        baseDir: 'tmp/ignorePatterns'
    },
    files: [{
        expand: true,
        cwd: 'tmp/ignorePatterns/',
        src: ['*.html']
    }]
};
