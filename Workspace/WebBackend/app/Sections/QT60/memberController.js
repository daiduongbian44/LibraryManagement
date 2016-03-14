(function () {
    'use strict'
    angular.module('LibManageApp').controller('memberController', memberController);

    memberController.$inject = ['$scope', '$location', 'commonService', 'ngAuthSettings', 'memberService', '$ocLazyLoad', '$modal', 'DTOptionsBuilder'];

    function memberController($scope, $location, commonService, ngAuthSettings, memberService, $ocLazyLoad, $modal, DTOptionsBuilder) {
        $scope.boxsearch = {
            open: true,
        };

        _initSearch();
        _loadData();

        $scope.FnClear = _initSearch;
        $scope.FnSearch = _searchUser;
        $scope.GridFnCreate = _createUser;
        $scope.GridSelectedIndex = -1;
        $scope.GridFnClickRow = _clickRow;
        $scope.GridFnEdit = _editItem;
        $scope.GridFnStop = _stopItem;
        $scope.GridFnRestore = _restoreItem;
        $scope.DataOrigin = null;
        $scope.msgUserName = "";

        var _listRole;

        function _initSearch() {
            $scope.search = {
                UserName: ""
            };
            $scope.GridListItem = $scope.DataOrigin;
            $scope.msgUserName = "";
        }

        function _loadData() {
            $scope.GridListItem = null;
            memberService.GetAllUsers().then(
                function (response) {
                    $scope.GridListItem = response.data;
                    $scope.DataOrigin = response.data;
                },
                function (error) {
                    $scope.GridListItem = null;
                }
            );

            memberService.GetAllRoles().then(
                function (response) {
                    _listRole = response.data;
                },
                function (error) {
                    _listRole = null;
                }
            );
        }

        function _searchUser() {
            $scope.msgUserName = "";
            if ($scope.search.UserName == "") {
                $scope.msgUserName = "Nhập tên người dùng";
                return;
            }
            $scope.GridListItem = $scope.DataOrigin.filter(function (item) {
                return commonService.ContainText(item.userName, $scope.search.UserName);
            });
        }

        function _createUser() {
            $ocLazyLoad.load({
                name: 'LibManageApp',
                files:
                [
                    'app/Sections/QT60/create/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT60/create/view.html",
                    controller: 'createUserController',
                    resolve: {
                        ListRole: function () {
                            return _listRole;
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
                    'app/Sections/QT60/edit/controller.js',
                ]
            }).then(function () {
                $modal.open({
                    templateUrl: "app/Sections/QT60/edit/view.html",
                    controller: 'editUserController',
                    resolve: {
                        ListRole: function () {
                            return _listRole;
                        },
                        UserObject: function () {
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

        // receive an event from modal and save user
        $scope.$on("CREATE_USER", function (event, dt) {
            memberService.SaveUser(dt.data).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        alert("Thêm tài khoản thành công.");
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra lỗi khi thêm tài khoản.");
                }
            );
        });

        // receive an event from modal and save user
        $scope.$on("EDIT_USER", function (event, dt) {
            memberService.SaveUser(dt.data).then(
                function (res) {
                    if (res.status !== "error") {
                        _loadData();
                        alert("Sửa thông tin tài khoản thành công.");
                    } else {
                        alert(res.messages);
                    }
                },
                function (error) {
                    alert("Xảy ra lỗi khi sửa thông tin tài khoản.");
                }
            );
        });

    }
})();