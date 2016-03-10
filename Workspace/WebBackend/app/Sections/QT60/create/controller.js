(function () {
    'use strict'
    angular.module('LibManageApp').controller('createUserController', createUserController);

    createUserController.$inject = ['$scope', '$rootScope', '$location', 'ngAuthSettings', '$ocLazyLoad', 'ListRole', '$modal', '$modalInstance', 'Upload'];

    function createUserController($scope, $rootScope, $location, ngAuthSettings, $ocLazyLoad, ListRole, $modal, $modalInstance, Upload) {

        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;
        $scope.ListRole = ListRole;


        $scope.user = {
            UserName: "",
            PassWord: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Address: "",
            PhoneNumber: 0,
            RoleID: 0
        };

        var _user = {
            UserName: "",
        };

        _selectDefault();

        function _selectDefault() {
            if (ListRole != null && ListRole.length > 0) {
                $scope.user.RoleID = ListRole[2].RoleID;
            }
        }

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnSave() {
            if ($scope.form.username.$valid) {
                _user.UserName = $scope.user.UserName;
                _user.PassWord = $scope.user.PassWord;
                _user.LastName = $scope.user.LastName;
                _user.FirstName = $scope.user.FirstName;
                _user.Email = $scope.user.Email;
                _user.Address = $scope.user.Address;
                _user.PhoneNumber = $scope.user.PhoneNumber;
                _user.RoleID = $scope.user.RoleID;

                // broadcast data to save
                $rootScope.$broadcast("CREATE_USER", { data: _user });

                _fnCloseModal();
            } else {
                $scope.message = "Tên tài khoản chưa hợp lệ.";
            }
        }

        function _textChange() {
            if (!$scope.form.username.$valid) {
                $scope.message = "Tên tài khoản chưa hợp lệ.";
            } else {
                $scope.message = "";
            }
        }
    }
})();