(function () {
    'use strict';

    angular.module('LibManageApp').controller('loginController', loginController);

    loginController.$inject = ['$scope', '$q', '$http', '$location', 'ngAuthSettings', 'authService'];

    function loginController($scope, $q, $http, $location, ngAuthSettings, authService) {

        $scope.loginData = {
            username: "cuongtk",
            password: "cuongtk"
        };

        $scope.message = "";

        //getAuthor();

        $scope.login = function () {
            authService.Login($scope.loginData).then(
                function (response) {
                    $location.path('/dashboard/home');
                    //getAuthor();
                },
                function (err) {
                    $scope.message = err.message.error_description;
                }
            );
        };

        function getAuthor() {
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
                console.log(response);
                return response;
            })
            .error(function (errMessage, statusCode) {
                var result = { isSuccess: false, status: statusCode, message: errMessage };
                deferred.reject(result);
                console.log(result);
                return result;
            });

            return deferred.promise;
        }
    }
})();