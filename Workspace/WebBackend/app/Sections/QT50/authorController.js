﻿(function () {
    'use strict'
    angular.module('LibManageApp').controller('authorController', authorController);

    authorController.$inject = ['$scope', '$location', 'ngAuthSettings', 'authorService', '$ocLazyLoad', '$modal', 'DTOptionsBuilder'];

    function authorController($scope, $location, ngAuthSettings, authorService, $ocLazyLoad, $modal, DTOptionsBuilder) {
        $scope.boxsearch = {
            open: true,
        };

        _initSearch();
        _loadData();

        $scope.FnClear = _initSearch;
        $scope.FnSearch = _searchAuthor;
        $scope.GridFnCreate = _createAuthor;
        $scope.GridSelectedIndex = -1;
        $scope.GridFnClickRow = _clickRow;
        $scope.GridFnEdit = _editItem;
        $scope.GridFnDelete = _deleteItem;
        
        function _initSearch() {
            $scope.search = {
                AuthorName: ""
            };
        }

        function _loadData() {
            $scope.GridListItem = null;
            authorService.GetAllAuthors().then(
                function (response) {
                    console.log(response.data);
                    $scope.GridListItem = response.data;
                },
                function (error) {
                    $scope.GridListItem = null;
                }
            );
        }

        function _searchAuthor() {

        }

        function _createAuthor() {
            $ocLazyLoad.load({
                name: 'LibManageApp',
                files:
                [
                    'app/Sections/QT50/create/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT50/create/view.html",
                    controller: 'createAuthorController',
                });
            });
        }

        function _clickRow(index) {
            GridSelectedIndex = index;
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

        // receive an event from modal and save author
        $scope.$on("CREATE_AUTHOR", function (event, dt) {
            //console.log(dt);
            authorService.SaveAuthor(dt.data).then(
                function (res) {
                    _loadData();
                    alert("Thêm tác giả thành công.");
                },
                function (error) {
                    alert("Xảy ra lỗi khi thêm tác giả.");
                }
            );
        });
    }
})();