angular.module('starmap').factory('stars',
    function($http, $q) {
        var serverUrl = 'http://localhost:8000';
        var starPath = '/stars';
        var stars = [];

    	return {
            get: function () {
                p = $q.defer();
                $http({
                    method: 'GET',
                    url: serverUrl + starPath
                })
                    .success(function(data, status, headers, config) {
                        stars = data;
                        p.resolve(stars);
                    })
                    .error(function(data, status, headers, config) {})

                return p.promise;
            }
        };
    });