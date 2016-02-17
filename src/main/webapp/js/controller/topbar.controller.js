(function () {
    'use strict';

    angular
        .module('eManager')
        .controller('TopBarController', TopBarController);

    TopBarController.$inject = ['AuthenticationService', '$location', '$rootScope'];
    function TopBarController(AuthenticationService, $location, $rootScope) {
        var vm = this;
        vm.currentUser = $rootScope.globals.currentUser;

        (function initController() {
            // reset register form
            vm.currentUser = $rootScope.globals.currentUser;
        })();

        vm.logout = function() {
            AuthenticationService.ClearCredentials(vm.currentUser);
            vm.currentUser = null;
            $location.path('/login');
        };
    }
})();
