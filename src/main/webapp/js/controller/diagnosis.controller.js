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
         //diagnose TechnicalSiteVisit
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

        // Utils
        vm.registrationNumberBlur = registrationNumberBlur;

        vm.breadcrumbs = ["Home","User profile","User details"];

        (function initController() {
            // todo: load Company linked to this currentUser.
             if (!(vm.Company) || !(vm.Company.companyBusinessId)) {
                // load company linked to this currentUser.
                if ($rootScope.globals.currentUser.parentId) {
                    BpService.GetBpById($rootScope.globals.currentUser.parentId)
                        .then(function (comp) {
                            SharedProperties.setCompany(comp.data);
                            vm.Company = comp.data;
                            //$location.path('/diagnoseCompany');
                        });
                }

            }
            // loadAllUsers();
        })();

        vm.navigateToPage = function (path){
            $location.path('/' + path);
        };

// ---------------------- Diagnosis utils ----------------------------------------------------------------------------
        function registrationNumberBlur() {
            // make sure the  registartionType is of format // (2014/123456/07)
            vm.error = undefined;
            if (vm.Company.registrationNumber) {
                var arr = vm.Company.registrationNumber.split('/');
               if (arr[0].length != 4) {
                   vm.error = 'Company registration number, is in wrong format. Year of registration needs to be correct.';
                   return;
               } else {
                   // then count the years in business.
                   vm.Company.yearOfRegistration = arr[0];
                   vm.Company.yearsInBusiness = ((new Date()).getFullYear() - vm.Company.yearOfRegistration);
               }

                if (arr.length > 2) {
                    var regType = arr[2];
                    if (regType == '23') {
                        vm.Company.registartionType = 'Close Corporation';
                    } else if (regType == '07') {
                        vm.Company.registartionType = 'PTY';
                    } else if (regType == '24') {
                        vm.Company.registartionType = 'Co-operative';
                    } else if (regType == '25') {
                        vm.Company.registartionType = 'Other';
                    } else {
                        vm.error = 'Company registration number, last segment must be one of these: 23, 07, 24, 25.';
                    }

                } else {
                    // error format is wrong.
                    vm.error = 'Company registration number, is in wrong format.';
                }
            } else {
                // error format is wrong.
                vm.error = 'Company registration number, is required.';
            }

        }

// ---------------------- Company diagnosis ----------------------------------------------------------------------------
        function addEditCompany(val) {
            SharedProperties.setCompany(val);
            $location.path('/diagnoseCompany');
        }

        function saveCompany() {
            vm.dataLoading = true;
            console.log(vm.Company);

            // make company status inprogress
            vm.Company.status = 'INPROGRESS';
            SharedProperties.setCompany(vm.Company);
            // save to db
            BpService.SaveBp(vm.Company)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'Governance', 'diagnoseGovernance', GovernanceCallback));

            flash(['Saved Company : ' + vm.Company ]);
            vm.dataLoading = false;
           // $location.path('/diagnoseGovernance');
        }

        function loadAllCompanyDiagnosis(parentId, companySection, pageToNav, callback) {
            return BpService.GetAllCompanyDiagnosis(parentId, companySection)
                .then(function (diagnosis) {
                    if (diagnosis.data) {
                        diagnosis.data.companySection = companySection;
                        diagnosis.data.companyId = SharedProperties.getCompany().companyBusinessId;
                    }

                    callback(diagnosis);

                    if (pageToNav) {
                        vm.navigateToPage(pageToNav);
                    }
                });
        }

// ---------------------- Governance diagnosis ----------------------------------------------------------------------------

        function GovernanceCallback(diagnosis) {
            vm.Governance = diagnosis.data;
            SharedProperties.setGovernance(diagnosis.data);
        }

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

            BpService.SaveDiagnosis(vm.Governance)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'TaxCompliance', 'diagnoseTaxCompliance', TaxComplianceCallback));

            flash(['Saved Governance : ' + vm.Governance ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseTaxCompliance');
        }

// ---------------------- TaxCompliance diagnosis ----------------------------------------------------------------------------

        function TaxComplianceCallback(diagnosis) {
            vm.TaxCompliance = diagnosis.data;
            SharedProperties.setTaxCompliance(diagnosis.data);
        }

        function addEditTaxCompliance(val) {
            SharedProperties.setTaxCompliance(val);
            $location.path('/diagnoseTaxCompliance');
        }

        function saveTaxCompliance() {
            vm.dataLoading = true;
            console.log(vm.TaxCompliance);
            SharedProperties.setTaxCompliance(vm.TaxCompliance);

            BpService.SaveDiagnosis(vm.TaxCompliance)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'Labour', 'diagnoseLabour', LabourCallback));

            // BpService.saveTaxCompliance(vm.TaxCompliance);

            flash(['Saved TaxCompliance : ' + vm.TaxCompliance ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseLabour');
        }

// ---------------------- Labour diagnosis ----------------------------------------------------------------------------
        function LabourCallback(diagnosis) {
            vm.Labour = diagnosis.data;
            SharedProperties.setLabour(diagnosis.data);
        }

        function addEditLabour(val) {
            SharedProperties.setLabour(val);
            $location.path('/diagnoseLabour');
        }

        function saveLabour() {
            vm.dataLoading = true;
            console.log(vm.Labour);
            SharedProperties.setLabour(vm.Labour);

            BpService.SaveDiagnosis(vm.Labour)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'SafetyHealth', 'diagnoseSafetyHealth', SafetyHealthCallback));
            // BpService.saveLabour(vm.Labour);

            flash(['Saved Labour : ' + vm.Labour ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseSafetyHealth');
        }

// ---------------------- SafetyHealth diagnosis ----------------------------------------------------------------------------
        function SafetyHealthCallback(diagnosis) {
            vm.SafetyHealth = diagnosis.data;
            SharedProperties.setSafetyHealth(diagnosis.data);
        }

        function addEditSafetyHealth(val) {
            SharedProperties.setSafetyHealth(val);
            $location.path('/diagnoseSafetyHealth');
        }

        function saveSafetyHealth() {
            vm.dataLoading = true;
            console.log(vm.SafetyHealth);
            SharedProperties.setSafetyHealth(vm.SafetyHealth);

            BpService.SaveDiagnosis(vm.SafetyHealth)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'Standards', 'diagnoseStandards', StandardsCallback));
            // BpService.saveSafetyHealth(vm.SafetyHealth);

            flash(['Saved SafetyHealth : ' + vm.SafetyHealth ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseStandards');
        }

// ---------------------- Standards diagnosis ----------------------------------------------------------------------------
        function StandardsCallback(diagnosis) {
            vm.Standards = diagnosis.data;
            SharedProperties.setStandards(diagnosis.data);
        }

        function addEditStandards(val) {
            SharedProperties.setStandards(val);
            $location.path('/diagnoseStandards');
        }

        function saveStandards() {
            vm.dataLoading = true;
            console.log(vm.Standards);
            SharedProperties.setStandards(vm.Standards);

            BpService.SaveDiagnosis(vm.Standards)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'BBBEE', 'diagnoseBBBEE', BBBEECallback));
            // BpService.saveStandards(vm.Standards);

            flash(['Saved Standards : ' + vm.Standards ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseBBBEE');
        }

// ---------------------- BBBEE diagnosis ----------------------------------------------------------------------------
        function BBBEECallback(diagnosis) {
            vm.BBBEE = diagnosis.data;
            SharedProperties.setBBBEE(diagnosis.data);
        }

        function addEditBBBEE(val) {
            SharedProperties.setBBBEE(val);
            $location.path('/diagnoseBBBEE');
        }

        function saveBBBEE() {
            vm.dataLoading = true;
            console.log(vm.BBBEE);
            SharedProperties.setBBBEE(vm.BBBEE);

            BpService.SaveDiagnosis(vm.BBBEE)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'Production', 'diagnoseProduction', ProductionCallback));
            // BpService.saveBBBEE(vm.BBBEE);

            flash(['Saved BBBEE : ' + vm.BBBEE ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseProduction');
        }

// ---------------------- Production diagnosis ----------------------------------------------------------------------------
        function ProductionCallback(diagnosis) {
            vm.Production = diagnosis.data;
            SharedProperties.setProduction(diagnosis.data);
        }

        function addEditProduction(val) {
            SharedProperties.setProduction(val);
            $location.path('/diagnoseProduction');
        }

        function saveProduction() {
            vm.dataLoading = true;
            console.log(vm.Production);
            SharedProperties.setProduction(vm.Production);

            BpService.SaveDiagnosis(vm.Production)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'SalesMarketing', 'diagnoseSalesMarketing', SalesMarketingCallback));
            // BpService.saveProduction(vm.Production);

            flash(['Saved Production : ' + vm.Production ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseSalesMarketing');
        }

// ---------------------- SalesMarketing diagnosis ----------------------------------------------------------------------------
        function SalesMarketingCallback(diagnosis) {
            vm.SalesMarketing = diagnosis.data;
            SharedProperties.setSalesMarketing(diagnosis.data);
        }

        function addEditSalesMarketing(val) {
            SharedProperties.setSalesMarketing(val);
            $location.path('/diagnoseSalesMarketing');
        }

        function saveSalesMarketing() {
            vm.dataLoading = true;
            console.log(vm.SalesMarketing);
            SharedProperties.setSalesMarketing(vm.SalesMarketing);

            BpService.SaveDiagnosis(vm.SalesMarketing)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'InformationTechnology', 'diagnoseInformationTechnology', InformationTechnologyCallback));
            // BpService.saveSalesMarketing(vm.SalesMarketing);

            flash(['Saved SalesMarketing : ' + vm.SalesMarketing ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseInformationTechnology');
        }

// ---------------------- InformationTechnology diagnosis ----------------------------------------------------------------------------
        function InformationTechnologyCallback(diagnosis) {
            vm.InformationTechnology = diagnosis.data;
            SharedProperties.setInformationTechnology(diagnosis.data);
        }

        function addEditInformationTechnology(val) {
            SharedProperties.setInformationTechnology(val);
            $location.path('/diagnoseInformationTechnology');
        }

        function saveInformationTechnology() {
            vm.dataLoading = true;
            console.log(vm.InformationTechnology);
            SharedProperties.setInformationTechnology(vm.InformationTechnology);

            BpService.SaveDiagnosis(vm.InformationTechnology)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'FinancialControlsManagement', 'diagnoseFinancialControlsManagement', FinancialControlsManagementCallback));
            // BpService.saveInformationTechnology(vm.InformationTechnology);

            flash(['Saved InformationTechnology : ' + vm.InformationTechnology ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseFinancialControlsManagement');
        }

// ---------------------- FinancialControlsManagement diagnosis ----------------------------------------------------------------------------
        function FinancialControlsManagementCallback(diagnosis) {
            vm.FinancialControlsManagement = diagnosis.data;
            SharedProperties.setFinancialControlsManagement(diagnosis.data);
        }

        function addEditFinancialControlsManagement(val) {
            SharedProperties.setFinancialControlsManagement(val);
            $location.path('/diagnoseFinancialControlsManagement');
        }

        function saveFinancialControlsManagement() {
            vm.dataLoading = true;
            console.log(vm.FinancialControlsManagement);
            SharedProperties.setFinancialControlsManagement(vm.FinancialControlsManagement);

            BpService.SaveDiagnosis(vm.FinancialControlsManagement)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'IntellectualProperty', 'diagnoseIntellectualProperty', IntellectualPropertyCallback));
            // BpService.saveFinancialControlsManagement(vm.FinancialControlsManagement);

            flash(['Saved FinancialControlsManagement : ' + vm.FinancialControlsManagement ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseIntellectualProperty');
        }

// ---------------------- IntellectualProperty diagnosis ----------------------------------------------------------------------------
        function IntellectualPropertyCallback(diagnosis) {
            vm.IntellectualProperty = diagnosis.data;
            SharedProperties.setIntellectualProperty(diagnosis.data);
        }

        function addEditIntellectualProperty(val) {
            SharedProperties.setIntellectualProperty(val);
            $location.path('/diagnoseIntellectualProperty');
        }

        function saveIntellectualProperty() {
            vm.dataLoading = true;
            console.log(vm.IntellectualProperty);
            SharedProperties.setIntellectualProperty(vm.IntellectualProperty);

            BpService.SaveDiagnosis(vm.IntellectualProperty)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'RiskManagement', 'diagnoseRiskManagement', RiskManagementCallback));
            // BpService.saveIntellectualProperty(vm.IntellectualProperty);

            flash(['Saved IntellectualProperty : ' + vm.IntellectualProperty ]);
            vm.dataLoading = false;
            //$location.path('/diagnoseRiskManagement');
        }

// ---------------------- RiskManagement diagnosis ----------------------------------------------------------------------------
        function RiskManagementCallback(diagnosis) {
            vm.RiskManagement = diagnosis.data;
            SharedProperties.setRiskManagement(diagnosis.data);
        }

        function addEditRiskManagement(val) {
            SharedProperties.setRiskManagement(val);
            $location.path('/diagnoseRiskManagement');
        }

        function saveRiskManagement() {
            vm.dataLoading = true;
            console.log(vm.RiskManagement);
            SharedProperties.setRiskManagement(vm.RiskManagement);

            // BpService.SaveDiagnosis(vm.RiskManagement);
            BpService.SaveDiagnosis(vm.RiskManagement)
                .then(loadAllCompanyDiagnosis(vm.Company.companyBusinessId, 'TechnicalSiteVisit', 'diagnoseTechnicalSiteVisit', TechnicalSiteVisitCallback));
            // BpService.saveRiskManagement(vm.RiskManagement);

            // vm.Company.status = 'COMPLETED';
            // SharedProperties.setCompany(vm.Company);
            // save to db
            // BpService.SaveBp(vm.Company);

            flash(['Saved RiskManagement : ' + vm.RiskManagement ]);
            vm.dataLoading = false;
            // $location.path('/diagnoseTechnicalSiteVisit');

            // $location.path('/login');
        }

// ---------------------- TechnicalSiteVisit diagnosis Added as the last item. ----------------------------------------------------------------------------
        function TechnicalSiteVisitCallback(diagnosis) {
            vm.TechnicalSiteVisit = diagnosis.data;
            SharedProperties.setTechnicalSiteVisit(diagnosis.data);
        }

        function addEditTechnicalSiteVisit(val) {
            SharedProperties.setTechnicalSiteVisit(val);
            $location.path('/diagnoseTechnicalSiteVisit');
        }

        function saveTechnicalSiteVisit() {
            vm.dataLoading = true;
            console.log(vm.TechnicalSiteVisit);
            SharedProperties.setTechnicalSiteVisit(vm.TechnicalSiteVisit);

            BpService.SaveDiagnosis(vm.TechnicalSiteVisit);

            vm.Company.status = 'COMPLETED';
            SharedProperties.setCompany(vm.Company);
            // save to db
            BpService.SaveBp(vm.Company);

            // todo: send this to the db, rest call.
            // BpService.saveTechnicalSiteVisit(vm.TechnicalSiteVisit);
            flash(['Saved TechnicalSiteVisit : ' + vm.TechnicalSiteVisit ]);
            vm.dataLoading = false;
            // do not logout but rather open home page.
            $location.path('/');
            // vm.logout();
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