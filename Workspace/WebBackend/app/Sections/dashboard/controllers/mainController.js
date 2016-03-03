'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
app.controller('MainCtrl', function ($scope, $position, authService) {

    //authService.checkLogin();

    $scope.line = {
        labels: ['Th 1', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'],
        series: ['Series A', 'Series B'],
        data: [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ],
        onClick: function (points, evt) {
            console.log(points, evt);
        }
    };

    $scope.bar = {
        labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        series: ['Series A', 'Series B'],

        data: [
           [65, 59, 80, 81, 56, 55, 40],
           [28, 48, 40, 19, 86, 27, 90]
        ]

    };

    $scope.donut = {
        labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
        data: [300, 500, 100]
    };

    $scope.pie = {
        labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
        data: [300, 500, 100]
    };
});