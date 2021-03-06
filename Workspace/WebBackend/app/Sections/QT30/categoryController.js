﻿(function () {
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
        $scope.msgCategoryName = "";
        $scope.dataFinish = 0;
        $scope.changeStatusActive = changeStatusActive;
        $scope.changeStatusDeActive = changeStatusDeActive;

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
            //$scope.GridListItem = null;
            //$scope.DataOrigin = null;
            $scope.dataFinish = 0;

            categoryService.GetAllCategories().then(
                function (response) {
                    $scope.dataFinish = $scope.dataFinish + 1;
                    $scope.GridListItem = response.data;
                    $scope.DataOrigin = response.data;
                    _loadFillField();
                },
                function (error) {
                    $scope.GridListItem = null;
                    $scope.DataOrigin = null;
                }
            );

            fieldService.GetAllCategories().then(
                function (response) {
                    $scope.dataFinish = $scope.dataFinish + 1;
                    _listField = response.data;
                    _loadFillField();
                    $scope.ListField = _listField;
                    if (_listField.length > 0) {
                        $scope.search.FieldID = _listField[0].categoryID;
                    }
                },
                function (error) {
                    _listField = null;
                }
            );
        }

        function _loadFillField() {
            if ($scope.dataFinish === 2) {
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

        function changeStatusActive(item, index) {
            item.statusTypeID = commonService.GetActive;
            categoryService.ChangeStatus(item).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        $.notify("Đổi trạng thái thành công.", 'success');
                    } else {
                        $.notify(res.messages, 'error');
                    }
                },
                function (error) {
                    $.notify("Xảy ra lỗi khi đổi trạng thái.", 'error');
                }
            );
        }
        function changeStatusDeActive(item, index) {
            item.statusTypeID = commonService.GetDeActive;
            categoryService.ChangeStatus(item).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        $.notify("Đổi trạng thái thành công.", 'success');
                    } else {
                        $.notify(res.messages, 'error');
                    }
                },
                function (error) {
                    $.notify("Xảy ra lỗi khi đổi trạng thái.", 'error');
                }
            );
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
                        $.notify("Thêm loại sách thành công.", 'success');
                    } else {
                        $.notify(res.messages, 'error');
                    }
                },
                function (error) {
                    $.notify("Xảy ra lỗi khi thêm loại sách.", 'error');
                }
            );
        });

        // receive an event from modal and save Category
        $scope.$on("EDIT_SUBJECT", function (event, dt) {
            categoryService.SaveCategory(dt.data).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        $.notify("Sửa loại sách thành công.", 'success');
                    } else {
                        $.notify(res.messages, 'error');
                    }
                },
                function (error) {
                    $.notify("Xảy ra lỗi khi sửa loại sách.", 'error');
                }
            );
        });

    }
})();