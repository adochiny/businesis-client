(function () {
    'use strict';

    angular
        .module('eManager')
        .controller('DiagnosisController', DiagnosisController);

    DiagnosisController.$inject = ['UserService', 'BpService', 'AuthenticationService', '$rootScope', '$location', 'SharedProperties', 'flash'];
    function DiagnosisController(UserService, BpService, AuthenticationService, $rootScope, $location, SharedProperties, flash) {
        var vm = this;
        vm.currentUser = $rootScope.globals.currentUser;

        vm.Company = SharedProperties.getCompany();
        vm.addEditCompany = addEditCompany;
        vm.saveCompany = saveCompany;

        /*
         diagnose Governance
         diagnose TaxCompliance
         diagnose Labour
         diagnose SafetyHealth
         diagnose Standards
         diagnose BBBEE Broad Based Black Economic Empowerment (B-BBEE)
         diagnose Production
         diagnose SalesMarketing
         diagnose InformationTechnology
         diagnose FinancialControlsManagement
         diagnose TechnicalSiteVisit
         diagnose IntellectualProperty
         diagnose RiskManagement
         */

        vm.Governance = SharedProperties.getGovernance();
        vm.TaxCompliance = SharedProperties.getTaxCompliance();
        vm.Labour = SharedProperties.getLabour();
        vm.SafetyHealth = SharedProperties.getSafetyHealth();
        vm.Standards = SharedProperties.getStandards();
        vm.BBBEE = SharedProperties.getBBBEE();
        vm.Production = SharedProperties.getProduction();
        vm.SalesMarketing = SharedProperties.getSalesMarketing();
        vm.InformationTechnology = SharedProperties.getInformationTechnology();
        vm.FinancialControlsManagement = SharedProperties.getFinancialControlsManagement();
        vm.TechnicalSiteVisit = SharedProperties.getTechnicalSiteVisit();
        vm.IntellectualProperty = SharedProperties.getIntellectualProperty();
        vm.RiskManagement = SharedProperties.getRiskManagement();

        vm.addEditGovernance = addEditGovernance;
        vm.saveGovernance = saveGovernance;

        vm.addEditTaxCompliance = addEditTaxCompliance;
        vm.saveTaxCompliance = saveTaxCompliance;

        vm.addEditLabour = addEditLabour;
        vm.saveLabour = saveLabour;

        vm.addEditSafetyHealth = addEditSafetyHealth;
        vm.saveSafetyHealth = saveSafetyHealth;

        vm.addEditStandards = addEditStandards;
        vm.saveStandards = saveStandards;

        vm.addEditBBBEE = addEditBBBEE;
        vm.saveBBBEE = saveBBBEE;

        vm.addEditProduction = addEditProduction;
        vm.saveProduction = saveProduction;

        vm.addEditSalesMarketing = addEditSalesMarketing;
        vm.saveSalesMarketing = saveSalesMarketing;

        vm.addEditInformationTechnology = addEditInformationTechnology;
        vm.saveInformationTechnology = saveInformationTechnology;

        vm.addEditFinancialControlsManagement = addEditFinancialControlsManagement;
        vm.saveFinancialControlsManagement = saveFinancialControlsManagement;

        vm.addEditTechnicalSiteVisit = addEditTechnicalSiteVisit;
        vm.saveTechnicalSiteVisit = saveTechnicalSiteVisit;

        vm.addEditIntellectualProperty = addEditIntellectualProperty;
        vm.saveIntellectualProperty = saveIntellectualProperty;

        vm.addEditRiskManagement = addEditRiskManagement;
        vm.saveRiskManagement = saveRiskManagement;

        vm.breadcrumbs = ["Home","User profile","User details"];

        (function initController() {
            // todo: load Company linked to this user.
            // loadAllUsers();
        })();

        vm.navigateToPage = function (path){
            $location.path('/' + path);
        };

// ---------------------- Company diagnosis ----------------------------------------------------------------------------
        function addEditCompany(val) {
            SharedProperties.setCompany(val);
            $location.path('/diagnoseCompany');
        }

        function saveCompany() {
            vm.dataLoading = true;
            console.log(vm.Company);
            SharedProperties.setCompany(vm.Company);

            // todo: save Company details.
            // BpService.saveCompany(vm.Company);
            //AssetService.GetAllAssetTypes()
            //    .then(function (assetTypes) {
            //        vm.allAssetTypes = assetTypes.data;
            //    });
            flash(['Saved Company : ' + vm.Company ]);
            vm.dataLoading = false;
            $location.path('/diagnoseGovernance');
        }

// ---------------------- Governance diagnosis ----------------------------------------------------------------------------

        function addEditGovernance(val) {
            SharedProperties.setGovernance(val);
            $location.path('/diagnoseGovernance');
        }

        function saveGovernance() {
            vm.dataLoading = true;
            console.log(vm.Governance);
            SharedProperties.setGovernance(vm.Governance);

            var url = $location.url();
            console.log($location.path());
            console.log(url);

            // todo: send this to the db, rest call.
            // BpService.saveGovernance(vm.Governance);

            flash(['Saved Governance : ' + vm.Governance ]);
            vm.dataLoading = false;
            $location.path('/diagnoseTaxCompliance');
        }

// ---------------------- TaxCompliance diagnosis ----------------------------------------------------------------------------

        function addEditTaxCompliance(val) {
            SharedProperties.setTaxCompliance(val);
            $location.path('/diagnoseTaxCompliance');
        }

        function saveTaxCompliance() {
            vm.dataLoading = true;
            console.log(vm.TaxCompliance);
            SharedProperties.setTaxCompliance(vm.TaxCompliance);

            // todo: send this to the db, rest call.
            // BpService.saveTaxCompliance(vm.TaxCompliance);

            flash(['Saved TaxCompliance : ' + vm.TaxCompliance ]);
            vm.dataLoading = false;
            $location.path('/diagnoseLabour');
        }

// ---------------------- Labour diagnosis ----------------------------------------------------------------------------

        function addEditLabour(val) {
            SharedProperties.setLabour(val);
            $location.path('/diagnoseLabour');
        }

        function saveLabour() {
            vm.dataLoading = true;
            console.log(vm.Labour);
            SharedProperties.setLabour(vm.Labour);

            // todo: send this to the db, rest call.
            // BpService.saveLabour(vm.Labour);

            flash(['Saved Labour : ' + vm.Labour ]);
            vm.dataLoading = false;
            $location.path('/diagnoseSafetyHealth');
        }

// ---------------------- SafetyHealth diagnosis ----------------------------------------------------------------------------

        function addEditSafetyHealth(val) {
            SharedProperties.setSafetyHealth(val);
            $location.path('/diagnoseSafetyHealth');
        }

        function saveSafetyHealth() {
            vm.dataLoading = true;
            console.log(vm.SafetyHealth);
            SharedProperties.setSafetyHealth(vm.SafetyHealth);

            // todo: send this to the db, rest call.
            // BpService.saveSafetyHealth(vm.SafetyHealth);

            flash(['Saved SafetyHealth : ' + vm.SafetyHealth ]);
            vm.dataLoading = false;
            $location.path('/diagnoseStandards');
        }

// ---------------------- Standards diagnosis ----------------------------------------------------------------------------

        function addEditStandards(val) {
            SharedProperties.setStandards(val);
            $location.path('/diagnoseStandards');
        }

        function saveStandards() {
            vm.dataLoading = true;
            console.log(vm.Standards);
            SharedProperties.setStandards(vm.Standards);

            // todo: send this to the db, rest call.
            // BpService.saveStandards(vm.Standards);

            flash(['Saved Standards : ' + vm.Standards ]);
            vm.dataLoading = false;
            $location.path('/diagnoseBBBEE');
        }

// ---------------------- BBBEE diagnosis ----------------------------------------------------------------------------

        function addEditBBBEE(val) {
            SharedProperties.setBBBEE(val);
            $location.path('/diagnoseBBBEE');
        }

        function saveBBBEE() {
            vm.dataLoading = true;
            console.log(vm.BBBEE);
            SharedProperties.setBBBEE(vm.BBBEE);

            // todo: send this to the db, rest call.
            // BpService.saveBBBEE(vm.BBBEE);

            flash(['Saved BBBEE : ' + vm.BBBEE ]);
            vm.dataLoading = false;
            $location.path('/diagnoseProduction');
        }

// ---------------------- Production diagnosis ----------------------------------------------------------------------------

        function addEditProduction(val) {
            SharedProperties.setProduction(val);
            $location.path('/diagnoseProduction');
        }

        function saveProduction() {
            vm.dataLoading = true;
            console.log(vm.Production);
            SharedProperties.setProduction(vm.Production);

            // todo: send this to the db, rest call.
            // BpService.saveProduction(vm.Production);

            flash(['Saved Production : ' + vm.Production ]);
            vm.dataLoading = false;
            $location.path('/diagnoseSalesMarketing');
        }

// ---------------------- SalesMarketing diagnosis ----------------------------------------------------------------------------

        function addEditSalesMarketing(val) {
            SharedProperties.setSalesMarketing(val);
            $location.path('/diagnoseSalesMarketing');
        }

        function saveSalesMarketing() {
            vm.dataLoading = true;
            console.log(vm.SalesMarketing);
            SharedProperties.setSalesMarketing(vm.SalesMarketing);

            // todo: send this to the db, rest call.
            // BpService.saveSalesMarketing(vm.SalesMarketing);

            flash(['Saved SalesMarketing : ' + vm.SalesMarketing ]);
            vm.dataLoading = false;
            $location.path('/diagnoseInformationTechnology');
        }

// ---------------------- InformationTechnology diagnosis ----------------------------------------------------------------------------

        function addEditInformationTechnology(val) {
            SharedProperties.setInformationTechnology(val);
            $location.path('/diagnoseInformationTechnology');
        }

        function saveInformationTechnology() {
            vm.dataLoading = true;
            console.log(vm.InformationTechnology);
            SharedProperties.setInformationTechnology(vm.InformationTechnology);

            // todo: send this to the db, rest call.
            // BpService.saveInformationTechnology(vm.InformationTechnology);

            flash(['Saved InformationTechnology : ' + vm.InformationTechnology ]);
            vm.dataLoading = false;
            $location.path('/diagnoseFinancialControlsManagement');
        }

// ---------------------- FinancialControlsManagement diagnosis ----------------------------------------------------------------------------

        function addEditFinancialControlsManagement(val) {
            SharedProperties.setFinancialControlsManagement(val);
            $location.path('/diagnoseFinancialControlsManagement');
        }

        function saveFinancialControlsManagement() {
            vm.dataLoading = true;
            console.log(vm.FinancialControlsManagement);
            SharedProperties.setFinancialControlsManagement(vm.FinancialControlsManagement);

            // todo: send this to the db, rest call.
            // BpService.saveFinancialControlsManagement(vm.FinancialControlsManagement);

            flash(['Saved FinancialControlsManagement : ' + vm.FinancialControlsManagement ]);
            vm.dataLoading = false;
            $location.path('/diagnoseIntellectualProperty');
        }

// ----------------------Deprecated TechnicalSiteVisit diagnosis ----------------------------------------------------------------------------

        function addEditTechnicalSiteVisit(val) {
            SharedProperties.setTechnicalSiteVisit(val);
            $location.path('/diagnoseTechnicalSiteVisit');
        }

        function saveTechnicalSiteVisit() {
            vm.dataLoading = true;
            console.log(vm.TechnicalSiteVisit);
            SharedProperties.setTechnicalSiteVisit(vm.TechnicalSiteVisit);

            // todo: send this to the db, rest call.
            // BpService.saveTechnicalSiteVisit(vm.TechnicalSiteVisit);

            flash(['Saved TechnicalSiteVisit : ' + vm.TechnicalSiteVisit ]);
            vm.dataLoading = false;
            $location.path('/diagnoseIntellectualProperty');
        }

// ---------------------- IntellectualProperty diagnosis ----------------------------------------------------------------------------

        function addEditIntellectualProperty(val) {
            SharedProperties.setIntellectualProperty(val);
            $location.path('/diagnoseIntellectualProperty');
        }

        function saveIntellectualProperty() {
            vm.dataLoading = true;
            console.log(vm.IntellectualProperty);
            SharedProperties.setIntellectualProperty(vm.IntellectualProperty);

            // todo: send this to the db, rest call.
            // BpService.saveIntellectualProperty(vm.IntellectualProperty);

            flash(['Saved IntellectualProperty : ' + vm.IntellectualProperty ]);
            vm.dataLoading = false;
            $location.path('/diagnoseRiskManagement');
        }

        // ---------------------- RiskManagement diagnosis ----------------------------------------------------------------------------

        function addEditRiskManagement(val) {
            SharedProperties.setRiskManagement(val);
            $location.path('/diagnoseRiskManagement');
        }

        function saveRiskManagement() {
            vm.dataLoading = true;
            console.log(vm.RiskManagement);
            SharedProperties.setRiskManagement(vm.RiskManagement);

            // todo: send this to the db, rest call.
            // BpService.saveRiskManagement(vm.RiskManagement);

            flash(['Saved RiskManagement : ' + vm.RiskManagement ]);
            vm.dataLoading = false;
            $location.path('/login');
        }

        /*Yes	No	Do not Know	Not Applicable
         */
        vm.diagnosisOpts = [
            {optionId: 1, optionName: 'Yes'},
            {optionId: 2, optionName: 'No'},
            {optionId: 3, optionName: 'Do not Know'},
            {optionId: 4, optionName: 'Not Applicable'}
        ];

        vm.logout = function() {
            AuthenticationService.ClearCredentials(vm.currentUser);
            $rootScope.globals.currentUser = null;
            vm.currentUser = null;
            flash('User logged out, thanks for your time.');
            $location.path('/login');
        };


    }

})();