(function () {
    'use strict'

    angular.module('LibManageApp').factory('bookService', bookService);

    bookService.$inject = ['$q', '$http', 'ngAuthSettings'];

    function bookService($q, $http, ngAuthSettings) {
        var Factory = {
            GetAllBooks: _getAll,
            SaveBook: _saveBook,
        };
        return Factory;

        function _getAll() {
            var deferred = $q.defer();
            var url = "/api/book/getbooks";

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

        function _saveBook(book) {
            var deferred = $q.defer();
            var url = "/api/book/savebook";

            $http.post(url,
                JSON.stringify(book),
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