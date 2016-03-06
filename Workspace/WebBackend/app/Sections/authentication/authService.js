(function () {
    'use strict';

    angular.module('LibManageApp').factory('authService', authService);

    authService.$inject = ['$http', '$q', '$state', 'ngAuthSettings', 'localStorageService'];

    function authService($http, $q, $state, ngAuthSettings, localStorageService) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var _authentication = {
            isAuth: false,
            UserName: "",
            UserId: "",
        };

        var Factory = {
            Login: _login,
            LogOut: _logout,
            authentication: _authentication,
            FillData: _fillData
        };
        return Factory;

        // user.UserName, user.Password
        function _login(user) {
            var deferred = $q.defer();
            var url = serviceBase + "token";
            var userPost = {
                grant_type: 'password',
                username: user.username,
                password: user.password,
            }

            $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: userPost
            })
            .success(function (response) {
                deferred.resolve(response);

                localStorageService.set('authorizationData',
                {
                    token: response.access_token,
                    UserName: user.username,
                    UserId: ""
                });

                _fillData();

                //console.log(response);

                return response;
            })
            .error(function (errMessage, statusCode) {
                var result = { isSuccess: false, status: statusCode, message: errMessage };
                deferred.reject(result);

                _logout();

                return result;
            });

            return deferred.promise;
        }

        // logOut user
        function _logout() {
            localStorageService.remove('authorizationData');

            _fillData();

            $state.go('login');
        }

        function _fillData() {
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                _authentication.isAuth = true;
                _authentication.UserName = authData.UserName;
                _authentication.UserId = authData.UserId;
            } else {
                _authentication.isAuth = false;
                _authentication.UserName = "";
                _authentication.UserId = "";
            }
        }
    }
    
})();