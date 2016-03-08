'use strict';

// Declare some dependency modules
var app = angular.module('LibManageApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'LocalStorageModule',
    'ngSanitize',
    'perfect_scrollbar',
    '720kb.tooltips',
    'ui.select2',
    'datatables', 'datatables.tabletools', 'datatables.bootstrap', 'datatables.scroller', 'datatables.fixedcolumns',
    'ngResource',
    'angularModalService',
    'selectionModel',
    'ngFileUpload',
]);

// Config Route for sidebar links
app.config([
    '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true
        });

        $urlRouterProvider.otherwise('/dashboard/home');

        $stateProvider.state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/Shared/DashboardLayout.html',
            data: { requireLogin: true },
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'LibManageApp',
                        files: [
                            'app/Sections/dashboard/directives/header/header.js',
                            'app/Sections/dashboard/directives/header/header-notification/header-notification.js',
                            'app/Sections/dashboard/directives/sidebar/sidebar.js',
                            'app/Sections/dashboard/directives/sidebar/sidebar-search/sidebar-search.js'
                        ]
                    }), $ocLazyLoad.load({
                        name: 'toggle-switch',
                        files: [
                            "bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                            "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                        ]
                    }), $ocLazyLoad.load({
                        name: 'ngAnimate',
                        files: ['bower_components/angular-animate/angular-animate.js']
                    });
                    $ocLazyLoad.load({
                        name: 'ngCookies',
                        files: ['bower_components/angular-cookies/angular-cookies.js']
                    });
                    $ocLazyLoad.load({
                        name: 'ngResource',
                        files: ['bower_components/angular-resource/angular-resource.js']
                    });
                    $ocLazyLoad.load({
                        name: 'ngSanitize',
                        files: ['bower_components/angular-sanitize/angular-sanitize.js']
                    });
                    $ocLazyLoad.load({
                        name: 'ngTouch',
                        files: ['bower_components/angular-touch/angular-touch.js']
                    });

                }
            }
        }).state('dashboard.home', {
            url: '/home',
            controller: 'MainCtrl',
            templateUrl: 'app/Sections/dashboard/views/home.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'LibManageApp',
                        files: [
                            'app/Sections/dashboard/controllers/mainController.js',
                            'app/Sections/dashboard/directives/timeline/timeline.js',
                            'app/Sections/dashboard/directives/notifications/notifications.js',
                            'app/Sections/dashboard/directives/stats/stats.js'
                        ]
                    }), $ocLazyLoad.load({
                        name: 'chart.js',
                        files: [
                            'bower_components/angular-chart.js/angular-chart.min.js',
                            'bower_components/angular-chart.js/angular-chart.css'
                        ]
                    });
                }
            }
        }).state('signup', {
            templateUrl: 'app/Sections/authentication/signup/signup.html',
            url: '/signup',
            controller: 'signupController',
            data: { requireLogin: false },
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'LibManageApp',
                        files: [
                            'app/Sections/authentication/signup/signupController.js',
                            'app/Sections/authentication/signup/signupService.js'
                        ]
                    });
                }
            }
        }).state('login', {
            templateUrl: 'app/Sections/authentication/login/login.html',
            url: '/login',
            controller: 'loginController',
            data: { requireLogin: false },
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'LibManageApp',
                        files: [
                            'app/Sections/authentication/login/loginController.js'
                        ]
                    });
                }
            }
        }).state('dashboard.QT10', {
            templateUrl: 'app/Sections/QT10/view.html',
            url: '/QT10',
            controller: 'fieldController',
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'LibManageApp',
                        files: [
                            'app/Sections/QT10/fieldController.js',
                            'app/Sections/QT10/fieldService.js'
                        ]
                    });
                }
            }
        }).state('dashboard.QT30', {
            templateUrl: 'app/Sections/QT30/view.html',
            url: '/QT30',
            controller: 'categoryController',
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'LibManageApp',
                        files: [
                            'app/Sections/QT30/categoryController.js',
                            'app/Sections/QT30/categoryService.js',
                            'app/Sections/QT10/fieldService.js'
                        ]
                    });
                }
            }
        }).state('dashboard.QT50', {
            templateUrl: 'app/Sections/QT50/view.html',
            url: '/QT50',
            controller: 'authorController',
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'LibManageApp',
                        files: [
                            'app/Sections/QT50/authorController.js',
                            'app/Sections/QT50/authorService.js'
                        ]
                    });
                }
            }
        }).state('dashboard.QT70', {
            templateUrl: 'app/Sections/QT70/view.html',
            url: '/QT70'
        }).state('dashboard.QT90', {
            templateUrl: 'app/Sections/QT90/view.html',
            url: '/QT90'
        }).state('dashboard.QT110', {
            templateUrl: 'app/Sections/QT110/view.html',
            url: '/QT110'
        }).state('dashboard.QT130', {
            templateUrl: 'app/Sections/QT130/view.html',
            url: '/QT130'
        }).state('dashboard.QT150', {
            templateUrl: 'app/Sections/QT150/view.html',
            url: '/QT150'
        }).state('dashboard.QT170', {
            templateUrl: 'app/Sections/QT170/view.html',
            url: '/QT170'
        });
    }]);

// Declare some constants for whole app
// This is uri of our Api Restful service
var serviceBase = "http://localhost:4668/";

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase
});

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
}]);

app.run([
    'authService', function (authService) {
        authService.FillData();
    }]);

app.run(['$rootScope', 'authService', '$state', function ($rootScope, authService, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        // Do something when $state changed
        if (authService.authentication.isAuth)
            return;

        var requireLogin = toState.data.requireLogin;
        if (requireLogin == 'undefined') {
            requireLogin = false;
        }
        if (requireLogin) {
            event.preventDefault();
            $state.transitionTo('login');
        }
    });
}]);


//app.run(function ($rootScope, $templateCache) {
//    $rootScope.$on('$viewContentLoaded', function () {
//        $templateCache.removeAll();
//    });
//});

//
//Set option for all Datatables
//
app.run(function (DTDefaultOptions) {
    DTDefaultOptions.setLanguage({
        "sEmptyTable": "Dữ liệu trống!",
        "sInfo": "Hiển thị từ bản ghi thứ _START_ đến _END_ trong tổng số _TOTAL_ bản ghi.",
        "sInfoEmpty": "Hiển thị từ bản ghi thứ 0 đến 0 trong tổng số 0 bản ghi.",
        "sInfoFiltered": "(Lọc từ tổng số _MAX_ bản ghi.)",
        "sLengthMenu": "Hiển thị: _MENU_ bản ghi",
        "sLoadingRecords": "Đang tải dữ liệu...",
        "sProcessing": "Đang xử lý...",
        "sSearch": "Tìm nhanh: ",
        "sZeroRecords": "Không có bản ghi nào được tìm thấy!",
        "oPaginate": {
            "sFirst": "Đầu",
            "sLast": "Cuối",
            "sNext": "Sau",
            "sPrevious": "Trước"
        },
    });
});
app.factory('DTLoadingTemplate', dtLoadingTemplate);
function dtLoadingTemplate() {
    return {
        html: '<img src="content/images/loading.gif">'
    };
}
