(function () {
    'use strict';

    angular
        .module('eManager')
        .controller('LandingListBpsController', LandingListBpsController);

    LandingListBpsController.$inject = ['UserService', 'BpService', 'AuthenticationService', '$rootScope', '$location', 'flash'];
    function LandingListBpsController(UserService, BpService, AuthenticationService, $rootScope, $location, flash) {
        var vm = this;
        vm.currentUser = $rootScope.globals.currentUser;

        // vm.user = null;
        vm.bpList = [];
        vm.bp = {};
        vm.company = {};
        // vm.allUsers = [];
        // vm.deleteUser = deleteUser;
        vm.addEditBp = addEditBp;
        vm.addNewCompany = addNewCompany;
        vm.addEditCompany = addEditCompany;

        vm.breadcrumbs = ["Home","User profile","User details"];

        initController();

        function initController() {
            loadCurrentUser();
            // loadAllUsers();
             loadAllBps();
        }

        vm.navigateToPage = function (path){
            $location.path('/' + path);
        };

        function loadCurrentUser() {
           /* UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });*/
            // vm.user = $rootScope.globals.currentUser;
            vm.currentUser = $rootScope.globals.currentUser;
        }

        function loadAllBps() {
            BpService.GetAllBps()
                .then(function (bps) {
                    vm.bpList = bps.data;
                });
        }

        function addEditBp(bp) {
            BpService.AddUpdateCompany(bp)
                .then(function () {
                    // loadAllUsers();
                });
        }

        function addNewCompany(bp) {
           vm.bp = bp;
           //$location.path('#/addNewCompany');
           vm.navigateToPage('addNewCompany')
        }

        function addEditCompany() {
            BpService.AddUpdateCompany(vm.company)
                .then(function () {
                    // loadAllUsers();
                    $location.path('/addNewCompanyUser');
                });
        }






        // --------------------------------------Old User stuff -----------------------------------------------------------------------

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        vm.logout = function() {
            AuthenticationService.ClearCredentials(vm.currentUser);
            $rootScope.globals.currentUser = null;
            vm.currentUser = null;
            flash('User logged out, thanks for your time.');
            $location.path('/login');
        };
    }

})();