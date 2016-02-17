(function () {
    'use strict';

    angular
        .module('eManager').controller('OrgController', OrgController);

    OrgController.$inject = ['GeneralService', 'SharedProperties','$location', '$rootScope','flash'];
    function OrgController(GeneralService, SharedProperties, $location, $rootScope, flash) {
        var vm = this;
        vm.currentUser = $rootScope.globals.currentUser;
        vm.breadcrumbs = ["Home","Setup","Manage Organisations"];

        vm.org = SharedProperties.getOrg();
        vm.allOrgs = [];
        vm.addEditOrg = addEditOrg;
        vm.saveOrg = saveOrg;

        vm.navigateToPage = SharedProperties.navigateToPage;

        vm.tab = 1;

        function addEditOrg(pOrgToEdit) {
            SharedProperties.setOrg(pOrgToEdit);
            $location.path('/addEditOrg');
        }

        function saveOrg() {
            vm.dataLoading = true;
            flash(['Saving org.' ]);

            console.log(vm.org);
            SharedProperties.setOrg(vm.org);

            GeneralService.CreateUpdateOrg(vm.org);
            GeneralService.GetAllOrgs()
                .then(function (orgs) {
                    vm.allOrgs = orgs.data;
                });
            // flash(['<strong>Info:</strong> Saved org.' ]);
            vm.dataLoading = false;

            flash(['Saved org : ' + vm.org.name ]);
            // flash('error', 'Something went wrong…');

        }

        (function initController() {
            // reset register form
            loadCurrentUser();
            loadAllOrgs();
        })();

        function loadCurrentUser() {
            vm.currentUser = $rootScope.globals.currentUser;
        }

        function loadAllOrgs() {
            GeneralService.GetAllOrgs()
                .then(function (orgs) {
                    vm.allOrgs = orgs.data;
                });

            vm.allOrgsMockData = [
                {
                    organisationId:1,
                    name: 'Org 1',
                    registration: 'registration 1',
                    registartionType: "registartionType 1",
                    notes: "notes 1",
                    companyType: 'branch',

                    address:{},
                    contactDetails:{}
                },
                {
                    organisationId:2,
                    name: 'Org 2',
                    registration: "registration 2",
                    registartionType: "registartionType 2",
                    notes: "notes 2",
                    companyType: 'branch',

                    address:{},
                    contactDetails:{}

                },
                {
                    organisationId:3,
                    name: 'Org 3',
                    registration: "registration 3",
                    registartionType: "registartionType 3",
                    notes: "notes 3",
                    relatedOrgId: 1,
                    companyType: 'client',

                    address:{},
                    contactDetails:{}

                }
            ];
        }


        vm.setTab = function (tabId) {
            vm.tab = tabId;
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

    }

})();
