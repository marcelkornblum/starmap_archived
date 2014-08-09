angular.module('starmap')
    .config(function(stateHelperProvider, $urlRouterProvider){
        stateHelperProvider.setNestedState({
            name: 'root',
            templateUrl: 'partial/root/root.html',
            // abstract: true,
            url: '/',
            controller: 'RootCtrl',
            resolve: {
            }
        });

        $urlRouterProvider.otherwise('/');
    });