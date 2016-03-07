(function () {
    'use strict'
    angular.module('LibManageApp').controller('fieldController', fieldController);

    fieldController.$inject = ['$scope', '$location', 'ngAuthSettings', 'fieldService', '$ocLazyLoad', '$modal', 'DTOptionsBuilder'];

    function fieldController($scope, $location, ngAuthSettings, fieldService, $ocLazyLoad, $modal, DTOptionsBuilder) {

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
        $scope.GridFnDelete = _deleteItem;

        function _initSearch() {
            $scope.search = {
                CategoryName: ""
            };
        }

        function _loadData() {
            $scope.GridListItem = null;
            fieldService.GetAllCategorys().then(
                function (response) {
                    //console.log(response.data);
                    $scope.GridListItem = response.data;
                },
                function (error) {
                    $scope.GridListItem = null;
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
                    'app/Sections/QT10/create/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT10/create/view.html",
                    controller: 'createFieldController',
                    size: "sm",
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
                    'app/Sections/QT10/edit/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT10/edit/view.html",
                    controller: 'editFieldController',
                    size: "sm",
                    resolve: {
                        FieldObject: function () {
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

        // receive an event from modal and save data
        $scope.$on("CREATE_FIELD", function (event, dt) {
            fieldService.SaveField(dt.data).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        alert("Thêm chuyên ngành thành công.");
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra lỗi khi thêm chuyên ngành.");
                }
            );
        });

        // receive an event from modal and save data
        $scope.$on("EDIT_FIELD", function (event, dt) {
            fieldService.SaveField(dt.data).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        alert("Sửa chuyên ngành thành công.");
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra lỗi khi sửa chuyên ngành.");
                }
            );
        });
    }
})();