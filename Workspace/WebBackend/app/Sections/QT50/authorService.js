(function () {
    'use strict'

    angular.module('LibManageApp').factory('authorService', authorService);

    authorService.$inject = ['$q', '$http', 'ngAuthSettings'];

    function authorService($q, $http, ngAuthSettings) {

        var Factory = {
            GetAllAuthors: _getAllAuthors,
            SaveAuthor: _saveAuthor
        };
        return Factory;

        // return all authors from db
        function _getAllAuthors() {
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

        // save an author to db
        function _saveAuthor(author) {
            var deferred = $q.defer();
            var url = "/api/author/saveauthor";

            $http.post(url,
                JSON.stringify(author),
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