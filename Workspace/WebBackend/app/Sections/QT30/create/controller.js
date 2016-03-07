(function () {
    'use strict'
    angular.module('LibManageApp').controller('createCategoryController', createCategoryController);

    createCategoryController.$inject = ['$scope', '$rootScope', '$location', 'ngAuthSettings', '$ocLazyLoad', '$modal', '$modalInstance', 'Upload'];

    function createCategoryController($scope, $rootScope, $location, ngAuthSettings, $ocLazyLoad, $modal, $modalInstance, Upload) {

        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;

        var _category = {
            ImageURL: "",
            CategoryName: "",
            CategoryLevel: 1,
            ParentID: 1,
            CategoryID: 0
        };

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnSave() {
            if ($scope.form.file.$valid
                && $scope.form.categoryname.$valid
                && $scope.fileImage) {

                Upload.upload({
                    url: 'api/upload/image',
                    data: { file: $scope.fileImage }
                }).then(function (resp) {                    

                    _category.ImageURL = resp.data.data;
                    _category.CategoryName = $scope.category.CategoryName;

                    // broadcast data to save
                    $rootScope.$broadcast("CREATE_CATEGORY", { data: _category });

                    _fnCloseModal();

                }, function (resp) {
                    alert("Xảy ra lỗi trong quá trình upload ảnh.");
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                });
            }
        }
    }
})();