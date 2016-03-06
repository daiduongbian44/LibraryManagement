(function () {
    'use strict'
    angular.module('LibManageApp').controller('createAuthorController', createAuthorController);

    createAuthorController.$inject = ['$scope', '$rootScope', '$location', 'ngAuthSettings', '$ocLazyLoad', '$modal', '$modalInstance', 'Upload'];

    function createAuthorController($scope, $rootScope, $location, ngAuthSettings, $ocLazyLoad, $modal, $modalInstance, Upload) {
        
        $scope.FnCloseModal = _fnCloseModal;
        $scope.FnSave = _fnSave;

        var _author = {
            ImageURL: "",
            AuthorName: "",
            AuthorID: 0
        };

        function _fnCloseModal() {
            $modalInstance.dismiss('cancel');

        }

        function _fnSave() {
            if($scope.form.file.$valid 
                && $scope.form.authorname.$valid 
                && $scope.fileImage) {

                Upload.upload({
                    url: 'api/upload/image',
                    data: { file: $scope.fileImage }
                }).then(function (resp) {
                    //console.log(resp); resp.data.data (link image)

                    _author.ImageURL = resp.data.data;
                    _author.AuthorName = $scope.author.AuthorName;

                    // broadcast data to save
                    $rootScope.$broadcast("CREATE_AUTHOR", { data: _author });

                    _fnCloseModal();

                }, function (resp) {
                    alert("Xảy ra lỗi trong quá trình upload ảnh.");
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                });
            }
        }
    }
})();