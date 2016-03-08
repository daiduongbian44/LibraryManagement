(function () {
    'use strict'
    angular.module('LibManageApp').controller('categoryController', categoryController);

    categoryController.$inject = ['$scope', '$location', 'ngAuthSettings', 'categoryService', 'fieldService', '$ocLazyLoad', '$modal', 'DTOptionsBuilder'];

    function categoryController($scope, $location, ngAuthSettings, categoryService, fieldService, $ocLazyLoad, $modal, DTOptionsBuilder) {
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
        
        var _listField;

        function _initSearch() {
            $scope.search = {
                CategoryName: ""
            };
        }

        function _loadData() {
            $scope.GridListItem = null;
            categoryService.GetAllCategories().then(
                function (response) {                    
                    $scope.GridListItem = response.data;
                },
                function (error) {
                    $scope.GridListItem = null;
                }
            );

            fieldService.GetAllCategorys().then(
                function (response) {
                    _listField = response.data;
                    console.log(response.data);
                },
                function (error) {
                    _listField = null;
                    //console.log(error);
                }
            );
        }

        function _searchCategory() {

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
                    size: "lg",
                    resolve: {
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
        $scope.$on("CREATE_CATEGORY", function (event, dt) {
            //console.log(dt);
            categoryService.SaveCategory(dt.data).then(
                function (res) {
                    _loadData();
                    alert("Thêm thể loại sách thành công.");
                },
                function (error) {
                    alert("Xảy ra lỗi khi thêm thể loại sách.");
                }
            );
        });

        // receive an event from modal and save Category
        $scope.$on("EDIT_CATEGORY", function (event, dt) {
            //console.log(dt);
            categoryService.SaveCategory(dt.data).then(
                function (res) {
                    _loadData();
                    alert("Thao tác thành công.");
                },
                function (error) {
                    alert("Xảy ra lỗi với thao tác này.");
                }
            );
        });

    }
})();