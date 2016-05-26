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

        vm.bpList = SharedProperties.getBpList();
        vm.bp = SharedProperties.getBp();
        vm.addEditBp = addEditBp;
        vm.saveBp = saveBp;
        vm.viewBpList = viewBpList;

        // Company details.
        vm.viewCompanyList = viewCompanyList;
        vm.viewInProgressCompanyList = viewInProgressCompanyList;
        vm.viewCompletedCompanyList = viewCompletedCompanyList;
        vm.companyList = SharedProperties.getCompanyList();
        vm.viewCompanyCertificate = viewCompanyCertificate;

        vm.company = SharedProperties.getCompany();
        vm.addNewCompany = addNewCompany;
        vm.saveCompany = saveCompany;

        // certs
        vm.companyCert = SharedProperties.getCompanyCert();

        // Company User details.
        vm.companyUser = SharedProperties.getCompanyUser();
        vm.addEditCompanyUser = addEditCompanyUser;
        vm.saveCompanyUser = saveCompanyUser;

        vm.diagnoseCompany = diagnoseCompany;

        vm.registrationNumberBlur = registrationNumberBlur;

        vm.breadcrumbs = ["Home","User profile","User details"];

        (function initController() {
            loadCurrentUser();

            var bpListInProgressPage = $.inArray($location.path(), ['/bpListInProgress']) !== -1;
            var bpListCompletedPage = $.inArray($location.path(), ['/bpListCompleted']) !== -1;
            if (bpListInProgressPage) {
                console.log("$location.path(): " + $location.path());
                console.log("value of bpListInProgressPage: " + bpListInProgressPage);
                loadInProgressBps();

            } else if (bpListCompletedPage) {
                loadCompletedBps();
                console.log("$location.path(): " + $location.path());
            } else {
                console.log("$location.path(): " + $location.path());
                loadAllBps();
            }

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

        // depending on where the page is coming from.
        //
        function loadAllBps() {
           return BpService.GetAllBps()
                .then(function (bps) {
                   vm.bpList = bps.data;
                   SharedProperties.setBpList(bps.data);
                });
        }

        function loadInProgressBps() {
           return BpService.GetInProgressBps()
                .then(function (bps) {
                   vm.bpList = bps.data;
                   SharedProperties.setBpList(bps.data);
                });
        }

        function loadCompletedBps() {
           return BpService.GetCompletedBps()
                .then(function (bps) {
                   vm.bpList = bps.data;
                   SharedProperties.setBpList(bps.data);
                });
        }

        function loadAllCompanies(parentId, pageToNav, pageFrom) {
            if (pageFrom == 'IN_PROGRESS') {
                return BpService.GetInProgressCompanies(parentId)
                    .then(function (companies) {
                        vm.companyList = companies.data;
                        SharedProperties.setCompanyList(companies.data);

                        if (pageToNav) {
                            vm.navigateToPage(pageToNav);
                        }
                    });
            } else if (pageFrom == 'COMPLETED') {
                return BpService.GetCompleteCompanies(parentId)
                    .then(function (companies) {
                        vm.companyList = companies.data;
                        SharedProperties.setCompanyList(companies.data);

                        if (pageToNav) {
                            vm.navigateToPage(pageToNav);
                        }
                    });
            } else {
                return BpService.GetAllCompanies(parentId)
                    .then(function (companies) {
                        vm.companyList = companies.data;
                        SharedProperties.setCompanyList(companies.data);

                        if (pageToNav) {
                            vm.navigateToPage(pageToNav);
                        }
                    });
            }

        }


//----- Create update new bp ---------------------------------------------------------------
        /*function addEditBp(bp) {
            BpService.AddUpdateCompany(bp)
                .then(function () {
                    // loadAllUsers();
                });
        }*/


       /* function viewAllBps() {
            loadAllBps().then($location.path('/bpList'));
        }*/

        function addEditBp(value) {
            // Todo: get addresses and set to a new array.
            if (value) {
                SharedProperties.setBp(value);
            }
            $location.path('/addEditBp');
        }


        function viewBpList() {
            vm.dataLoading = true;
            $location.path('/bpList');
        }

        function saveBp() {
            vm.dataLoading = true;
            /* Do the actual saving here */
            // store in shared props
            console.log(vm.bp);

            // clear list of bps
            SharedProperties.setBpList(undefined);
            vm.bpList = SharedProperties.getBpList();

            // Sort the addresses.
            /*
            var bpAddresses = [];
            bpAddresses.push(vm.bp.pAddress);
            bpAddresses.push(vm.bp.sAddress);

            vm.bp.addresses = bpAddresses;
             delete toSave['pAddress'];
             delete toSave['sAddress'];
             */

            // set bpcType to BP  is company for company.
            vm.bp.bpcType = 'BP';
            vm.bp.status = 'BP';

            // var toSave = _.clone(vm.bp);


            // Savings
            // Todo: show error on the screen.
            BpService.SaveBp(vm.bp).then(loadAllBps());

            SharedProperties.setBp(vm.bp);

            flash(['Saved Bp : ' + vm.bp ]);
            vm.dataLoading = false;
        }

//----- Create update new company ---------------------------------------------------------------

        function viewInProgressCompanyList(value) {
            SharedProperties.setBp(value);
            // first load companies.
            loadAllCompanies(SharedProperties.getBp().companyBusinessId, 'inprogressCompanyList', 'IN_PROGRESS');
        }

        function viewCompletedCompanyList(value) {
            SharedProperties.setBp(value);
            // first load companies.
            loadAllCompanies(SharedProperties.getBp().companyBusinessId, 'completedCompanyList', 'COMPLETED');
        }

        function viewCompanyCertificate(company) {

            SharedProperties.setCompany(company);
            vm.company = company;

            BpService.GetCompanyCerts(company.companyBusinessId)
                .then(function (comp) {
                    if (comp.data) {
                        var compCert = {};
                        compCert.data = comp.data;

                        _.each(comp.data, function(cert) {
                           console.log(cert);
                            compCert[cert.companySection] = cert;
                        });

                        SharedProperties.setCompanyCert(compCert);
                        vm.companyCert = compCert;
                        vm.navigateToPage('viewCompanyCert');
                    }
                });
        }

        function diagnoseCompany(value) {
            SharedProperties.setCompany(value);
            // open company diagnosis page...
            vm.navigateToPage('diagnoseCompany');

        }

        function viewCompanyList(value) {
            SharedProperties.setBp(value);
            // first load companies.
            loadAllCompanies(SharedProperties.getBp().companyBusinessId, 'companyList');
        }

        function addNewCompany(company) {

            if (company) {
                if (company.companyBusinessId) {
                    BpService.GetBpById(company.companyBusinessId)
                        .then(function (comp) {
                            SharedProperties.setCompany(comp.data);
                            vm.company = comp.data;
                            vm.navigateToPage('addNewCompany');
                        });
                } else {
                    SharedProperties.setCompany(company);
                    vm.company = company;
                    vm.navigateToPage('addNewCompany');
                }
            } else {
                // reset company value
                vm.company = {};
                SharedProperties.setCompany(vm.company);
                vm.navigateToPage('addNewCompany');
            }
        }

        function saveCompany() {
            vm.dataLoading = true;
            // Do the actual saving here
            // store in shared props
            console.log(vm.company);
            SharedProperties.setCompany(vm.company);

            SharedProperties.setCompanyList(undefined);
            vm.companyList = SharedProperties.getCompanyList();

            vm.company.parentId = SharedProperties.getBp().companyBusinessId;
            vm.company.bpcType = 'COMPANY';
            vm.company.status = 'NEW';

            // TODO: load companies per parent.
            BpService.SaveBp(vm.company).then(loadAllCompanies(SharedProperties.getBp().companyBusinessId));

            flash(['Saved Company : ' + vm.company ]);

            /* BpService.SaveBp(vm.company)
                .then(function () {
                    // loadAllUsers();
                    // $location.path('/addNewCompanyUser');
                    vm.dataLoading = false;
                });*/
        }


//----- Create update new company user ---------------------------------------------------------------
        function addEditCompanyUser(company) {
            // addEditCompanyUser
           // first select user from db using this company


            SharedProperties.setCompany(company);
            vm.company = company;

            BpService.GetCompanyUserByParentId(company.companyBusinessId)
                .then(function (comp) {
                    if (comp.data) {
                        SharedProperties.setCompanyUser(comp.data);
                        vm.companyUser = comp.data;
                        vm.navigateToPage('addNewCompanyUser');
                    }
                });
            // $location.path('/addNewCompanyUser');
        }

        function saveCompanyUser() {
            vm.dataLoading = true;

            // if there is no user then bail
            if (!(vm.company) || !(vm.company.companyBusinessId)) {
                vm.error = true;
                vm.errorMessage = 'There must be a selected company for a Company User to be added.';
                return;
            }

            // set the parent to the companyId
            vm.companyUser.parentId = vm.company.companyBusinessId;
            vm.companyUser.userType = 'company_user';
            vm.companyUser.username = vm.companyUser.idNumber;
            vm.companyUser.password = '12345';

            console.log(vm.companyUser);
            SharedProperties.setCompanyUser(vm.companyUser);

            BpService.SaveCompanyUser(vm.companyUser)
                .then(function () {
                    // loadAllUsers();
                    $location.path('/');
                    vm.dataLoading = false;
                });
            flash(['Saved companyUser : ' + vm.companyUser ]);
            vm.dataLoading = false;
        }


        // ---------------------- Diagnosis utils ----------------------------------------------------------------------------
        function registrationNumberBlur() {
            // make sure the  registartionType is of format // (2014/123456/07)
            vm.error = undefined;
            if (vm.company.registrationNumber) {
                var arr = vm.company.registrationNumber.split('/');
                if (arr[0].length != 4) {
                    vm.error = 'Company registration number, is in wrong format. Year of registration needs to be correct.';
                    return;
                } else {
                    // then count the years in business.
                    vm.company.yearOfRegistration = arr[0];
                    vm.company.yearsInBusiness = ((new Date()).getFullYear() - vm.company.yearOfRegistration);
                }

                if (arr.length > 2) {
                    var regType = arr[2];
                    if (regType == '23') {
                        vm.company.registartionType = 'Close Corporation';
                    } else if (regType == '07') {
                        vm.company.registartionType = 'PTY';
                    } else if (regType == '24') {
                        vm.company.registartionType = 'Co-operative';
                    } else if (regType == '25') {
                        vm.company.registartionType = 'Other';
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