(function () {
    'use strict'
    angular.module('LibManageApp').controller('authorController', authorController);

    authorController.$inject = ['$scope', '$location', 'ngAuthSettings', 'authorService'];

    function authorController($scope, $location, ngAuthSettings, authorService) {
        $scope.boxsearch.open = true;

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
            .withOption('scrollX', 2000)
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
    }
})();