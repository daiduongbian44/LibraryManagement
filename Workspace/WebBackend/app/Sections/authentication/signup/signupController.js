'use strict';
app.controller('signupController', ['$scope', '$location', 'ngAuthSettings', 'signupService',
    function ($scope, $location, ngAuthSettings, signupService) {

        $scope.user = {
            UserName: "manh",
            PassWord: "123",
            RoleID: 1,
            StatusTypeID: 1,
            FirstName: "manh",
            LastName: "nguyen",
            Address: "hanoi",
            PhoneNumber: "123",
            Email: "Email",
            ImageURL: "image.jpg"
        }

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
}]);
