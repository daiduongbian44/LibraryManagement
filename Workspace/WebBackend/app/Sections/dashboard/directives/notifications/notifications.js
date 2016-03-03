'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('LibManageApp')
	.directive('notifications',function(){
		return {
        templateUrl:'app/Sections/dashboard/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


