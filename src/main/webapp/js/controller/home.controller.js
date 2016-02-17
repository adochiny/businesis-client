(function () {
    'use strict';

    angular
        .module('eManager')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', 'AuthenticationService', '$rootScope', '$location', 'flash'];
    function HomeController(UserService, AuthenticationService, $rootScope, $location, flash) {
        var vm = this;
        vm.currentUser = $rootScope.globals.currentUser;

        // vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.createUser = createUser;

        vm.breadcrumbs = ["Home","User profile","User details"];

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
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

        function loadAllUsers() {
            UserService.GetAllUsers()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function createUser() {
            UserService.CreateUpdateUser(vm.user)
                .then(function () {
                    loadAllUsers();
                });
        }

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