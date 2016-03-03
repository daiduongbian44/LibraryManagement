'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('LibManageApp')
	.directive('timeline',function() {
    return {
        templateUrl: 'app/Sections/dashboard/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
