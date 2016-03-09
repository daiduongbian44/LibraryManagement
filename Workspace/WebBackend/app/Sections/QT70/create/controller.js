(function () {
    'use strict'
    angular.module('LibManageApp').controller('createBookController', createBookController);

    createBookController.$inject = ['$scope', '$rootScope', '$location', 'ListAuthor', 'Upload', 'ListCategory', '$ocLazyLoad', '$modalInstance'];

    function createBookController($scope, $rootScope, $location, ListAuthor, Upload, ListCategory, $ocLazyLoad, $modalInstance) {

        $scope.ListAuthor = angular.copy(ListAuthor);
        $scope.ListCategory = angular.copy(ListCategory);

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
            }

            $scope.localLang = {
                selectAll       : "Chọn tất cả",
                selectNone      : "Xóa tất cả",
                reset           : "Reset",
                search          : "Tìm kiếm",
                nothingSelected : "Chưa chọn tác giả"
            };

            if ($scope.ListCategory.length > 0) {
                $scope.book = {
                    categoryID: $scope.ListCategory[0].categoryID
                };
            }
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
            if ($scope.form.file.$valid
                && _fnValidData()
                && $scope.fileImage) {

                $scope.book.listAuthor = _parseSelectedAuthorList();
                _parseCategory();

                Upload.upload({
                    url: 'api/upload/image',
                    data: { file: $scope.fileImage }
                }).then(function (resp) {
                    $scope.book.imageURL = resp.data.data;

                    $rootScope.$broadcast("CREATE_BOOK", { data: $scope.book });

                    _fnCloseModal();

                }, function (resp) {
                    alert("Xảy ra lỗi trong quá trình upload ảnh.");
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                });
            } else {
                $scope.message = "Kiểm tra lại các trường dữ liệu cần thiết, tồn tại trường dữ liệu không hợp lệ";
            }
        }

    }
})();