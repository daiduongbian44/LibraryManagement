'use strict';

angular.module('LibManageApp').controller('loginController', loginController);

loginController.$inject = ['$scope', '$location', 'ngAuthSettings', 'authService'];

function loginController($scope, $location, ngAuthSettings, authService) {

    $scope.loginData = {
        username: "manh",
        password: "123456"
    };

    $scope.message = "";

    $scope.login = function () {
        authService.Login($scope.loginData).then(
            function (response) {
                $location.path('/dashboard/home');
            },
            function (err) {
                $scope.message = "Tên đăng nhập hoặc mật khẩu không hợp lệ.";
            }
        );
    };
}
