module.exports = {
    options: {
        baseDir: 'tmp/stylesheets',
        assets: 'assets/**/*'
    },
    files: [{
        expand: true,
        cwd: 'tmp/stylesheets/',
        src: ['**/*.css']
    }]
};
