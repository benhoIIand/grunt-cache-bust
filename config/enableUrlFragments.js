module.exports = {
    options: {
        baseDir: 'tmp/enableUrlFragments',
        enableUrlFragmentHint: true
    },
    files: [{
        expand: true,
        cwd: 'tmp/enableUrlFragments',
        src: ['*.php']
    }]
};
