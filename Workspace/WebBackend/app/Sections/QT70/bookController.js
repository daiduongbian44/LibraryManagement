(function () {
    'use strict'
    angular.module('LibManageApp').controller('bookController', bookController);

    bookController.$inject = ['$scope', '$location', 'ngAuthSettings', 'commonService','fieldService', 'authorService', 'categoryService', 'bookService', '$ocLazyLoad', '$modal', 'DTOptionsBuilder'];

    function bookController($scope, $location, ngAuthSettings, commonService, fieldService, authorService, categoryService, bookService, $ocLazyLoad, $modal, DTOptionsBuilder) {

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
        $scope.ListField = null;
        $scope.GridListItem = null;

        $scope.IsFilledDataCategory = 0;
        $scope.IsFilledDataField = 0;
        $scope.IsInitSearch = 0;

        $scope.DataOrigin = null;

        function _initSearch() {
            $scope.ListCategorySearch = angular.copy($scope.ListCategory);
            $scope.ListFieldSearch = angular.copy($scope.ListField);

            $scope.search = {
                categoryID: null,
                fieldID: null,
                authorName: "",
                bookName:"",
            };

            $scope.GridListItem = $scope.DataOrigin;
            if ($scope.ListCategory != null
                && $scope.ListField != null
                && $scope.ListCategory.length > 0 
                && $scope.ListField.length > 0) {
                $scope.search.fieldID = $scope.ListField[0].categoryID;
                $scope.changeSelectField();
            }
        }

        $scope.changeSelectField = function () {
            $scope.ListCategorySearch = $scope.ListCategory.filter(function (item) {
                return item.parentID == $scope.search.fieldID;
            });
            if ($scope.ListCategorySearch.length > 0) {
                $scope.search.categoryID = $scope.ListCategorySearch[0].categoryID;
            }
        }

        function _loadData() {
            $scope.IsFilledDataCategory = 0;
            $scope.IsFilledDataField = 0;

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

                    $scope.IsFilledDataCategory = $scope.IsFilledDataCategory + 1;
                    _loadFitDataCategory();

                    $scope.IsInitSearch = $scope.IsInitSearch + 1;
                    if ($scope.IsInitSearch == 2) {
                        _initSearch();
                    }
                },
                function (error) {
                    $scope.ListCategory = null;
                    alert("Không thể lấy danh sách loại sách.");
                }
            );
            fieldService.GetAllCategories().then(
                function (response) {
                    $scope.ListField = response.data;
                    $scope.IsFilledDataField = $scope.IsFilledDataField + 1;
                    _loadFitDataField();

                    $scope.IsInitSearch = $scope.IsInitSearch + 1;
                    if ($scope.IsInitSearch == 2) {
                        _initSearch();
                    }
                },
                function (error) {
                    $scope.ListField = null;
                    alert("Không thể lấy danh sách chuyên ngành.");
                }
            );
            bookService.GetAllBooks().then(
                function (response) {
                    $scope.GridListItem = response.data;
                    $scope.DataOrigin = response.data;
                    
                    $scope.IsFilledDataCategory = $scope.IsFilledDataCategory + 1;
                    _loadFitDataCategory();

                    _loadCombineDataAuthor();
                },
                function (error) {
                    $scope.GridListItem = null;
                    $scope.DataOrigin = null;
                    alert("Không thể lấy danh sách cuốn sách.");
                }
            );

        }

        function _search() {
            if ($scope.search.authorName == "") {
                if ($scope.search.bookName == "") {
                    $scope.GridListItem = $scope.DataOrigin.filter(function (book) {
                        return book.categoryID == $scope.search.categoryID;
                    });
                } else {
                    $scope.GridListItem = $scope.DataOrigin.filter(function (book) {
                        return book.categoryID == $scope.search.categoryID
                            && commonService.ContainText(book.bookName, $scope.search.bookName);
                    });
                }
            } else {
                if ($scope.search.bookName == "") {
                    $scope.GridListItem = $scope.DataOrigin.filter(function (book) {
                        return book.categoryID == $scope.search.categoryID
                            && commonService.ContainText(book.authorName, $scope.search.authorName);
                    });
                } else {
                    $scope.GridListItem = $scope.DataOrigin.filter(function (book) {
                        return book.categoryID == $scope.search.categoryID
                            && commonService.ContainText(book.bookName, $scope.search.bookName)
                            && commonService.ContainText(book.authorName, $scope.search.authorName);
                    });
                }
            }
            
        }

        // assign categoryName to book
        function _loadFitDataCategory() {
            if ($scope.IsFilledDataCategory == 2) {
                $scope.DataOrigin.forEach(function (book) {
                    var category = $scope.ListCategory.filter(function (cate) {
                        return cate.categoryID == book.categoryID;
                    });
                    if (category != null && category.length > 0) {
                        book.categoryName = category[0].categoryName;
                        book.fieldID = category[0].parentID;
                    }
                });
                $scope.IsFilledDataField = $scope.IsFilledDataField + 1;
                _loadFitDataField();
            }
        }

        // assign fieldName to book
        function _loadFitDataField() {
            if ($scope.IsFilledDataField == 2) {
                $scope.DataOrigin.forEach(function (book) {
                    var fields = $scope.ListField.filter(function (item) {
                        return item.categoryID == book.fieldID;
                    });
                    if (fields != null && fields.length > 0) {
                        book.fieldName = fields[0].categoryName;
                    }
                });
            }
        }

        function _loadCombineDataAuthor() {
            $scope.DataOrigin.forEach(function (book) {
                var stListAuthor = book.listAuthor.map(function (item) {
                    return item.authorName;
                }).join();
                book.authorName = stListAuthor;
            });
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
            if (index == $scope.GridSelectedIndex) {
                $scope.GridSelectedIndex = -1;
            } else {
                $scope.GridSelectedIndex = index;
            }
        }

        function _editItem(item) {
            $ocLazyLoad.load({
                name: 'LibManageApp',
                files:
                [
                    'app/Sections/QT70/edit/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT70/edit/view.html",
                    controller: 'editBookController',
                    size: 'lg',
                    resolve: {
                        ListAuthor: function () {
                            return $scope.ListAuthor;
                        },
                        ListCategory: function () {
                            return $scope.ListCategory;
                        },
                        BookObject: function () {
                            return item;
                        },
                    }
                });
            });
        }

        function _deleteItem(item, index) {

        }

        function _onEvent() {
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
                            $.notify("Thêm cuốn sách thành công.", 'success');
                        } else {
                            $.notify(res.messages, 'error');
                        }
                    },
                    function (error) {
                        $.notify("Xảy ra lỗi khi thêm cuốn sách.", 'error');
                    }
                );
            });

            // receive an event from modal and save data
            $scope.$on("EDIT_BOOK", function (event, dt) {

                delete dt.data.fieldID;
                delete dt.data.fieldName;

                bookService.SaveBook(dt.data).then(
                    function (res) {
                        if (res.status !== "error") {
                            _loadData();
                            $.notify("Sửa cuốn sách thành công.", 'success');
                        } else {
                            $.notify(res.messages, 'error');
                        }
                    },
                    function (error) {
                        $.notify("Xảy ra lỗi khi sửa cuốn sách.", 'error');
                    }
                );
            });
        }

        _onEvent();
    }
})();