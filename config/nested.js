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
        src: ['**/*.{js,css,html}', '!lib/**', '!node_modules/**']
    }]
};
