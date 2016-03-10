(function () {
    'use strict'
    angular.module('LibManageApp').controller('editUserController', editUserController);

    editUserController.$inject = ['$scope', '$rootScope', '$location', 'UserObject', 'ngAuthSettings', '$ocLazyLoad', '$modal', '$modalInstance', 'Upload'];

    function editUserController($scope, $rootScope, $location, UserObject, ngAuthSettings, $ocLazyLoad, $modal, $modalInstance, Upload) {

        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;

        var _user = {
            UserName: "",            
            FullName: "",
            Email: "",
            Address: "",
            PhoneNumber: 0,
            RoleID: 3,
            UserID : 0
        };
        

        $scope.user = {
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
                if ($scope.form.file.$valid && $scope.fileImage) {
                    Upload.upload({
                        url: 'api/upload/image',
                        data: { file: $scope.fileImage }
                    }).then(function (resp) {
                        //console.log(resp); resp.data.data (link image)

                        _user.ImageURL = resp.data.data;                                               
                        _user.FullName = $scope.user.FullName;
                        _user.Email = $scope.user.Email;
                        _user.Address = $scope.user.Address;
                        _user.PhoneNumber = $scope.user.PhoneNumber;
                        _user.RoleID = $scope.user.RoleID;

                        // broadcast data to save
                        $rootScope.$broadcast("EDIT_USER", { data: _user });

                        _fnCloseModal();

                    }, function (resp) {
                        alert("Xảy ra lỗi trong quá trình upload ảnh.");
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    });
                } else {                   

                    _user.ImageURL = resp.data.data;
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
    }
})();