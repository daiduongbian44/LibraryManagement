(function () {
    'use strict'
    angular.module('LibManageApp').controller('authorController', authorController);

    authorController.$inject = ['$scope', '$location', 'commonService','ngAuthSettings', 'authorService', '$ocLazyLoad', '$modal', 'DTOptionsBuilder'];

    function authorController($scope, $location, commonService, ngAuthSettings, authorService, $ocLazyLoad, $modal, DTOptionsBuilder) {
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
        $scope.DataOrigin = null;
        $scope.msgAuthorName = "";

        function _initSearch() {
            $scope.search = {
                AuthorName: ""
            };
            $scope.GridListItem = $scope.DataOrigin;
            $scope.msgAuthorName = "";
        }

        function _loadData() {
            $scope.GridListItem = null;
            authorService.GetAllAuthors().then(
                function (response) {
                    $scope.GridListItem = response.data;
                    $scope.DataOrigin = response.data;
                },
                function (error) {
                    $scope.GridListItem = null;
                    $scope.DataOrigin = null;
                }
            );
        }

        function _searchAuthor() {
            $scope.msgAuthorName = "";
            if ($scope.search.AuthorName == "") {
                $scope.msgAuthorName = "Nhập tên tác giả";
                return;
            }
            $scope.GridListItem = $scope.DataOrigin.filter(function (item) {
                return commonService.ContainText(item.authorName, $scope.search.AuthorName);
            });
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
                    'app/Sections/QT50/edit/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT50/edit/view.html",
                    controller: 'editAuthorController',
                    size: "lg",
                    resolve: {
                        AuthorObject: function () {
                            return item;
                        }
                    }
                });
            });
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
                    if (res.status !== "error") {
                        _loadData();
                        alert("Thêm tác giả thành công.");
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra lỗi khi thêm tác giả.");
                }
            );
        });
        
        // receive an event from modal and save author
        $scope.$on("EDIT_AUTHOR", function (event, dt) {
            //console.log(dt);
            authorService.SaveAuthor(dt.data).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        alert("Sửa tác giả thành công.");
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra lỗi khi sửa tác giả.");
                }
            );
        });

    }
})();