﻿(function () {
    'use strict'
    angular.module('LibManageApp').controller('fieldController', fieldController);

    fieldController.$inject = ['$scope', '$location', 'ngAuthSettings', 'commonService', 'fieldService', '$ocLazyLoad', '$modal', 'DTOptionsBuilder'];

    function fieldController($scope, $location, ngAuthSettings, commonService, fieldService, $ocLazyLoad, $modal, DTOptionsBuilder) {

        $scope.boxsearch = {
            open: true,
        };

        _initSearch();
        _loadData();

        $scope.FnClear = _initSearch;
        $scope.FnSearch = _searchBorrowBook;
        $scope.GridFnCreate = _createBorrowBook;
        $scope.GridSelectedIndex = -1;
        $scope.GridFnClickRow = _clickRow;
        $scope.GridFnEdit = _editItem;
        $scope.GridFnDelete = _deleteItem;

        $scope.DataOrigin = null;

        function _initSearch() {
            $scope.search = {
                CategoryName: ""
            };
            $scope.msgCategoryName = "";
            $scope.GridListItem = $scope.DataOrigin;
        }

        function _loadData() {
            //$scope.GridListItem = null;
            //fieldService.GetAllCategories().then(
            //    function (response) {
            //        //console.log(response.data);
            //        $scope.GridListItem = response.data;
            //        $scope.DataOrigin = response.data;
            //    },
            //    function (error) {
            //        $scope.GridListItem = null;
            //        $scope.DataOrigin = null;
            //    }
            //);
        }

        function _searchBorrowBook() {
            //if ($scope.search.CategoryName === "") {
            //    $scope.msgCategoryName = "Nhập tên chuyên ngành";
            //    return;
            //}
            //$scope.msgCategoryName = "";
            //$scope.GridListItem = [];
            //$scope.DataOrigin.forEach(function (item) {
            //    if (commonService.ContainText(item.categoryName, $scope.search.CategoryName)) {
            //        $scope.GridListItem.push(item);
            //    }
            //});
        }

        function _createBorrowBook() {
            $ocLazyLoad.load({
                name: 'LibManageApp',
                files:
                [
                    'app/Sections/QT90/create/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT90/create/view.html",
                    controller: 'orderBorrowCreateController',
                    size: "lg",
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
            //$ocLazyLoad.load({
            //    name: 'LibManageApp',
            //    files:
            //    [
            //        'app/Sections/QT10/edit/controller.js',
            //    ]
            //}).then(function () {
            //    $modal.open({
            //        templateUrl: "app/Sections/QT10/edit/view.html",
            //        controller: 'editFieldController',
            //        size: "sm",
            //        resolve: {
            //            FieldObject: function () {
            //                return item;
            //            }
            //        }
            //    });
            //});
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
        $scope.$on("CREATE_BORROWBOOK", function (event, dt) {
            //fieldService.SaveField(dt.data).then(
            //    function (res) {
            //        if (res.status !== "error") {
            //            _loadData();
            //            alert("Thêm chuyên ngành thành công.");
            //        } else {
            //            alert(res.messages);
            //        }
            //    },
            //    function (error) {
            //        alert("Xảy ra lỗi khi thêm chuyên ngành.");
            //    }
            //);
        });

        // receive an event from modal and save data
        $scope.$on("EDIT_BORROWBOOK", function (event, dt) {
            //fieldService.SaveField(dt.data).then(
            //    function (res) {
            //        if (res.status !== "error") {
            //            _loadData();
            //            alert("Sửa chuyên ngành thành công.");
            //        } else {
            //            alert(res.messages);
            //        }
            //    },
            //    function (error) {
            //        alert("Xảy ra lỗi khi sửa chuyên ngành.");
            //    }
            //);
        });
    }
})();