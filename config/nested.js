module.exports = {
    options: {
        assets: ['assets/**'],
        baseDir: 'tmp/nested',
        deleteOriginals: true,
        jsonOutput: true,
        jsonOutputFilename: 'ggg.json'
    },
    files: [{
        expand: true,
        cwd: 'tmp/nested',
        src: ['assets/js/**', 'nested.html']
    }]
};
