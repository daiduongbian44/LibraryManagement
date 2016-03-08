(function () {
    'use strict'
    angular.module('LibManageApp').controller('createCategoryController', createCategoryController);

    createCategoryController.$inject = ['$scope', '$rootScope', '$location', 'ngAuthSettings', '$ocLazyLoad', 'ListField', '$modal', '$modalInstance', 'Upload'];

    function createCategoryController($scope, $rootScope, $location, ngAuthSettings, $ocLazyLoad, ListField, $modal, $modalInstance, Upload) {

        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;
        $scope.ListField = ListField;
        

        $scope.category = {
            CategoryName: "",
            ParentID: 0
        };

        var _category = {
            CategoryName: "",
        };

        _selectDefault();

        function _selectDefault() {
            if (ListField != null && ListField.length > 0) {
                $scope.category.ParentID = ListField[0].categoryID;
            }
        }

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnSave() {
            if ($scope.form.categoryname.$valid) {
                _category.CategoryName = $scope.category.CategoryName;
                _category.ParentID = $scope.category.ParentID;

                // broadcast data to save
                $rootScope.$broadcast("CREATE_SUBJECT", { data: _category });

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