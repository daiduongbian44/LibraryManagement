'use strict';
app.controller('loginController', ['$scope', '$location', 'ngAuthSettings', function ($scope, $location, ngAuthSettings) {

    $scope.loginData = {
        userName: "manh",
        password: "123456"
    };

    $scope.message = "";

    $scope.login = function () {
        $scope.message = "Error";

        console.log($scope.loginData);

        //authService.login($scope.loginData).then(function (response) {
        //    $location.path('/dashboard/home');
        //},
        //function (err) {
        //    $scope.message = err.error_description;
        //});
    };
}]);
