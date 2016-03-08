(function () {
    'use strict'
    angular.module('LibManageApp').controller('createCategoryController', createCategoryController);

    createCategoryController.$inject = ['$scope', '$rootScope', '$location', 'ngAuthSettings', '$ocLazyLoad', 'ListField', '$modal', '$modalInstance', 'Upload'];

    function createCategoryController($scope, $rootScope, $location, ngAuthSettings, $ocLazyLoad, ListField, $modal, $modalInstance, Upload) {

        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;
        $scope.ListField = ListField;

        console.log(ListField);

        var _category = {            
            CategoryName: "",
            CategoryLevel: 1,
            ParentID: 1,
            CategoryID: 0
        };

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnSave() {
            if ($scope.form.categoryname.$valid) {
                _category.CategoryName = $scope.category.CategoryName;

                // broadcast data to save
                $rootScope.$broadcast("CREATE_FIELD", { data: _category });

                _fnCloseModal();
            } else {
                $scope.message = "Tên đầu mục chưa hợp lệ.";
            }
        }

        function _textChange() {
            if (!$scope.form.categoryname.$valid) {
                $scope.message = "Tên đầu mục chưa hợp lệ.";
            } else {
                $scope.message = "";
            }
        }
    }
})();