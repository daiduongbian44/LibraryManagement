(function () {
    'use strict'

    angular.module('LibManageApp').factory('fieldService', fieldService);

    fieldService.$inject = ['$q', '$http', 'ngAuthSettings'];

    function fieldService($q, $http, ngAuthSettings) {

        var _CategoryLevel = 1;

        var Factory = {
            GetAllCategorys: _getAll,
        };
        return Factory;

        function _getAll() {
            var deferred = $q.defer();
            var url = "/api/author/getauthors";

            $http.post(url,
                null,
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
    }
})();