(function () {
    'use strict';

    angular
        .module('eManager').controller('WarehouseController', WarehouseController);

    WarehouseController.$inject = ['GeneralService', 'SharedProperties','$location', '$rootScope', 'flash'];
    function WarehouseController(GeneralService, SharedProperties, $location, $rootScope, flash) {
        var vm = this;
        vm.breadcrumbs = ["Home","Setup","Manage Warehouses"];

        vm.currentUser = $rootScope.globals.currentUser;

        vm.warehouse = SharedProperties.getWarehouse();
        vm.allWarehouses = [];
        vm.addEditWarehouse = addEditWarehouse;
        vm.saveWarehouse = saveWarehouse;

        vm.allOrgs = [];

        vm.navigateToPage = SharedProperties.navigateToPage;

        vm.tab = 1;

        (function initController() {
            // reset register form
            loadCurrentUser();
            loadAllWarehouses();
            loadAllOrgs();

        })();

        function loadCurrentUser() {
            vm.currentUser = $rootScope.globals.currentUser;
        }

        function addEditWarehouse(pWarehouseToEdit) {
             SharedProperties.setWarehouse(pWarehouseToEdit);

            if (!vm.allOrgs.length) {
                loadAllOrgs();
            }

            $location.path('/addEditWarehouse');
        }

        function saveWarehouse() {
            vm.dataLoading = true;

            console.log(vm.warehouse);
            SharedProperties.setWarehouse(vm.warehouse);

            // pick org from the list.
            var orgIdNum = parseInt(vm.warehouse.organisation.organisationId);
            var selectedOrg = _.findWhere(vm.allOrgs, {organisationId:orgIdNum});
            vm.warehouse.organisation = selectedOrg;

            GeneralService.CreateUpdateWarehouse(vm.warehouse);
            loadAllWarehouses();

            flash(['Saved warehouse : ' + vm.warehouse.name ]);
            // done
            vm.dataLoading = false;
        }

        function loadAllWarehouses() {
            GeneralService.GetAllWarehouses()
                .then(function (warehouses) {
                    vm.allWarehouses = warehouses.data;
                });

            vm.allWarehousesMockData = [
                {
                    warehouseId:1,
                    name: 'Warehouse 1',
                    description: 'description 1',
                    warehouseType: "InBound",

                    address:{},
                    organisation:{name:'organisation 1'}
                },
                {
                    warehouseId:2,
                    name: 'Warehouse 2',
                    description: 'description 2',
                    warehouseType: "InBound",

                    address:{},
                    organisation:{name:'organisation 1'}
                },{
                    warehouseId:3,
                    name: 'Warehouse 3',
                    description: 'description 3',
                    warehouseType: "InBound",

                    address:{},
                    organisation:{name:'organisation 2'}
                },{
                    warehouseId:4,
                    name: 'Warehouse 4',
                    description: 'description 4',
                    warehouseType: "InBound",

                    address:{},
                    organisation:{name:'organisation 3'}
                },{
                    warehouseId:5,
                    name: 'Warehouse 5',
                    description: 'description 5',
                    warehouseType: "Client",

                    address:{},
                    organisation:{name:'organisation 3'}
                }
            ];
        }

        function loadAllOrgs() {
            GeneralService.GetAllOrgs()
                .then(function (orgs) {
                    vm.allOrgs = orgs.data;
                });
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
