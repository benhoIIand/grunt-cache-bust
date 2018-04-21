angular.module('main')
.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
	$ocLazyLoadProvider.config({
		debug: false,
		modules: [ /* Definição dos alias dos módulos da aplicação */
			/* lib */
			{ name: 'comp', files: [ 'assets/js/comp.js' ] }
        ]
    });
}]);