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
            PassWord: "123456",
            FullName: "",
            Email: "",
            Address: "",
            PhoneNumber: 0,
            RoleID: 3            
        };

        var _user = {
            UserName: "",
        };

        _selectDefault();

        function _selectDefault() {
            if (ListRole != null && ListRole.length > 0) {
                $scope.user.RoleID = ListRole[0].RoleID;
            }
        }

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnSave() {
            if ($scope.form.file.$valid
                && $scope.form.username.$valid
                && $scope.fileImage) Upload.upload({
                    url: 'api/upload/image',
                    data: { file: $scope.fileImage }
                }).then(function (resp) {                

                    _user.ImageURL = resp.data.data;
                    _user.UserName = $scope.user.UserName;
                    _user.PassWord = $scope.user.PassWord;
                    _user.FullName = $scope.user.FullName;
                    _user.Email = $scope.user.Email;
                    _user.Address = $scope.user.Address;
                    _user.PhoneNumber = $scope.user.PhoneNumber;
                    _user.RoleID = $scope.user.RoleID;

                    // broadcast data to save
                    $rootScope.$broadcast("CREATE_USER", { data: _user });

                    _fnCloseModal();

                }, function (resp) {
                    alert("Xảy ra lỗi trong quá trình upload ảnh.");
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                });
        }
    }
})();