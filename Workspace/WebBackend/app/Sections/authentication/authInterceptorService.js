(function () {
    'use strict';

    app.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

        var authInterceptorServiceFactory = {
            request: _request,
            responseError: _responseError,
        };
        return authInterceptorServiceFactory;

        // each the request attach with access_token
        function _request(config) {
            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        // response error
        function _responseError(rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');

                authService.LogOut();
                $location.path('/login');
            }
            return $q.reject(rejection);
        }


    }]);

})();