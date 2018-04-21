'use strict';

var grunt = require('grunt');

module.exports = {

    nested: function(test) {
        test.expect(10);

        var html = grunt.file.read('tmp/nested/nested.html');
        test.ok(html.match(/assets\/css\/application\.b8c34b559a47ba87\.a303467aa468c743\.css/), 'testing assets/css/application.css replaced in HTML');
        test.ok(html.match(/assets\/lib\/angular\.min\.5cc821195b6fa484\.js/), 'testing assets/lib/angular.min.js replaced in HTML');
        test.ok(html.match(/assets\/lib\/angular-ui-router\.min\.0ef20b23d2e6ef01\.js/), 'testing assets/lib/angular-ui-router.min.js replaced in HTML');
        test.ok(html.match(/assets\/lib\/ocLazyLoad\.min\.2022b62e59d2af0b\.js/), 'testing assets/lib/ocLazyLoad.min.js replaced in HTML');

        test.ok(html.match(/assets\/js\/module\.34661e323588620e\.js/), 'testing assets/js/module.js replaced in HTML');
        test.ok(html.match(/assets\/js\/lazyload\.db393bc44df4009d\.1a3637457ee37996\.fd0f51e8be961f5b\.js/), 'testing assets/js/lazyload.js replaced in HTML');
        test.ok(html.match(/assets\/js\/app\.4bc9bc3042224408\.3b85cbfc2a0d7264\.js/), 'testing assets/js/app.js replaced in HTML');

        var css = grunt.file.read('tmp/nested/assets/css/application.b8c34b559a47ba87.a303467aa468c743.css');
        test.ok(css.match(/url\(\/assets\/images\/testbg\.1cad98e937926582\.png\)/), 'testing /assets/images/testbg.png replaced in busted CSS');

        var lazyload = grunt.file.read('tmp/nested/assets/js/lazyload.db393bc44df4009d.1a3637457ee37996.fd0f51e8be961f5b.js');
        test.ok(lazyload.match(/assets\/js\/comp\.31fd6ad30b080296\.a65c14dd3ffc2fbe\.js/), 'testing assets/js/comp.js replaced in busted CSS');

        var comp = grunt.file.read('tmp/nested/assets/js/comp.31fd6ad30b080296.a65c14dd3ffc2fbe.js');
        test.ok(comp.match(/assets\/js\/comp\.235db4cad3ae4428\.html/), 'testing assets/js/comp.html replaced in busted CSS');

        test.done();
    }

};
