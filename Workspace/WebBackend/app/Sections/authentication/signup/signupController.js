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
            RoleID: 1,
            StatusTypeID: 1,
            FirstName: "",
            LastName: "",
            Address: "",
            PhoneNumber: "",
            Email: $scope.user.email,
            ImageURL: ""
        };

        signupService.SaveUser(user).then(
            function (response) {
                console.log(response);
                alert("Tai khoan dang duoc xu ly, vui long kiem tra mail");
                $location.path('/login');
            },
            function (error) {
                alert("Xay ra loi trong he thong, kiem tra sau.");
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
