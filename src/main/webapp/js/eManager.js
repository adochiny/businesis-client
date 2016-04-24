(function () {
    'use strict';

    angular
        .module('eManager', ['ngRoute', 'ngCookies', 'smart-table','flash'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {

        // Note that we run everything on the localhost

        $routeProvider
            .when('/', {
                controller: 'LandingListBpsController',
                //templateUrl: 'templates/home/home.view.html',
                //templateUrl: 'templates/businesis/add.new.ass.bp.view.html',
                templateUrl: 'templates/businesis/landing.list.bps.view.html',
                controllerAs: 'vm'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'templates/login/login.view.html',
                controllerAs: 'vm'
            })

            // Add new Bp, Business and business user. ----------------------
            .when('/LandingBpList', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/landing.list.bps.view.html',
                controllerAs: 'vm'
            })
            .when('/addNewCompany', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/add.new.company.view.html',
                controllerAs: 'vm'
            })

            .when('/addNewCompanyUser', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/add.new.company.user.view.html',
                controllerAs: 'vm'
            })

            // Business Diagnosis ------------------------------------------------------------------------------------
            /*
             Governance
             Tax Compliance
             Labour
             Safety and Health
             Standards
             Broad Based Black Economic Empowerment (B-BBEE)
             Production
             Sales and Marketing
             Information Technology
             Financial Controls and Management
             Technical – Site Visit
             Intellectual Property
             Risk Management*/

            .when('/diagnoseCompany', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/company.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseGovernance', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/governance.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseCharacter', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/character.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseFinancial', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/financial.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseMarketing', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/marketing.view.html',
                controllerAs: 'vm'
            })

            // Add New Bp -----------------------------------------------------------------------
            .when('/addEditBp', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/add.new.bp.view.html',
                controllerAs: 'vm'
            })

            .when('/addEditAdmin', {
                controller: 'UserController',
                templateUrl: 'templates/businesis/add.new.admin.view.html',
                controllerAs: 'vm'
            })

            .when('/viewUserList', {
                controller: 'UserController',
                templateUrl: 'templates/user/user.list.html',
                controllerAs: 'vm'
            }).when('/viewUserDetails', {
                controller: 'UserController',
                templateUrl: 'templates/user/view.user.details.html',
                controllerAs: 'vm'
            }).when('/addEditUser', {
                controller: 'UserController',
                templateUrl: 'templates/user/add.edit.user.html',
                controllerAs: 'vm'
            })

            .when('/viewOrgList', {
                controller: 'OrgController',
                templateUrl: 'templates/organisation/org.list.html',
                controllerAs: 'vm'
            })
            .when('/addEditOrg', {
                controller: 'OrgController',
                templateUrl: 'templates/organisation/add.edit.org.html',
                controllerAs: 'vm'
            })

            .when('/viewWarehouseList', {
                controller: 'WarehouseController',
                templateUrl: 'templates/warehouse/warehouse.list.html',
                controllerAs: 'vm'
            })
            .when('/addEditWarehouse', {
                controller: 'WarehouseController',
                templateUrl: 'templates/warehouse/add.edit.warehouse.html',
                controllerAs: 'vm'
            })
            // Add Equipment.
            // Asset Type
            .when('/viewAssetTypeList', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/asset.type.list.html',
                controllerAs: 'vm'
            })
            .when('/addEditAssetType', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/add.edit.asset.type.html',
                controllerAs: 'vm'
            })

            // Asset Brand
            .when('/viewAssetBrandList', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/asset.brand.list.html',
                controllerAs: 'vm'
            })
            .when('/addEditAssetBrand', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/add.edit.asset.brand.html',
                controllerAs: 'vm'
            })

            // Asset Model
            .when('/viewAssetModelList', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/asset.model.list.html',
                controllerAs: 'vm'
            })
            .when('/addEditAssetModel', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/add.edit.asset.model.html',
                controllerAs: 'vm'
            })

            // Asset Code
            .when('/viewAssetCodeList', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/asset.code.list.html',
                controllerAs: 'vm'
            })
            .when('/addEditAssetCode', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/add.edit.asset.code.html',
                controllerAs: 'vm'
            })

            // Asset Software
            .when('/viewAssetSoftwareList', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/asset.software.list.html',
                controllerAs: 'vm'
            })
            .when('/addEditAssetSoftware', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/add.edit.asset.software.html',
                controllerAs: 'vm'
            })

            // Asset
            .when('/viewAssetList', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/asset.list.html',
                controllerAs: 'vm'
            })
            .when('/addEditAsset', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/add.edit.asset.html',
                controllerAs: 'vm'
            })
            .when('/viewAssetDetails', {
                controller: 'AssetController',
                templateUrl: 'templates/equipment/view.asset.details.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','$httpBackend'];
    function run($rootScope, $location, $cookieStore, $http) {

        // Set the template path for all instances
        // acuteSelectService.updateSetting("templatePath", "lib/acute");

        // ---------------------------MOCKS----------------------------------------------------------------------------------

       //$httpBackend.whenGET(/login\/.*/).passThrough();
       //$httpBackend.whenGET(/home\/.*/).passThrough();
       //$httpBackend.whenGET(/member\/.*/).passThrough();

       //$httpBackend
       //    .when('POST', 'http://localhost:8080/risk-rev/user-management/authenticate-username')
       //    .respond(user);






        // ---------------------------MOCKS----------------------------------------------------------------------------------

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();
