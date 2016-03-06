(function () {
    'use strict'
    angular.module('LibManageApp').controller('editAuthorController', editAuthorController);

    editAuthorController.$inject = ['$scope', '$rootScope', '$location', 'AuthorObject', 'ngAuthSettings', '$ocLazyLoad', '$modal', '$modalInstance', 'Upload'];

    function editAuthorController($scope, $rootScope, $location, AuthorObject, ngAuthSettings, $ocLazyLoad, $modal, $modalInstance, Upload) {
        
        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;

        var _author = {
            ImageURL: "",
            AuthorName: "",
            AuthorID: 0
        };

        console.log(AuthorObject);

        $scope.author = {
            AuthorName: AuthorObject.authorName,
            ImageURL: AuthorObject.imageURL
        }

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');
        }

        function _fnSave() {
            if($scope.form.authorname.$valid) {
                if ($scope.form.file.$valid && $scope.fileImage) {
                    Upload.upload({
                        url: 'api/upload/image',
                        data: { file: $scope.fileImage }
                    }).then(function (resp) {
                        //console.log(resp); resp.data.data (link image)

                        _author.ImageURL = resp.data.data;
                        _author.AuthorName = $scope.author.AuthorName;
                        _author.AuthorID = AuthorObject.authorID;

                        // broadcast data to save
                        $rootScope.$broadcast("EDIT_AUTHOR", { data: _author });

                        _fnCloseModal();

                    }, function (resp) {
                        alert("Xảy ra lỗi trong quá trình upload ảnh.");
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    });
                } else {
                    _author.ImageURL = AuthorObject.imageURL;
                    _author.AuthorName = $scope.author.AuthorName;
                    _author.AuthorID = AuthorObject.authorID;

                    // broadcast data to save
                    $rootScope.$broadcast("EDIT_AUTHOR", { data: _author });

                    _fnCloseModal();
                }
            }
            
        }
    }
})();