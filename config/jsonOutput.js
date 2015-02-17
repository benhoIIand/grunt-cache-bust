module.exports = {
    options: {
        baseDir: 'tmp/jsonOutput',
        jsonOutput: 'output/cachebuster-map.json'
    },
    files: [{
        expand: true,
        cwd: 'tmp/jsonOutput/',
        src: ['*.html']
    }]
};
