module.exports = {
    'script': function() {
        return this.attribs.src;
    },
    'link[rel="stylesheet"]': function() {
        return this.attribs['href'];
    },
    'img': [
        function() {
            return this.attribs.src;
        },
        function() {
            var srcset = this.attribs.srcset;

            if (!srcset) {
                return false;
            }

            return srcset.split(',').map(function(src) {
                return src.trim().split(' ')[0];
            });
        }
    ],
    'link[rel="icon"], link[rel="shortcut icon"]': function() {
        return this.attribs.href;
    },
    'script[type="text/template"]': function() {},
    'square70x70logo': function() {
        return this.attribs.src;
    },
    'square150x150logo': function() {
        return this.attribs.src;
    },
    'square310x310logo': function() {
        return this.attribs.src;
    },
    'wide310x150logo': function() {
        return this.attribs.src;
    }
};
