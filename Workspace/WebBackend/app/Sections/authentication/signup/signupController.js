'use strict';
app.controller('signupController', ['$scope', '$location', 'ngAuthSettings', function ($scope, $location, ngAuthSettings) {

    $scope.user = {
    };

    $scope.message = "";
    $("#text-error-matching-password").hide();

    $scope.signup = function () {

        //authService.login($scope.loginData).then(function (response) {
        //    $location.path('/dashboard/home');
        //},
        //function (err) {
        //    $scope.message = err.error_description;
        //});

    };

    $scope.changeRePassword = function () {
        console.log($scope.user.password);
        console.log($scope.user.repassword);
        if ($scope.user.password !== $scope.user.repassword) {
            $("#text-error-matching-password").show();
        } else {
            $("#text-error-matching-password").hide();
        }
    }
}]);
