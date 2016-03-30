(function () {
    'use strict'

    angular.module('LibManageApp').factory('categoryService', categoryService);

    categoryService.$inject = ['$q', '$http', 'ngAuthSettings'];

    function categoryService($q, $http, ngAuthSettings) {

        var Factory = {
            GetAllCategories: _getAllCategories,
            SaveCategory: _saveCategory,
            ChangeStatus: _changeStatus,
        };
        return Factory;

        // return all categories from db
        function _getAllCategories() {
            var deferred = $q.defer();
            var url = "/api/category/getcategorysubjects";

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

        // save an category to db
        function _saveCategory(category) {
            var deferred = $q.defer();
            var url = "/api/category/savecategorysubject";

            $http.post(url,
                JSON.stringify(category),
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

        function _changeStatus(category) {
            var deferred = $q.defer();
            var url = "/api/category/changecategorystatus";

            $http.post(url,
                JSON.stringify(category),
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