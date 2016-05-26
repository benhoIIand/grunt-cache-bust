module.exports = {
    options: {
        assets: {
            'custom-key': 'assets/jsonOnlyWithKey.js',
            'core-js': 'assets/coreFile.js'
        },
        baseDir: 'tmp/jsonOnlyWithKey/',
        jsonDir: 'tmp/jsonOnlyWithKey/',
        jsonOnly: true,
        jsonOutputFilename: 'jsonOnlyWithKey-map.json'
    }
};
