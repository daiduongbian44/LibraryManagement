'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('LibManageApp')
  .directive('sidebar', ['$location', function () {
    return {
      templateUrl:'app/Sections/dashboard/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller: function ($scope) {

          $scope.selectedMenu = 'dashboard'; //
          $scope.listCollapes = [];

          $scope.check = function (x) {
              if ($scope.listCollapes.indexOf(x) != -1) {
                  $scope.listCollapes.splice($scope.listCollapes.indexOf(x), 1);
                  $scope.selectedMenu = 0;
              }
              else {
                  $scope.listCollapes.push(x);
                  $scope.selectedMenu = x;
              }
          }

          $scope.isCollapse = function (x) {
              return $scope.listCollapes.indexOf(x) == -1;
          }
        //$scope.check = function(x){
          
        //    if(x==$scope.collapseVar)
        //    $scope.collapseVar = 0;
        //    else
        //    $scope.collapseVar = x;
        //};
        
        //$scope.multiCheck = function(y){
          
        //    if(y==$scope.multiCollapseVar)
        //    $scope.multiCollapseVar = 0;
        //    else
        //    $scope.multiCollapseVar = y;
        //};
      }
    }
  }]);
