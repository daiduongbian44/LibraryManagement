(function () {
    'use strict'
    angular.module('LibManageApp').controller('editFieldController', editFieldController);

    editFieldController.$inject = ['$rootScope', '$scope', '$location', 'FieldObject', 'ngAuthSettings', '$ocLazyLoad', '$modalInstance'];

    function editFieldController($rootScope, $scope, $location, FieldObject, ngAuthSettings, $ocLazyLoad, $modalInstance) {
    
        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;
        $scope.message = "";

        $scope.category = angular.copy(FieldObject);

        var _category = {
            CategoryName: ""
        };

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnSave() {
            if ($scope.form.categoryname.$valid) {

                // broadcast data to save
                $rootScope.$broadcast("EDIT_FIELD", { data: $scope.category });

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