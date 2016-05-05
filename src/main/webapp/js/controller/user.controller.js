(function () {
    'use strict';

    angular
        .module('eManager').controller('UserController', UserController);

    UserController.$inject = ['UserService', 'SharedProperties','$location', '$rootScope','flash'];
    function UserController(UserService, SharedProperties, $location, $rootScope, flash) {
        var vm = this;
        vm.breadcrumbs = ["Home","Setup","Manage Users"];

        vm.currentUser = $rootScope.globals.currentUser;

        vm.user = SharedProperties.getUser();
        vm.allUsers = [];
        // vm.addEditUser = addEditUser;

        vm.addEditAdmin = addEditAdmin;
        vm.saveUser = saveUser;

        vm.allUserRoles = [];

        vm.navigateToPage = SharedProperties.navigateToPage;

        vm.tab = 1;

        (function initController() {
            //path will be /person/show/321/, and array looks like: ["","person","show","321",""]
            // var pId = $location.path().split("/")[3]||"Unknown";

            // reset register form
            loadCurrentUser();
            loadAllUsers();
            loadAllUserRoles();
        })();

        function loadCurrentUser() {
            vm.currentUser = $rootScope.globals.currentUser;
        }

        function loadAllUsers() {
            UserService.GetAllUsers()
                .then(function (users) {
                    vm.allUsers = users.data;
                });
        }

        function loadAllUserRoles() {
            UserService.GetAllUserRoles()
                .then(function (roles) {
                    vm.allUserRoles = roles.data;
                });
        }

        function addEditAdmin(pUserToEdit) {
            if (pUserToEdit) {
                SharedProperties.setUser(pUserToEdit);
            }
            $location.path('/addEditAdmin');
        }

        // function addEditUser(pUserToEdit) {
        //     if (pUserToEdit) {
        //         SharedProperties.setUser(pUserToEdit);
        //     }
        //     $location.path('/addEditUser');
        // }

        function saveUser() {
            vm.dataLoading = true;
            flash([ 'User', 'Saving user.' ]);
            // set user ref
            vm.user.userReference = $rootScope.globals.currentUser.userReference;

            console.log(vm.user);
            SharedProperties.setUser(vm.user);

            // set user role from the selected id
            if (vm.user.userRole) {
                var roleIdNum = parseInt(vm.user.userRole.roleId);
                vm.user.userRole = _.findWhere(vm.allUserRoles, {roleId:roleIdNum});;

                UserService.CreateUpdateUser(vm.user)
                    .then(function (response) {
                        if (response.success) {
                            loadAllUsers();
                            vm.dataLoading = false;
                            flash(['Saved user : ' + vm.user.username ]);
                            // $location.path('/');
                        } else {
                            // FlashService.Error(response.message);
                            vm.dataLoading = false;
                        }
                    });
            }

            $location.path('/');
        }

        vm.setTab = function (tabId) {
            SharedProperties.setUserDetailsTab(tabId);
        };

        vm.isSet = function (tabId) {
            return vm.tab === tabId;
        };


        vm.oneAtATime = true;

        vm.status = {
            firstOpen: true,
            secondOpen: false,
            thirdOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };

        // -----------------------------Date code -----------------------------------------------------------

        vm.opened = false;

        vm.today = function() {
            vm.dt = new Date();
        };
        vm.today();

        vm.clear = function () {
            vm.dt = null;
        };

        // Disable weekend selection
        vm.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        vm.toggleMin = function() {
            vm.minDate = vm.minDate ? null : new Date();
            // vm.minDate = new Date();
            // vm.minDate = vm.minDate.setDate(new Date() - 1000);
        };
        vm.toggleMin();

        vm.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
        };

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        vm.events =
            [
                {date: tomorrow,
                    status: 'full'},
                {date: afterTomorrow,
                    status: 'partially'}
            ];

        vm.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < vm.events.length; i++){
                    var currentDay = new Date(vm.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return vm.events[i].status;
                    }
                }
            }

            return '';
        };

// -----------------------------Date code -----------------------------------------------------------

    }

})();
