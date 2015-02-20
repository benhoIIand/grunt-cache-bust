module.exports = {
    options: {
        baseDir: 'tmp/windowsBrowserConfig'
    },
    files: [{
        expand: true,
        cwd: 'tmp/windowsBrowserConfig/',
        src: ['*.xml']
    }]
};
