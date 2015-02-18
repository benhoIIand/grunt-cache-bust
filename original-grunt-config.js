queryString: {
        options: {
            jsonOutput: true,
            rename: false,
            ignorePatterns: ['toBeIgnoredCSS', 'toBeIgnoredJS', 'toBeIgnoredJPG']
        },
        files: [{
            expand: true,
            cwd: 'tmp/',
            src: ['*.html', '*.css', '!**/replace*.*', '!*.php', '!baseDir.html', '!baseDirOverride.html', '!cdnPath.html', '!deleteOriginals.html']
        }]
    },
    rename: {
        options: {
            baseDir: './tmp',
            jsonOutput: 'output/replace-cachebuster-map.json',
            filters: {
                script: [
                    function() {
                        return this.attribs['data-main'];
                    },
                    function() {
                        return this.attribs['src'];
                    }
                ]
            }
        },
        files: [{
            src: ['tmp/replace*.*', 'tmp/cdnPath.html', 'tmp/css/*.css']
        }]
    },
    deleteOriginals: {
        options: {
            deleteOriginals: true
        },
        files: [{
            src: ['tmp/deleteOriginals.html']
        }]
    },
    enableUrlFragmentHint: {
        options: {
            enableUrlFragmentHint: true
        },
        files: [{
            src: ['tmp/enableUrlFragmentHint.php']
        }]
    },
    removeUrlFragmentHint: {
        options: {
            enableUrlFragmentHint: true,
            removeUrlFragmentHint: true
        },
        files: [{
            src: ['tmp/removeUrlFragmentHint.php']
        }]
    },
    fileLevelBaseDirOverride: {
        options: {
            baseDir: './tmp',
            deleteOriginals: true
        },
        files: [{
            baseDir: './tmp/assets/others',
            src: ['tmp/baseDirOverride.html']
        }]
    },
    baseDir: {
        options: {
            baseDir: './tmp/dummyDir'
        },
        files: [{
            src: ['tmp/baseDir.html']
        }]
    },
