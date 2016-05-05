(function () {
    'use strict';

    angular
        .module('eManager')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location','$window', 'AuthenticationService','BpService','SharedProperties', '$rootScope', '$route', 'flash'];
    function LoginController($location, $window, AuthenticationService, BpService, SharedProperties, $rootScope, $route, flash) {
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
                    flash('User logged in, can now access system functionality.');
                    //
                    $route.reload();
                    $window.location.reload();

                    // Todo: depending on the userType either open home or company diagnosis.
                    if (response.user.userType == 'company_user') {
                        // load the company into the cache and open dignose company page.
                        if (response.user.parentId) {
                            BpService.GetBpById(response.user.parentId)
                                .then(function (comp) {
                                    SharedProperties.setCompany(comp.data);
                                });
                        }
                        $location.path('/diagnoseCompany');
                    } else {
                        $location.path('/');
                    }

                } else {
                    vm.error = true;
                    vm.errorMessage = 'There was an error user not logged in, if this persist contact Administrator.';
                    flash('There was an error user not logged in, if this persist contact Administrator.');
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
