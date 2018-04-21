angular.module('main')
.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
	$ocLazyLoadProvider.config({
		debug: false,
		modules: [
			{ name: 'comp', files: [ 'assets/js/comp.js' ] }
        ]
    });
}]);