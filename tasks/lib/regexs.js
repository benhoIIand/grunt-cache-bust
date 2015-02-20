'use strict';

module.exports = {
    relativePath: /^\.{1,2}\//,
    remote: /^http:|^https:|^\/\/|^data:image/i,
    extension: /(\.[a-zA-Z0-9]{2,4})(|\?.*)(|#.*)$/,
    urlFragHint: /'(([^']+)#grunt-cache-bust)'|"(([^"]+)#grunt-cache-bust)"/g,
    removeFragHint: /#grunt-cache-bust/g
};
