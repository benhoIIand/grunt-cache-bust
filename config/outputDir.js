module.exports = {
    options: {
        baseDir: 'tmp/outputDir',
        outputDir: 'outputDir',
        assets: 'assets/*'
    },
    files: [{
        expand: true,
        cwd: 'tmp/outputDir/',
        src: ['*.html']
    }]
};
