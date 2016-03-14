(function () {
    'use strict'

    angular.module('LibManageApp').factory('commonService', commonService);

    commonService.$inject = ['$q', '$http'];

    function commonService($q, $http) {

        var Factory = {
            ContainText: _containText,
        };
        return Factory;

        // check ignore case
        function _containText(textOrigin, textSearch) {
            if (textOrigin != null) {
                var t1 = textOrigin.toLowerCase();
                var t2 = textSearch.toLowerCase();

                if (t1.indexOf(t2) > -1) {
                    return true;
                }
            }
            return false;
        }
        
    }


})();