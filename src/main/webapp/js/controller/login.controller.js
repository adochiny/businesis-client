(function () {
    'use strict';

    angular
        .module('eManager')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location','$window', 'AuthenticationService', '$rootScope', '$route', 'flash'];
    function LoginController($location, $window, AuthenticationService, $rootScope, $route, flash) {
        var vm = this;

        vm.user = null;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(response.user, vm.password);
                    //
                    vm.user = $rootScope.globals.currentUser;
                    flash('User logged in, can no access system functionality.');
                    //
                    $route.reload();
                    $window.location.reload();
                    $location.path('/');

                } else {
                    flash('There was an error user not logged in, if this persist contact Administrator');
                    vm.dataLoading = false;
                }
            });
        }

        vm.logout = function() {
            vm.user = null;
            AuthenticationService.ClearCredentials();
            flash('User logged out, thanks for your time.');
            $location.path('/login');
        };


    }

})();
