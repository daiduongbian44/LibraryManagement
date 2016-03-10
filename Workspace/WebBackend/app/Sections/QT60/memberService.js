(function () {
    'use strict'

    angular.module('LibManageApp').factory('memberService', memberService);

    memberService.$inject = ['$q', '$http', 'ngAuthSettings'];

    function memberService($q, $http, ngAuthSettings) {

        var Factory = {
            GetAllUsers: _getAllUsers,
            GetAllRoles: _getAllRoles,
            SaveUser: _saveUser
        };
        return Factory;

        // return all user from db
        function _getAllUsers() {
            var deferred = $q.defer();
            var url = "/api/user/getusers";

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

        // return all role from db
        function _getAllRoles() {
            var deferred = $q.defer();
            var url = "/api/user/getroles";

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

        // save an user to db
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

    }
})();