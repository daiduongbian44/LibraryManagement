(function () {
    'use strict'
    angular.module('LibManageApp').controller('createFieldController', createFieldController);

    createFieldController.$inject = ['$rootScope', '$scope', '$location', 'ngAuthSettings', '$ocLazyLoad', '$modalInstance'];

    function createFieldController($rootScope, $scope, $location, ngAuthSettings, $ocLazyLoad, $modalInstance) {
    
        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;
        $scope.message = "";

        var _category = {
            CategoryName: ""
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
                $scope.message = "Tên chuyên ngành chưa hợp lệ.";
            }
        }

        function _textChange() {
            if (!$scope.form.categoryname.$valid) {
                $scope.message = "Tên chuyên ngành chưa hợp lệ.";
            } else {
                $scope.message = "";
            }
        }
    }
})();