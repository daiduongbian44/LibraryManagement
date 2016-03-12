(function () {
    'use strict'
    angular.module('LibManageApp').controller('editUserController', editUserController);

    editUserController.$inject = ['$scope', '$rootScope', '$location', 'UserObject', 'ngAuthSettings', '$ocLazyLoad', 'ListRole', '$modal', '$modalInstance', 'Upload'];

    function editUserController($scope, $rootScope, $location, UserObject, ngAuthSettings, $ocLazyLoad, ListRole, $modal, $modalInstance, Upload) {

        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;
        $scope.ListRole = ListRole;

        var _user = {
            UserName: "",
            FullName: "",
            Email: "",
            Address: "",
            PhoneNumber: 0,
            RoleID: 3,
            UserID: 0
        };


        $scope.user = {
            UserID: UserObject.userID,
            UserName: UserObject.userName,
            FullName: UserObject.fullName,
            Address: UserObject.address,
            Email: UserObject.email,
            PhoneNumber: UserObject.phoneNumber,
            RoleID: UserObject.roleID,
            ImageURL: UserObject.imageURL
        }

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnSave() {
            if ($scope.form.username.$valid) {

                _user.UserID = UserObject.UserID
                _user.ImageURL = UserObject.ImageURL;
                _user.FullName = $scope.user.FullName;
                _user.Email = $scope.user.Email;
                _user.Address = $scope.user.Address;
                _user.PhoneNumber = $scope.user.PhoneNumber;
                _user.RoleID = $scope.user.RoleID;

                // broadcast data to save
                $rootScope.$broadcast("EDIT_USER", { data: _user });

                _fnCloseModal();

            } else {

                _user.ImageURL = UserObject.ImageURL;
                _user.FullName = $scope.user.FullName;
                _user.Email = $scope.user.Email;
                _user.Address = $scope.user.Address;
                _user.PhoneNumber = $scope.user.PhoneNumber;
                _user.RoleID = $scope.user.RoleID;
                _user.UserID = UserObject.userID

                // broadcast data to save
                $rootScope.$broadcast("EDIT_USER", { data: _user });

                _fnCloseModal();
            }
        }

    }
})();