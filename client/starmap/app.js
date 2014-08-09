angular.module('starmap', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ui.router.stateHelper', 'ngAnimate', 'ngTouch']);


angular.module('starmap').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
