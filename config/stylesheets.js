module.exports = {
    options: {
        baseDir: 'tmp/stylesheets'
    },
    files: [{
        expand: true,
        cwd: 'tmp/stylesheets/',
        src: ['*.html', '**/*.css']
    }]
};
