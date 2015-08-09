module.exports = {
    options: {
        assets: '**/*.{js,css,jpg}',
        baseDir: 'tmp/jsonOutput/',
        jsonOutput: 'jsonOutput-map.json'
    },
    src: ['tmp/jsonOutput/**/*.html']
};
