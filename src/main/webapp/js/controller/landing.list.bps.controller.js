(function () {
    'use strict';

    angular
        .module('eManager')
        .controller('LandingListBpsController', LandingListBpsController);

    LandingListBpsController.$inject = ['UserService', 'BpService', 'AuthenticationService', '$rootScope', '$location','SharedProperties', 'flash'];
    function LandingListBpsController(UserService, BpService, AuthenticationService, $rootScope, $location, SharedProperties, flash) {
        var vm = this;
        vm.currentUser = $rootScope.globals.currentUser;

        // vm.user = null;
        // vm.allUsers = [];
        // vm.deleteUser = deleteUser;

        vm.bpList = [];
        vm.bp = SharedProperties.getBp();
        vm.addEditBp = addEditBp;

        // Company details.
        vm.company = SharedProperties.getCompany();
        vm.addNewCompany = addNewCompany;
        vm.saveCompany = saveCompany;

        // Company User details.
        vm.companyUser = SharedProperties.getCompanyUser();
        vm.addEditCompanyUser = addEditCompanyUser;
        vm.saveCompanyUser = saveCompanyUser;



        vm.breadcrumbs = ["Home","User profile","User details"];

        (function initController() {
            loadCurrentUser();
            // loadAllUsers();
             loadAllBps();
        })();

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


//----- Create update new bp ---------------------------------------------------------------
        /*function addEditBp(bp) {
            BpService.AddUpdateCompany(bp)
                .then(function () {
                    // loadAllUsers();
                });
        }*/


        function addEditBp(value) {
            SharedProperties.setBp(value);
            $location.path('/addEditBp');
        }

        function saveBp() {
            vm.dataLoading = true;
            /* Do the actual saving here */
            // store in shared props
            console.log(SharedProperties.getBp());
            SharedProperties.setBp(vm.bp);

            BpService.SaveBp(vm.bp);
           /* AssetService.GetAllAssetTypes()
                .then(function (assetTypes) {
                    vm.allAssetTypes = assetTypes.data;
                });*/

            BpService.GetAllBps()
                .then(function (bps) {
                    vm.bpList = bps.data;
                });

            flash(['Saved Bp : ' + vm.bp ]);
            vm.dataLoading = false;
        }

//----- Create update new company ---------------------------------------------------------------
        function addNewCompany(bp) {
            SharedProperties.setBp(bp);
            // vm.bp = bp;
            $location.path('/addNewCompany');
            // vm.navigateToPage('addNewCompany')
        }

        function saveCompany() {
            vm.dataLoading = true;
            // Do the actual saving here
            // store in shared props
            console.log(vm.company);
            SharedProperties.setCompany(vm.company);

            // no send stuff to backend
            /*BusinesisService.CreateUpdateCompany(vm.company);
            BusinesisService.GetAllAssetTypes()
                .then(function (assetTypes) {
                    vm.allAssetTypes = assetTypes.data;
                });*/
            flash(['Saved Company : ' + vm.company ]);

            BpService.SaveCompany(vm.company)
                .then(function () {
                    // loadAllUsers();
                    $location.path('/addNewCompanyUser');
                    vm.dataLoading = false;
                });
        }


//----- Create update new company user ---------------------------------------------------------------
        function addEditCompanyUser() {
            SharedProperties.setAssetType(vm.companyUser);
            $location.path('/addNewCompanyUser');
        }

        function saveCompanyUser() {
            vm.dataLoading = true;
            // todo: add company to company user before saving
            console.log(vm.companyUser);
            SharedProperties.setCompanyUser(vm.companyUser);

           /*
           AssetService.CreateUpdateAssetType(vm.assetType);
           AssetService.GetAllAssetTypes()
                .then(function (assetTypes) {
                    vm.allAssetTypes = assetTypes.data;
                });*/

            BpService.saveCompanyUser(vm.companyUser)
                .then(function () {
                    // loadAllUsers();
                    $location.path('/');
                    vm.dataLoading = false;
                });
            flash(['Saved companyUser : ' + vm.companyUser ]);
            vm.dataLoading = false;
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