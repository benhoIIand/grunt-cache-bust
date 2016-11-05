module.exports = {
    options: {
        baseDir: 'tmp/outputDir',
        outputDir: 'outputDir',
        assets: 'assets/*',
        hash: 'abcdef123456'
    },
    files: [{
        expand: true,
        cwd: 'tmp/outputDir/',
        src: ['outputDir.html', 'assets/outputDir.css']
    }]
};
