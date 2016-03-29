(function () {
    'use strict'

    angular.module('LibManageApp').factory('commonService', commonService);

    commonService.$inject = ['$q', '$http'];

    function commonService($q, $http) {

        var Factory = {
            ContainText: _containText,
            GetActive: 1,
            GetDeActive: 2,
            GetActiveMember: 3,
            GetDeActiveMember: 2,
            GetBanMember: 5,
            GetRestoreMember: 4
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