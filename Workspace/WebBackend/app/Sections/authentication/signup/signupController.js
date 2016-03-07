(function () {
    'use strict';

    angular.module('LibManageApp').controller('signupController', signupController);

    signupController.$inject = ['$scope', '$location', 'ngAuthSettings', 'signupService'];

    function signupController($scope, $location, ngAuthSettings, signupService) {

        $scope.isValid = false;
        $scope.message = "";
        $("#text-error-matching-password").hide();

        $scope.signup = function () {
            if ($scope.isValid === false) return;

            var user = {
                UserName: $scope.user.username,
                PassWord: $scope.user.password,
                RoleID: 2,
                StatusTypeID: 1,
                FirstName: "",
                LastName: "",
                Address: "",
                PhoneNumber: "",
                Email: $scope.user.email,
                ImageURL: ""
            };

            signupService.SaveUser(user).then(
                function (res) {
                    if (res.status !== "error") {
                        alert("Tài khoản đang được xử lý, kiểm tra hòm thư điện tử.");
                        $location.path('/login');
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra một lỗi trong hệ thống, đăng ký vào thời gian khác.");
                }
            );
        };

        $scope.changeRePassword = function () {
            if ($scope.user.password !== $scope.user.repassword) {
                $("#text-error-matching-password").show();
                $scope.isValid = false;
            } else {
                $("#text-error-matching-password").hide();
                $scope.isValid = true;
            }
        }
    }
})();