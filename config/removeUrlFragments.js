module.exports = {
    options: {
        baseDir: 'tmp/removeUrlFragments',
        enableUrlFragmentHint: true,
        removeUrlFragmentHint: true
    },
    files: [{
        expand: true,
        cwd: 'tmp/removeUrlFragments',
        src: ['*.php']
    }]
};
