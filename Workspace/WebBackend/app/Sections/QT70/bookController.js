(function () {
    'use strict'
    angular.module('LibManageApp').controller('bookController', bookController);

    bookController.$inject = ['$scope', '$location', 'ngAuthSettings', 'authorService', 'categoryService', 'bookService', '$ocLazyLoad', '$modal', 'DTOptionsBuilder'];

    function bookController($scope, $location, ngAuthSettings, authorService, categoryService, bookService, $ocLazyLoad, $modal, DTOptionsBuilder) {

        $scope.boxsearch = {
            open: true,
        };

        _initSearch();
        _loadData();

        $scope.FnClear = _initSearch;
        $scope.FnSearch = _search;
        $scope.GridFnCreate = _create;
        $scope.GridSelectedIndex = -1;
        $scope.GridFnClickRow = _clickRow;
        $scope.GridFnEdit = _editItem;
        $scope.GridFnDelete = _deleteItem;

        $scope.ListAuthor = null;
        $scope.ListCategory = null;

        function _initSearch() {
            
        }

        function _loadData() {
            authorService.GetAllAuthors().then(
                function (response) {
                    //console.log(response.data);
                    $scope.ListAuthor = response.data;
                },
                function (error) {
                    $scope.ListAuthor = null;
                    alert("Không thể lấy danh sách các tác giả.");
                }
            );
            categoryService.GetAllCategories().then(
                function (response) {
                    $scope.ListCategory = response.data;
                },
                function (error) {
                    $scope.ListCategory = null;
                    alert("Không thể lấy danh sách loại sách");
                }
            );
        }

        function _search() {

        }

        function _create() {
            $ocLazyLoad.load({
                name: 'LibManageApp',
                files:
                [
                    'app/Sections/QT70/create/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT70/create/view.html",
                    controller: 'createBookController',
                    size: 'lg',
                    resolve: {
                        ListAuthor: function () {
                            return $scope.ListAuthor;
                        },
                        ListCategory: function () {
                            return $scope.ListCategory;
                        },
                    }
                });
            });
        }

        function _clickRow(index) {
            $scope.GridSelectedIndex = index;
        }

        function _editItem(item) {
            
        }

        function _deleteItem(item, index) {

        }

        $scope.GridDtOptions = DTOptionsBuilder.newOptions()
            .withScroller()
            .withBootstrap()
            .withPaginationType('full_numbers') //Paging style
            .withTableTools('bower_components/angular-datatables/copy_csv_xls_pdf.swf') // Using table tools
            .withTableToolsButtons([ //Define các nút để kết xuất dữ liệu.
                'copy',
                {
                    'sExtends': 'collection',
                    'sButtonText': 'Kết xuất dữ liệu',
                    'aButtons': ['csv', 'xls', 'pdf']
                }
            ]);

        // receive an event from modal and save data
        $scope.$on("CREATE_BOOK", function (event, dt) {
            bookService.SaveBook(dt.data).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        alert("Thêm cuốn sách thành công.");
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra lỗi khi thêm cuốn sách.");
                }
            );
        });

        // receive an event from modal and save data
        $scope.$on("EDIT_BOOK", function (event, dt) {
            fieldService.SaveField(dt.data).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        alert("Sửa cuốn sách thành công.");
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra lỗi khi sửa cuốn sách.");
                }
            );
        });

    }
})();