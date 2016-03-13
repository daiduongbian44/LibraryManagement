(function () {
    'use strict'
    angular.module('LibManageApp').controller('categoryController', categoryController);

    categoryController.$inject = ['$scope', '$location', 'commonService','ngAuthSettings', 'categoryService', 'fieldService', '$ocLazyLoad', '$modal', 'DTOptionsBuilder'];

    function categoryController($scope, $location, commonService, ngAuthSettings, categoryService, fieldService, $ocLazyLoad, $modal, DTOptionsBuilder) {
        $scope.boxsearch = {
            open: true,
        };

        _initSearch();
        _loadData();

        $scope.FnClear = _initSearch;
        $scope.FnSearch = _searchCategory;
        $scope.GridFnCreate = _createCategory;
        $scope.GridSelectedIndex = -1;
        $scope.GridFnClickRow = _clickRow;
        $scope.GridFnEdit = _editItem;
        $scope.GridFnStop = _stopItem;
        $scope.GridFnRestore = _restoreItem;
        $scope.msgCategoryName = "";
        $scope.dataFinish = false;

        var _listField;

        function _initSearch() {
            $scope.search = {
                CategoryName: ""
            };
            $scope.msgCategoryName = "";
            $scope.GridListItem = $scope.DataOrigin;
            if ($scope.ListField != null && $scope.ListField.length > 0) {
                $scope.search.FieldID = $scope.ListField[0].categoryID;
            }
        }

        function _loadData() {
            $scope.GridListItem = null;
            $scope.DataOrigin = null;
            $scope.dataFinish = false;

            categoryService.GetAllCategories().then(
                function (response) {                    
                    $scope.GridListItem = response.data;
                    $scope.DataOrigin = response.data;

                    _loadFillField();

                    $scope.dataFinish = true;
                },
                function (error) {
                    $scope.GridListItem = null;
                    $scope.DataOrigin = null;
                }
            );

            fieldService.GetAllCategorys().then(
                function (response) {
                    _listField = response.data;

                    _loadFillField();
                    $scope.ListField = _listField;
                    if (_listField.length > 0) {
                        $scope.search.FieldID = _listField[0].categoryID;
                    }

                    $scope.dataFinish = true;
                },
                function (error) {
                    _listField = null;
                }
            );
        }

        function _loadFillField() {
            if ($scope.dataFinish === true) {
                $scope.DataOrigin.forEach(function (item) {
                    var fieldData = _listField.filter(function (field) {
                        return field.categoryID == item.parentID;
                    });
                    if (fieldData != null && fieldData.length > 0) {
                        item.fieldName = fieldData[0].categoryName;
                        item.fieldID = fieldData[0].categoryID;
                    }
                });
                $scope.GridListItem = $scope.DataOrigin;
            }
        }

        function _searchCategory() {
            if ($scope.search.CategoryName === "") {
                $scope.msgCategoryName = "Nhập tên loại sách";
                return;
            }
            $scope.msgCategoryName = "";
            $scope.GridListItem = $scope.DataOrigin.filter(function (item) {
                return commonService.ContainText(item.categoryName, $scope.search.CategoryName)
                    && item.fieldID === $scope.search.FieldID;
            });
        }

        function _createCategory() {
            $ocLazyLoad.load({
                name: 'LibManageApp',
                files:
                [
                    'app/Sections/QT30/create/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT30/create/view.html",
                    controller: 'createCategoryController',
                    resolve: {
                        ListField: function () {
                            return _listField;
                        }
                    }
                });
            });
        }

        function _clickRow(index) {
            $scope.GridSelectedIndex = index;
        }

        function _editItem(item) {
            $ocLazyLoad.load({
                name: 'LibManageApp',
                files:
                [
                    'app/Sections/QT30/edit/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT30/edit/view.html",
                    controller: 'editCategoryController',
                    resolve: {
                        ListField: function () {
                            return _listField;
                        },
                        CategoryObject: function () {
                            return item;
                        }
                    }
                });
            });
        }

        function _stopItem(item, index) {

        }
        function _restoreItem(item, index) {

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

        // receive an event from modal and save Category
        $scope.$on("CREATE_SUBJECT", function (event, dt) {
            categoryService.SaveCategory(dt.data).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        alert("Thêm loại sách thành công.");
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra lỗi khi thêm loại sách.");
                }
            );
        });

        // receive an event from modal and save Category
        $scope.$on("EDIT_SUBJECT", function (event, dt) {
            categoryService.SaveCategory(dt.data).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        alert("Sửa loại sách thành công.");
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra lỗi khi sửa loại sách.");
                }
            );
        });

    }
})();