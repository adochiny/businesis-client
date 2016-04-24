(function () {
    'use strict';

    angular
        .module('eManager')
        .controller('DiagnosisController', DiagnosisController);

    DiagnosisController.$inject = ['UserService', 'BpService', 'AuthenticationService', '$rootScope', '$location', 'SharedProperties', 'flash'];
    function DiagnosisController(UserService, BpService, AuthenticationService, $rootScope, $location, SharedProperties, flash) {
        var vm = this;
        vm.currentUser = $rootScope.globals.currentUser;

        vm.company = SharedProperties.getCompany();
        vm.addEditCompany = addEditCompany;
        vm.saveCompany = saveCompany;

        vm.breadcrumbs = ["Home","User profile","User details"];

        (function initController() {
            // load company linked to this user.
            // loadAllUsers();
        })();

        vm.navigateToPage = function (path){
            $location.path('/' + path);
        };


        function addEditCompany(val) {
            SharedProperties.setCompany(val);
            $location.path('/diagnoseCompany');
        }

        function saveCompany() {
            vm.dataLoading = true;
            console.log(vm.company);
            SharedProperties.setCompany(vm.company);

            BpService.saveCompany(vm.company);
            //AssetService.GetAllAssetTypes()
            //    .then(function (assetTypes) {
            //        vm.allAssetTypes = assetTypes.data;
            //    });
            flash(['Saved Asset Type : ' + vm.assetType.assetTypeName ]);
            vm.dataLoading = false;
            $location.path('/login');
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