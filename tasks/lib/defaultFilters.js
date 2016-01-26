module.exports = {
    'script': function() {
        return this.attribs.src;
    },
    'link[rel="stylesheet"]': function() {
        return this.attribs['href'];
    },
    'meta[property]': function() {
        return this.attribs.content;
    },
    'div': function() {
        if(this.attribs['class']&&(this.attribs['class'].indexOf(' lazy') >= 0 )){
            return this.attribs['data-original'];
        }else{
            return false;
        }
    },
    'img': [
        function() {
            if(this.attribs['class']&&(this.attribs['class'].indexOf(' lazy') >= 0 )){
                return this.attribs['data-original'];
            }else{
                return this.attribs.src;
            }
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
    'video': function() {
        return this.attribs['src'];
    },
    // Video source tag e.g. <video><source src="video.mp4" type="video/mp4" /></video>
    'source' : function() {
        if (this.attribs.type && this.attribs.type.indexOf("video") === 0 ){
            return this.attribs.src;
        }
        return undefined;
    },
    'link[rel*="icon"]': function() {
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
