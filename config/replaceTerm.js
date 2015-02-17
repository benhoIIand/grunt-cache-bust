module.exports = {
    options: {
        baseDir: 'tmp/replaceTerm',
        replaceTerms: [{
            '${Html.GetAppSetting(ThemeId)}': 'com'
        }]
    },
    files: [{
        expand: true,
        cwd: 'tmp/replaceTerm/',
        src: ['*.html']
    }]
};
