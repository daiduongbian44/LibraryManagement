'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('LibManageApp')
  .directive('sidebarSearch',function() {
    return {
      templateUrl: 'app/Sections/dashboard/directives/sidebar/sidebar-search/sidebar-search.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope, $state){
          //$scope.selectedMenu = 'home';
          $scope.go = function () {
              try{
                  $state.go('dashboard.' + $scope.address);
              }
              catch(ex) {
                  alert(ex.toString());
              }
          };

          $scope.keyPress = function (event) {
              if (event.which === 13) {
                  $scope.go();
                  event.preventDefault();
              }
          }
      }
    }
  });
