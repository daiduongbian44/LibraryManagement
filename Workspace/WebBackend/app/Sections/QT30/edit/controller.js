(function () {
    'use strict'
    angular.module('LibManageApp').controller('editCategoryController', editCategoryController);

    editCategoryController.$inject = ['$scope', '$rootScope', '$location', 'ngAuthSettings', '$ocLazyLoad', 'ListField', 'CategoryObject', '$modal', '$modalInstance', 'Upload'];

    function editCategoryController($scope, $rootScope, $location, ngAuthSettings, $ocLazyLoad, ListField, CategoryObject, $modal, $modalInstance, Upload) {

        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;
        $scope.ListField = ListField;
        
        $scope.category = angular.copy(CategoryObject);

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnSave() {
            if ($scope.form.categoryname.$valid) {
                // broadcast data to save
                $rootScope.$broadcast("EDIT_SUBJECT", { data: $scope.category });

                _fnCloseModal();
            } else {
                $scope.message = "Tên loại sách chưa hợp lệ.";
            }
        }

        function _textChange() {
            if (!$scope.form.categoryname.$valid) {
                $scope.message = "Tên loại sách chưa hợp lệ.";
            } else {
                $scope.message = "";
            }
        }
    }
})();