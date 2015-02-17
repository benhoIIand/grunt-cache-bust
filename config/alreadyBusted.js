module.exports = {
    options: {
        baseDir: 'tmp/alreadyBusted'
    },
    files: [{
        expand: true,
        cwd: 'tmp/alreadyBusted/',
        src: ['*.html']
    }]
};
