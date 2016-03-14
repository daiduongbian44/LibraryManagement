(function () {
    'use strict'
    angular.module('LibManageApp').controller('editBookController', editBookController);

    editBookController.$inject = ['$scope', '$rootScope', '$location', 'BookObject', 'ListAuthor', 'Upload', 'ListCategory', '$ocLazyLoad', '$modalInstance'];

    function editBookController($scope, $rootScope, $location, BookObject, ListAuthor, Upload, ListCategory, $ocLazyLoad, $modalInstance) {

        $scope.ListAuthor = angular.copy(ListAuthor);
        $scope.ListCategory = angular.copy(ListCategory);
        $scope.book = angular.copy(BookObject);

        _initData();

        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;
        $scope.message = "";

        function _initData() {
            for (var i = 0; i < $scope.ListAuthor.length; ++i) {
                $scope.ListAuthor[i].name = $scope.ListAuthor[i].authorName;
                $scope.ListAuthor[i].ticked = false;
                $scope.ListAuthor[i].icon = "<img src='" + $scope.ListAuthor[i].imageURL + "' />";
                $scope.ListAuthor[i].index = i;

                var searchAuthor = BookObject.listAuthor.filter(function (item) {
                    return item.authorID == $scope.ListAuthor[i].authorID;
                });
                if (searchAuthor != null && searchAuthor.length > 0) {
                    $scope.ListAuthor[i].ticked = true;
                }
            }

            $scope.localLang = {
                selectAll       : "Chọn tất cả",
                selectNone      : "Xóa tất cả",
                reset           : "Reset",
                search          : "Tìm kiếm",
                nothingSelected : "Chưa chọn tác giả"
            };
        }

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnValidData() {
            if ($scope.form.name.$valid &&
                $scope.form.quantity.$valid &&
                $scope.form.price.$valid &&
                $scope.form.publisher.$valid &&
                $scope.form.language.$valid) return true;
            return false;
        }

        function _parseSelectedAuthorList() {
            var listAuthorSelect = $scope.ListAuthorSelect;
            var listAuthor = [];
            for (var i = 0; i < listAuthorSelect.length; ++i) {
                listAuthor.push(ListAuthor[listAuthorSelect[i].index]);
            }
            return listAuthor;
        }

        function _parseCategory() {
            for (var i = 0; i < ListCategory.length; ++i) {
                if (ListCategory[i].categoryID === $scope.book.categoryID) {
                    $scope.book.categoryName = ListCategory[i].categoryName;
                }
            }
        }

        function _fnSave() {
            if (_fnValidData()) {
                $scope.book.listAuthor = _parseSelectedAuthorList();
                _parseCategory();

                $rootScope.$broadcast("EDIT_BOOK", { data: $scope.book });
                _fnCloseModal();

            } else {
                $scope.message = "Kiểm tra lại các trường dữ liệu cần thiết, tồn tại trường dữ liệu không hợp lệ";
            }
        }

    }
})();