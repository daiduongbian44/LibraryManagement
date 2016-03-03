(function () {
    'use strict';

    angular.module('LibManageApp').factory('authService', authService);

    authService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function authService($http, $q, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var Factory = {
            SaveUser: _saveUser,
            Login: _login,
        };
        return Factory;

        // save user-info
        function _saveUser(user) {
            var deferred = $q.defer();
            var url = "/api/authen/saveuser";

            $http.post(url,
                JSON.stringify(user),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            .success(function (response) {
                deferred.resolve(response);
                return response;
            })
            .error(function (errMessage, statusCode) {
               var result = { isSuccess: false, status: statusCode, message: errMessage };
               deferred.reject(result);
               return result;
            });

            return deferred.promise;
        }

        function _login() {

        }
    }
    
})();