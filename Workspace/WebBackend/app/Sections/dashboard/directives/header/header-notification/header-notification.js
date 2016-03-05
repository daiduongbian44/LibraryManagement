'use strict';

/**
 * @ngdoc directive
 * @description
 * # adminPosHeader
 */
app.directive('headerNotification', ['authService', 'localStorageService', function (authService, localStorageService) {
		return {
		    templateUrl: 'app/Sections/dashboard/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller: function ($scope) {
                $scope.logOut = authService.LogOut;
                var authData = localStorageService.get('authorizationData');

                //console.log(authData);

                $scope.WorkDate = new Date();

                if (authData) {
                    $scope.UserName = authData.UserName;
                }
            }
    	}
	}]);

