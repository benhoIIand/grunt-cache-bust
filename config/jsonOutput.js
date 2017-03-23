module.exports = {
    options: {
        assets: '**/*.{js,css,jpg}',
        baseDir: 'tmp/jsonOutput/',
        jsonOutput: true,
        jsonOutputFilename: 'jsonOutput-map.json'
    },
    src: ['tmp/jsonOutput/**/*.html']
};
