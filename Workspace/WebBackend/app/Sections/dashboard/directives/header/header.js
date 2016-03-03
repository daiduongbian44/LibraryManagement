'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
app.directive('header', function () {
		return {
		    templateUrl: 'app/Sections/dashboard/directives/header/header.html',
            restrict: 'E',
            replace: true,
    	}
	});


