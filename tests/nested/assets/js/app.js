angular.module('main')
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
                
    $stateProvider
        .state('init', {
            url: '/',
            templateUrl: 'assets/views/home.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    $ocLazyLoad.load(['comp']);
                }]
            }
        })
        .state('init.comp', {
            url: 'comp',
            template: '<comp></comp>'
        });
}]);