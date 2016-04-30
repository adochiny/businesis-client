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
                templateUrl: 'templates/businesis/bp.list.view.html',
                controllerAs: 'vm'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'templates/login/login.view.html',
                controllerAs: 'vm'
            })

            // Business partner. ---------------------------------------------------------------------------------------------
            .when('/bpList', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/bp.list.view.html',
                controllerAs: 'vm'
            })
            .when('/addEditBp', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/add.new.bp.view.html',
                controllerAs: 'vm'
            })
            // todo: the below one (LandingBpList) has to die.
            /* .when('/LandingBpList', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/old.landing.list.bps.view.html',
                controllerAs: 'vm'
            })*/
            // Business partner. ---------------------------------------------------------------------------------------------
            // System admin . ------------------------------------------------------------------------------------------------
            .when('/addEditAdmin', {
                controller: 'UserController',
                templateUrl: 'templates/businesis/add.new.admin.view.html',
                controllerAs: 'vm'
            })
            .when('/adminList', {
                controller: 'UserController',
                templateUrl: 'templates/businesis/admin.list.view.html',
                controllerAs: 'vm'
            })
            // System admin . ---------------------------------------------------------------------------------------------
            // Bp Company . ---------------------------------------------------------------------------------------------

            // Todo: the 2 below addNewCompany, addNewCompanyUser should probably be
            // removed as they should only be accessed via the Bp and company then user.
            .when('/companyList', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/company.list.view.html',
                controllerAs: 'vm'
            })
            .when('/addNewCompany', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/add.new.company.view.html',
                controllerAs: 'vm'
            })

            // Bp Company . ---------------------------------------------------------------------------------------------
            //  Business and business user. ---------------------------------------------------------------------------------------------
            .when('/addNewCompanyUser', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/add.new.company.user.view.html',
                controllerAs: 'vm'
            })

            // bp list for Pending/Diagnosed companies
            // this is coming from the menu.
            .when('/bpListPending', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/bp.list.view.html',
                controllerAs: 'vm'
            })
            .when('/bpListDiagnosed', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/bp.list.view.html',
                controllerAs: 'vm'
            })
            .when('/companyListPendingDiagnosed', {
                controller: 'LandingListBpsController',
                templateUrl: 'templates/businesis/company.list.view.html',
                controllerAs: 'vm'
            })
            //  Business user. ---------------------------------------------------------------------------------------------

            // Business Diagnosis --------------------------------------------------------------------------------------
            /*
             diagnoseGovernance
             diagnoseTaxCompliance
             diagnoseLabour
             diagnoseSafetyHealth
             diagnoseStandards
             diagnoseBBBEE Broad Based Black Economic Empowerment (B-BBEE)
             diagnoseProduction
             diagnoseSalesMarketing
             diagnoseInformationTechnology
             diagnoseFinancialControlsManagement
             diagnoseTechnicalSiteVisit
             diagnoseIntellectualProperty
             diagnoseRiskManagement
             */

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
            .when('/diagnoseTaxCompliance', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/tax.compliance.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseLabour', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/labour.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseSafetyHealth', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/safety.health.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseStandards', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/standards.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseBBBEE', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/bbbee.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseProduction', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/production.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseSalesMarketing', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/sales.marketing.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseInformationTechnology', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/information.technology.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseFinancialControlsManagement', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/financial.controls.management.view.html',
                controllerAs: 'vm'
            })
            //.when('/diagnoseTechnicalSiteVisit', {
            //    controller: 'DiagnosisController',
            //    templateUrl: 'templates/diagnosis/technical.site.visit.view.html',
            //    controllerAs: 'vm'
            //})
            .when('/diagnoseIntellectualProperty', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/intellectual.property.view.html',
                controllerAs: 'vm'
            })
            .when('/diagnoseRiskManagement', {
                controller: 'DiagnosisController',
                templateUrl: 'templates/diagnosis/risk.management.view.html',
                controllerAs: 'vm'
            })

            // Business Old stuff --------------------------------------------------------------------------------------


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

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {

        // $locationProvider.html5Mode(true);

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
