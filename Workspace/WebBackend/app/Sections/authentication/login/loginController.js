'use strict';
app.controller('loginController', ['$scope', '$location', 'ngAuthSettings', 'authService',
    function ($scope, $location, ngAuthSettings, authService) {

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
}]);
