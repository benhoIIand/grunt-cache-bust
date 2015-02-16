'use strict';

module.exports = {
    remote: /http:|https:|\/\/|data:image/,
    extension: /(\.[a-zA-Z0-9]{2,4})(|\?.*)$/,
    urlFragHint: /'(([^']+)#grunt-cache-bust)'|"(([^"]+)#grunt-cache-bust)"/g,
    removeFragHint: /#grunt-cache-bust/g
};
