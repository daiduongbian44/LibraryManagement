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
            ImageURL: "Uploads/avartar.jpg"
        };
        _selectDefault();

        var _user = {
            UserName: "",
        };

        
       
       function _selectDefault() {
           console.log(ListRole);
            if (ListRole != null && ListRole.length > 0) {
                console.log(ListRole);
                $scope.user.RoleID = ListRole[2].roleID;
            }
        }

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnSave() {
            if ($scope.form.fullname.$valid &&
                $scope.form.email.$valid && $scope.form.phonenumber.$valid && $scope.form.address.$valid) {

                _user.ImageURL = $scope.user.ImageURL;
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
            }
            else {
                $scope.message = "Thông tin bạn nhập không hợp lệ.";
            }
        }
        function _textChange() {
            if (!$scope.form.fullname.$valid ||
                !$scope.form.email.$valid || !$scope.form.phonenumber.$valid || !$scope.form.address.$valid) {
                $scope.message = "Thông tin bạn nhập không hợp lệ.";
            } else {
                $scope.message = "";
            }
        }
    }
})();