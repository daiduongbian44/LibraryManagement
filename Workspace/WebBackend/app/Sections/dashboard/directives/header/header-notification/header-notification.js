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
                $scope.logOut = authService.logOut;
                var authData = localStorageService.get('authorizationData');
                $scope.WorkDate = new Date();

                if (authData) {
                    $scope.UserName = authData.userFullName;
                }
            }
    	}
	}]);

