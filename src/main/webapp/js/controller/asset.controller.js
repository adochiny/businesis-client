(function () {
    'use strict';

    angular
        .module('eManager').controller('AssetController', AssetController);

    AssetController.$inject = ['AssetService', 'GeneralService', 'SharedProperties','$location', '$rootScope', 'flash'];
    function AssetController(AssetService, GeneralService, SharedProperties, $location, $rootScope, flash) {
        var vm = this;
        vm.currentUser = $rootScope.globals.currentUser;

        vm.getDataLoadingImage = SharedProperties.getDataLoadingImage();
        vm.itemsByPage =2;
        vm.breadcrumbs = ["Home","Equipment","Manage Assets"];

        // --------------------------- Data for ac select -------------------------------------------------------------------------

        // <ac-select ac-model="data.selectedShape" ac-options="for shape in shapes"></ac-select>
        /*<ac-select ac-model="selectedColour" ac-options="c.name for c in colours"
        ac-change="colourChanged(value)"></ac-select>*/


        // <select class="ac-select stateList" ac-model="selectedState" ac-options="s.name for s in getAllStates()"
        // ac-settings="{ loadOnOpen: true, minWidth: '300px' }" ac-change="stateSelected(value)"></select>

        vm.selectedState = {}; // = { name: "Alabama2", id: "AL2" };

        vm.stateSelected = function (state) {
            vm.selectedState = state; //  state.name + " (" + state.id + ")";
            console.log(vm.selectedState);
        };

        vm.allAssetCodesSelectData = [];

        // vm.assetCodeFilter;

        // --------------------------- Data for ac select -------------------------------------------------------------------------


        vm.assetType = SharedProperties.getAssetType();
        vm.allAssetTypes = [];
        vm.addEditAssetType = addEditAssetType;
        vm.saveAssetType = saveAssetType;


        vm.assetBrand = SharedProperties.getAssetBrand();
        vm.allAssetBrands = [];
        vm.addEditAssetBrand = addEditAssetBrand;
        vm.saveAssetBrand = saveAssetBrand;


        vm.assetModel = SharedProperties.getAssetModel();
        vm.allAssetModels = [];
        vm.addEditAssetModel = addEditAssetModel;
        vm.saveAssetModel = saveAssetModel;

        vm.assetCode = SharedProperties.getAssetCode();
        vm.allAssetCodes = [];
        vm.addEditAssetCode = addEditAssetCode;
        vm.saveAssetCode = saveAssetCode;

        vm.asset = SharedProperties.getAsset();
        vm.allAssets = [];
        vm.addEditAsset = addEditAsset;
        vm.saveAsset = saveAsset;
        vm.viewAssetDetails = viewAssetDetails;

        vm.assetSoftware = SharedProperties.getAssetSoftware();
        vm.allAssetSoftwares = [];
        vm.addEditAssetSoftware = addEditAssetSoftware;
        vm.saveAssetSoftware = saveAssetSoftware;

        vm.assetSearch = {};
        vm.findAssets = findAssets;
        vm.isAssetSearchNoFieldsSet = true;
        vm.assetSearchNoFieldsSet = assetSearchNoFieldsSet;

        vm.allWarehouses = [];
        vm.getAllAssetWarehouses = getAllAssetWarehouses;
        vm.saveAssetWarehouse = saveAssetWarehouse;
        vm.isAssetWarehouseChanged = true;
        vm.assetWarehouseChanged = assetWarehouseChanged;
        vm.exportData = exportData;

        vm.navigateToPage = function (path){
            $location.path('/' + path);
        };

        (function initController() {
            // reset register form
            loadCurrentUser();
            loadAllAssetTypes();
            loadAllAssetBrands();
            loadAllAssetModels();
            loadAllAssetCodes();
            loadAllAssets();
            loadAllAssetSoftwares();
            loadAllWarehouses();
        })();

        function loadCurrentUser() {
            vm.currentUser = $rootScope.globals.currentUser;
        }

    //----- AssetType ---------------------------------------------------------------
        function addEditAssetType(pAssetTypeToEdit) {
            SharedProperties.setAssetType(pAssetTypeToEdit);
            $location.path('/addEditAssetType');
        }

        function saveAssetType() {
            vm.dataLoading = true;
            /* Do the actual saving here */
            // store in shared props
            console.log(SharedProperties.getAssetType());
            SharedProperties.setAssetType(vm.assetType);

            AssetService.CreateUpdateAssetType(vm.assetType);
            AssetService.GetAllAssetTypes()
                .then(function (assetTypes) {
                    vm.allAssetTypes = assetTypes.data;
                });
            flash(['Saved Asset Type : ' + vm.assetType.assetTypeName ]);
            vm.dataLoading = false;
        }

    //----- AssetBrand ---------------------------------------------------------------
        function addEditAssetBrand(pToEdit) {
            SharedProperties.setAssetBrand(pToEdit);
            $location.path('/addEditAssetBrand');
        }

        function saveAssetBrand() {
            vm.dataLoading = true;
            /* Do the actual saving here */
            console.log(SharedProperties.getAssetBrand());

            SharedProperties.setAssetBrand(vm.assetBrand);

            AssetService.CreateUpdateAssetBrand(vm.assetBrand);
            AssetService.GetAllAssetBrands()
                .then(function (assetBrands) {
                    vm.allAssetBrands = assetBrands.data;
                });

            flash(['Saved Asset Brand : ' + vm.assetBrand.brandName ]);
            vm.dataLoading = false;
        }

    //----- AssetModel ---------------------------------------------------------------
        function addEditAssetModel(pToEdit) {
            SharedProperties.setAssetModel(pToEdit);
            $location.path('/addEditAssetModel');
        }

        function saveAssetModel() {
            vm.dataLoading = true;
            /* Do the actual saving here */
            console.log(SharedProperties.getAssetModel());

            SharedProperties.setAssetModel(vm.assetModel);

            AssetService.CreateUpdateAssetModel(vm.assetModel);
            AssetService.GetAllAssetModels()
                .then(function (assetModels) {
                    vm.allAssetModels = assetModels.data;
                });
            flash(['Saved Asset Model : ' + vm.assetModel.modelName ]);
            vm.dataLoading = false;
        }

    //----- AssetCode ---------------------------------------------------------------
        function addEditAssetCode(pToEdit) {
            SharedProperties.setAssetCode(pToEdit);
            $location.path('/addEditAssetCode');
        }

        function saveAssetCode() {
            vm.dataLoading = true;
            /* Do the actual saving here */
            console.log(SharedProperties.getAssetCode());

            SharedProperties.setAssetCode(vm.assetCode);

            // set asset type from the selected id
            var assetTypeIdNum = parseInt(vm.assetCode.assetType.assetTypeId);
            var selectedAT = _.findWhere(vm.allAssetTypes, {assetTypeId:assetTypeIdNum});
            vm.assetCode.assetType = selectedAT;

            // set asset model from the selected id
            var assetModelIdNum = parseInt(vm.assetCode.assetModel.assetModelId);
            var selectedAM = _.findWhere(vm.allAssetModels, {assetModelId:assetModelIdNum});
            vm.assetCode.assetModel = selectedAM;


            // set asset brand from the selected id
            var assetBrandIdNum = parseInt(vm.assetCode.assetBrand.assetBrandId);
            var selectedAB = _.findWhere(vm.allAssetBrands, {assetBrandId:assetBrandIdNum});
            vm.assetCode.assetBrand = selectedAB;


            AssetService.CreateUpdateAssetCode(vm.assetCode);
            AssetService.GetAllAssetCodes()
                .then(function (assetCodes) {
                    vm.allAssetCodes = assetCodes.data;
                });

            flash(['Saved Asset Code : ' + ' Asset Type : ' + vm.assetType.assetTypeName + ' Brand : ' + vm.assetBrand.brandName  + ' Model : ' + vm.assetModel.modelName ]);
            vm.dataLoading = false;
        }

    //----- AssetSoftware ---------------------------------------------------------------
        function addEditAssetSoftware(pToEdit) {
            SharedProperties.setAssetSoftware(pToEdit);
            $location.path('/addEditAssetSoftware');
        }

        function saveAssetSoftware() {
            vm.dataLoading = true;
            /* Do the actual saving here */
            console.log('AssetSoftware');
            console.log(SharedProperties.getAssetSoftware());

            SharedProperties.setAssetSoftware(vm.assetSoftware);

            AssetService.CreateUpdateAssetSoftware(vm.assetSoftware);
            AssetService.GetAllAssetSoftwares()
                .then(function (assetSoftwares) {
                    vm.allAssetSoftwares = assetSoftwares.data;
                });

            flash(['Saved Asset Software : ' + vm.assetSoftware.name + ' ' + vm.assetSoftware.manufacturer ]);
            vm.dataLoading = false;
        }

    //----- Asset ---------------------------------------------------------------
        function addEditAsset(pToEdit) {
            if (typeof pToEdit.wifi != 'undefined') {
                pToEdit.wifi = pToEdit.wifi.toString();
            }
            SharedProperties.setAsset(pToEdit);

            // if warehouses not loaded.
            if (!vm.allWarehouses.length) {
                loadAllWarehouses();
            }
            $location.path('/addEditAsset');
        }

        function viewAssetDetails(pToEdit) {
            if (typeof pToEdit.wifi != 'undefined') {
                pToEdit.wifi = pToEdit.wifi.toString();
                loadAllAssetWarehouses(pToEdit.assetId);
            }
            SharedProperties.setAsset(pToEdit);

            // set current asset.
            // if warehouses not loaded.
            if (!vm.allWarehouses.length) {
                loadAllWarehouses();
            }
            $location.path('/viewAssetDetails');
        }
        function getAllAssetWarehouses() {

            return SharedProperties.getAllAssetWarehouses();
        }

        function saveAsset() {
            vm.dataLoading = true;
            /* Do the actual saving here */
            console.log("Saving asset ...");
            // vm.asset.wifi = !!vm.asset.wifi;
            console.log(vm.asset);

            SharedProperties.setAsset(vm.asset);

            // set warehouse from the selected id
            var warehouseIdNum = parseInt(vm.asset.warehouse.warehouseId);
            var selectedAW = _.findWhere(vm.allWarehouses, {warehouseId:warehouseIdNum});
            vm.asset.warehouse = selectedAW;

            // set asset code from the selected id
            var assetCodeIdNum = parseInt(vm.asset.assetCode.assetCodeId);
            var selectedAC = _.findWhere(vm.allAssetCodes, {assetCodeId:assetCodeIdNum});
            vm.asset.assetCode = selectedAC;

            // set asset software from the selected id
            var assetSoftwareIdNum = parseInt(vm.asset.assetSoftware.assetSoftwareId);
            var selectedAS = _.findWhere(vm.allAssetSoftwares, {assetSoftwareId:assetSoftwareIdNum});
            vm.asset.assetSoftware = selectedAS;

            AssetService.CreateUpdateAsset(vm.asset);
            loadAllAssetWarehouses(vm.asset.assetId);
            /* AssetService.GetAllAssets()
                .then(function (assets) {
                    vm.allAssets = assets.data;
                });*/

            flash(['Saved Asset, SerialNumber : ' + vm.asset.serialNumber ]);
            vm.dataLoading = false;
        }

        function saveAssetWarehouse() {
            console.log("Saving AssetWarehouse( ...");
            console.log(vm.asset);

            var warehouseIdNum = parseInt(vm.asset.warehouse.warehouseId);
            var selectedAW = _.findWhere(vm.allWarehouses, {warehouseId:warehouseIdNum});
            vm.asset.warehouse = selectedAW;

            AssetService.CreateUpdateAssetWarehouse(vm.asset);
            loadAllAssetWarehouses(vm.asset.assetId);

            flash(['Saved new Warehouse for asset : ' + vm.asset.serialNumber ]);
        }

        function assetWarehouseChanged() {
            console.log("assetWarehouseNotChanged ?");
            console.log(vm.asset);
            vm.isAssetWarehouseChanged = false;

            /*
            if(!vm.asset) {
                vm.isAssetWarehouseChanged = true;
            }
            if (!vm.asset.warehouse) {
                vm.isAssetWarehouseChanged = true;
            }
            if (!vm.currentAsset) {
                vm.isAssetWarehouseChanged = true;
            }
            var warehouseId = parseInt(vm.asset.warehouse.warehouseId);
            var currentWarehouseId = parseInt(vm.currentAsset.warehouse.warehouseId);
            if (warehouseId != currentWarehouseId){
                vm.isAssetWarehouseChanged = false;
            }*/
            // flash(['Saved new Warehouse for asset : ' + vm.asset.serialNumber ]);
        }

        function exportData () {
            var blob = new Blob([document.getElementById('selected-assets-table').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "selected_assets.xls");
        }


        /*$scope.$watch('vm.assetSearch.assetTypeId', function (value) {
            assetSearchNoFieldsSet();
        });*/

        // || !SharedProperties.isEmpty(vm.assetSearch.assetModelId) || !SharedProperties.isEmpty(vm.assetSearch.assetBrandId)
        function assetSearchNoFieldsSet() {
           if (vm.assetSearch.assetTypeId || vm.assetSearch.serialNumber
               || vm.assetSearch.assetModelId || vm.assetSearch.assetBrandId) {
             vm.isAssetSearchNoFieldsSet = false;
           } else {
               vm.isAssetSearchNoFieldsSet = true;
           }
        }

        function findAssets() {
            console.log(vm.assetSearch);
            AssetService.FindAllAssets(vm.assetSearch)
                .then(function (assets) {
                    vm.allAssets = assets.data;
                });

        }

        /**
         * Load methods starting here.
         */

        function loadAllAssetTypes() {
            AssetService.GetAllAssetTypes()
                .then(function (assetTypes) {
                    vm.allAssetTypes = assetTypes.data;
                });
            // ---------------------------------------------------------------------------------------------------------------------
            // private Long assetTypeId;
            // private String assetTypeNumber;

            // Dell/Acer/hp/
            // private String assetTypeName;

            // private String description;

            // desktop
            // private String formFactor;

            // ---------------------------------------------------------------------------------------------------------------------
            vm.allAssetTypesMockData = [
                {
                    assetTypeId:1,
                    assetTypeNumber: 'assetTypeNumber 1',
                    assetTypeName: 'assetTypeName 1',
                    description: 'description 1',
                    formFactor: "formFactor desktop"

                },
                {
                    assetTypeId:2,
                    assetTypeNumber: 'assetTypeNumber 2',
                    assetTypeName: 'assetTypeName 2',
                    description: 'description 2',
                    formFactor: "formFactor laptop"

                },{
                    assetTypeId:3,
                    assetTypeNumber: 'assetTypeNumber 3',
                    assetTypeName: 'assetTypeName 3',
                    description: 'description 3',
                    formFactor: "formFactor desktop"

                },{
                    assetTypeId:4,
                    assetTypeNumber: 'assetTypeNumber 4',
                    assetTypeName: 'assetTypeName 4',
                    description: 'description 4',
                    formFactor: "formFactor desktop"

                },{
                    assetTypeId:5,
                    assetTypeNumber: 'assetTypeNumber 5',
                    assetTypeName: 'assetTypeName 5',
                    description: 'description 5',
                    formFactor: "formFactor laptop"

                }
            ];
        }

        function loadAllWarehouses() {
            GeneralService.GetAllWarehouses()
                .then(function (warehouses) {
                    vm.allWarehouses = warehouses.data;
                });

        }

        function loadAllAssetWarehouses(assetId) {
            GeneralService.GetAllAssetWarehouses(assetId)
                .then(function (asstWarehouses) {
                    SharedProperties.setAllAssetWarehouses(asstWarehouses.data);
                    console.log(SharedProperties.getAllAssetWarehouses());
                });

        }

        function loadAllAssetBrands() {
            AssetService.GetAllAssetBrands()
                .then(function (assetBrands) {
                    vm.allAssetBrands = assetBrands.data;
                });

            // private Long assetBrandId;
            // private String brandNumber;
            // Dell/Acer/hp/
            // private String brandName;
            // private String description;
            //Acer
            // private String manufacturer;
        // ---------------------------------------------------------------------------------------------------------------------
            vm.allAssetBrandsMockData = [
                {
                    assetBrandId:1,
                    brandNumber: 'brandNumber 1',
                    brandName: 'brandName Acer 1',
                    description: 'description 1',
                    manufacturer: "manufacturer Acer"

                },
                {
                    assetBrandId:2,
                    brandNumber: 'brandNumber 2',
                    brandName: 'brandName Acer 2',
                    description: 'description 2',
                    manufacturer: "manufacturer Acer"

                },{
                    assetBrandId:3,
                    brandNumber: 'brandNumber 3',
                    brandName: 'brandName Dell 3',
                    description: 'description 3',
                    manufacturer: "manufacturer Dell"

                },{
                    assetBrandId:4,
                    brandNumber: 'brandNumber 4',
                    brandName: 'brandName Dell 4',
                    description: 'description 4',
                    manufacturer: "manufacturer Dell"

                },{
                    assetBrandId:5,
                    brandNumber: 'brandNumber 5',
                    brandName: 'brandName Dell 5',
                    description: 'description 5',
                    manufacturer: "manufacturer Dell"

                }
            ];
        }

        function loadAllAssetModels() {
            AssetService.GetAllAssetModels()
                .then(function (assetModels) {
                    vm.allAssetModels = assetModels.data;
                });
            // private Long assetModelId;
            // private String modelNumber;
            // Veriton 3900Pro
            // private String modelName;
            // private String description;

            // ---------------------------------------------------------------------------------------------------------------------
            vm.allAssetModelsMockData = [
                {
                    assetModelId:1,
                    modelNumber: 'modelNumber 1',
                    modelName: 'modelName Veriton 3900Pro 1',
                    description: 'description 1'

                },
                {
                    assetModelId:2,
                    modelNumber: 'modelNumber 2',
                    modelName: 'modelName Veriton 3900Pro 2',
                    description: 'description 2'

                },{
                    assetModelId:3,
                    modelNumber: 'modelNumber 3',
                    modelName: 'modelName Veriton 3900Pro 3',
                    description: 'description 3'

                },{
                    assetModelId:4,
                    modelNumber: 'modelNumber 4',
                    modelName: 'modelName Veriton 3900Pro 4',
                    description: 'description 4'

                },{
                    assetModelId:5,
                    modelNumber: 'modelNumber 5',
                    modelName: 'modelName Veriton 3900Pro 5',
                    description: 'description 5'

                }
            ];
        }

        function loadAllAssetCodes() {
            AssetService.GetAllAssetCodes()
                .then(function (assetCodes) {
                    vm.allAssetCodes = assetCodes.data;
                   /* _.each(vm.allAssetCodes, function(assetCode) {
                        var assCode = {};
                        assCode.assetCodeId = assetCode.assetCodeId;
                        assCode.assetCodeName = assetCode.assetType.assetTypeName +' - '+ assetCode.assetBrand.brandName +' - '+ assetCode.assetModel.modelName;
                        vm.allAssetCodesSelectData.push(assCode);
                        console.log(vm.allAssetCodesSelectData);
                    });*/
                });

            // private Long assetCodeId;
            // private AssetType assetType;
            // private AssetBrand assetBrand;
            // private AssetModel assetModel;
            // private Long packagedQuantity;
            // Intel vPro Technology
            // private String platformTechnology;
            // Small form factor
            // private String assetFormFactor;
            // silver black
            // private String colour;

        // ---------------------------------------------------------------------------------------------------------------------
            vm.allAssetCodesMockData = [
                {
                    assetCodeId:1,
                    assetType:{
                                    assetTypeId:1,
                                    assetTypeNumber: 'assetTypeNumber 1',
                                    assetTypeName: 'assetTypeName 1',
                                    description: 'description 1',
                                    formFactor: "formFactor desktop"
                                  },
                    assetBrand:{
                                    assetBrandId:3,
                                    brandNumber: 'brandNumber 3',
                                    brandName: 'brandName Dell 3',
                                    description: 'description 3',
                                    manufacturer: "manufacturer Dell"
                                },
                    assetModel:{
                                    assetModelId:5,
                                    modelNumber: 'modelNumber 5',
                                    modelName: 'modelName Veriton 3900Pro 5',
                                    description: 'description 5'
                                },
                    packagedQuantity: '1',
                    platformTechnology: 'Intel vPro Technology 1',
                    assetFormFactor: 'Small form factor 1',
                    colour: 'colour black 1'

                },
                {
                    assetCodeId:2,
                    assetType:{
                        assetTypeId:1,
                        assetTypeNumber: 'assetTypeNumber 1',
                        assetTypeName: 'assetTypeName 1',
                        description: 'description 1',
                        formFactor: "formFactor desktop"
                    },
                    assetBrand:{
                        assetBrandId:3,
                        brandNumber: 'brandNumber 3',
                        brandName: 'brandName Dell 3',
                        description: 'description 3',
                        manufacturer: "manufacturer Dell"
                    },
                    assetModel:{
                        assetModelId:5,
                        modelNumber: 'modelNumber 5',
                        modelName: 'modelName Veriton 3900Pro 5',
                        description: 'description 5'
                    },
                    packagedQuantity: '2',
                    platformTechnology: 'Intel vPro Technology 2',
                    assetFormFactor: 'Small form factor 2',
                    colour: 'colour black 2'

                },{
                    assetCodeId:3,
                    assetType:{
                        assetTypeId:1,
                        assetTypeNumber: 'assetTypeNumber 1',
                        assetTypeName: 'assetTypeName 1',
                        description: 'description 1',
                        formFactor: "formFactor desktop"
                    },
                    assetBrand:{
                        assetBrandId:3,
                        brandNumber: 'brandNumber 3',
                        brandName: 'brandName Dell 3',
                        description: 'description 3',
                        manufacturer: "manufacturer Dell"
                    },
                    assetModel:{
                        assetModelId:5,
                        modelNumber: 'modelNumber 5',
                        modelName: 'modelName Veriton 3900Pro 5',
                        description: 'description 5'
                    },
                    packagedQuantity: '3',
                    platformTechnology: 'Intel vPro Technology 3',
                    assetFormFactor: 'Small form factor 3',
                    colour: 'colour black 3'

                }
            ];
        }

        function loadAllAssetSoftwares() {
            AssetService.GetAllAssetSoftwares()
                .then(function (assetSoftwares) {
                    vm.allAssetSoftwares = assetSoftwares.data;
                });

            // private Long assetSoftwareId;
            // Windows
            // private String name;
            // private String description;
            // any value we might want to associate this with.
            // private Double value;
            // Miscrosoft
            // private String manufacturer;

            // ---------------------------------------------------------------------------------------------------------------------
            vm.allAssetSoftwaresMockData = [
                {
                    assetSoftwareId:1,
                    name: 'Windows',
                    description: 'Windows 7',
                    value: 1,
                    manufacturer: 'Miscrosoft'
                },
                {
                    assetSoftwareId:2,
                    name: 'Linux',
                    description: 'Ubuntu linux 14.2',
                    value: 4,
                    manufacturer: 'Linux'

                },{
                    assetSoftwareId:3,
                    name: 'Windows XP',
                    description: 'Windows XP',
                    value: 1,
                    manufacturer: 'Miscrosoft'

                },{
                    assetSoftwareId:4,
                    name: 'Linux',
                    description: 'Suse',
                    value: 4,
                    manufacturer: 'Linux'

                },{
                    assetSoftwareId:5,
                    name: 'Windows 8',
                    description: 'Windows 8',
                    value: 1,
                    manufacturer: 'Miscrosoft'

                }
            ];
        }

        function loadAllAssets() {
            /*AssetService.GetAllAssets()
                .then(function (assets) {
                    vm.allAssets = assets.data;
                });*/

            // private Long assetId;
            // private Warehouse warehouse;
            // private AssetCode assetCode;
            // private AssetSoftware assetSoftware;
            // private List<Attribute> attributes = new ArrayList<>();
            // private String serialNumber;
            // private String processor;
            // private String numberOfCores;

            // 512 MB / 8 GB (max)
            // private String ramInstalledSize;
            // DDR2 SDRAM

            // private String ramInstalledTechnology;

            /* extra ram properties.
             Memory Speed  533 MHz
             Features
             dual channel memory architecture
             */

            // private String hardDriveType;

            // private String hardDriveSize;

            // private Boolean wifi;

            // 3 years warranty
            // private String manufacturerWarranty;

            // private Double systemQuantity;

            // private Double actualQuantity;
            // private Double variance;


        // ---------------------------------------------------------------------------------------------------------------------
            vm.allAssetsMockData = [
                {
                    assetId:1,
                    warehouse: {
                                    warehouseId:1,
                                    name: 'Warehouse 1',
                                    description: 'description 1',
                                    warehouseType: "InBound",

                                    address:{},
                                    organisation:{name:'organisation 1'}
                                },
                    assetCode: {
                        assetCodeId:1,
                        assetType:{
                            assetTypeId:1,
                            assetTypeNumber: 'assetTypeNumber 1',
                            assetTypeName: 'assetTypeName 1',
                            description: 'description 1',
                            formFactor: "formFactor desktop"
                        },
                        assetBrand:{
                            assetBrandId:3,
                            brandNumber: 'brandNumber 3',
                            brandName: 'brandName Dell 3',
                            description: 'description 3',
                            manufacturer: "manufacturer Dell"
                        },
                        assetModel:{
                            assetModelId:5,
                            modelNumber: 'modelNumber 5',
                            modelName: 'modelName Veriton 3900Pro 5',
                            description: 'description 5'
                        },
                        packagedQuantity: '1',
                        platformTechnology: 'Intel vPro Technology 1',
                        assetFormFactor: 'Small form factor 1',
                        colour: 'colour black 1'

                    },
                    assetSoftware: {
                        assetSoftwareId:2,
                        name: 'Linux',
                        description: 'Ubuntu linux 14.2',
                        value: 4,
                        manufacturer: 'Linux'

                    },



                    attributes: [{name:'ram', value:'512MB'},{name:'has-mouse', value:'true'}],
                    serialNumber: 'serialNumber 1',
                    processor: 'processor 1',
                    numberOfCores: '1',
                    ramInstalledTechnology: 'DDR2 SDRAM 1',
                    hardDriveType: 'hardDriveType 1',
                    hardDriveSize: 'hardDriveSize 1',
                    wifi: 'true',
                    manufacturerWarranty: '3 year',
                    systemQuantity: '110',
                    actualQuantity: '110',
                    variance: "0"

                },
                {
                    assetId:2,
                    warehouse: {
                        warehouseId:2,
                        name: 'Warehouse 2',
                        description: 'description 2',
                        warehouseType: "InBound",

                        address:{},
                        organisation:{name:'organisation 1'}
                    },
                    assetCode: {
                        assetCodeId:1,
                        assetType:{
                            assetTypeId:1,
                            assetTypeNumber: 'assetTypeNumber 1',
                            assetTypeName: 'assetTypeName 1',
                            description: 'description 1',
                            formFactor: "formFactor desktop"
                        },
                        assetBrand:{
                            assetBrandId:3,
                            brandNumber: 'brandNumber 3',
                            brandName: 'brandName Dell 3',
                            description: 'description 3',
                            manufacturer: "manufacturer Dell"
                        },
                        assetModel:{
                            assetModelId:5,
                            modelNumber: 'modelNumber 5',
                            modelName: 'modelName Veriton 3900Pro 5',
                            description: 'description 5'
                        },
                        packagedQuantity: '1',
                        platformTechnology: 'Intel vPro Technology 1',
                        assetFormFactor: 'Small form factor 1',
                        colour: 'colour black 1'

                    },
                    assetSoftware: {
                        assetSoftwareId:2,
                        name: 'Linux',
                        description: 'Ubuntu linux 14.2',
                        value: 4,
                        manufacturer: 'Linux'

                    },



                    attributes: [{name:'ram', value:'512MB'},{name:'has-mouse', value:'true'}],
                    serialNumber: 'serialNumber 2',
                    processor: 'processor 2',
                    numberOfCores: '2',
                    ramInstalledTechnology: 'DDR2 SDRAM 2',
                    hardDriveType: 'hardDriveType 2',
                    hardDriveSize: 'hardDriveSize 2',
                    wifi: 'true',
                    manufacturerWarranty: '3 year',
                    systemQuantity: '110',
                    actualQuantity: '110',
                    variance: "0"

                },{
                    assetId:3,
                    warehouse: {
                                    warehouseId:2,
                                    name: 'Warehouse 2',
                                    description: 'description 2',
                                    warehouseType: "InBound",

                                    address:{},
                                    organisation:{name:'organisation 1'}
                                },
                    assetCode: {
                        assetCodeId:1,
                        assetType:{
                            assetTypeId:1,
                            assetTypeNumber: 'assetTypeNumber 1',
                            assetTypeName: 'assetTypeName 1',
                            description: 'description 1',
                            formFactor: "formFactor desktop"
                        },
                        assetBrand:{
                            assetBrandId:3,
                            brandNumber: 'brandNumber 3',
                            brandName: 'brandName Dell 3',
                            description: 'description 3',
                            manufacturer: "manufacturer Dell"
                        },
                        assetModel:{
                            assetModelId:5,
                            modelNumber: 'modelNumber 5',
                            modelName: 'modelName Veriton 3900Pro 5',
                            description: 'description 5'
                        },
                        packagedQuantity: '1',
                        platformTechnology: 'Intel vPro Technology 1',
                        assetFormFactor: 'Small form factor 1',
                        colour: 'colour black 1'

                    },
                    assetSoftware: {
                        assetSoftwareId:2,
                        name: 'Linux',
                        description: 'Ubuntu linux 14.2',
                        value: 4,
                        manufacturer: 'Linux'

                    },



                    attributes: [{name:'ram', value:'512MB'},{name:'has-mouse', value:'true'}],
                    serialNumber: 'serialNumber 3',
                    processor: 'processor 3',
                    numberOfCores: '3',
                    ramInstalledTechnology: 'DDR2 SDRAM 3',
                    hardDriveType: 'hardDriveType 3',
                    hardDriveSize: 'hardDriveSize 3',
                    wifi: 'true',
                    manufacturerWarranty: '3 year',
                    systemQuantity: '110',
                    actualQuantity: '110',
                    variance: "0"

                },{
                    assetId:4,
                    warehouse: {
                                    warehouseId:1,
                                    name: 'Warehouse 1',
                                    description: 'description 1',
                                    warehouseType: "InBound",

                                    address:{},
                                    organisation:{name:'organisation 1'}
                                },
                    assetCode: {
                        assetCodeId:1,
                        assetType:{
                            assetTypeId:1,
                            assetTypeNumber: 'assetTypeNumber 1',
                            assetTypeName: 'assetTypeName 1',
                            description: 'description 1',
                            formFactor: "formFactor desktop"
                        },
                        assetBrand:{
                            assetBrandId:3,
                            brandNumber: 'brandNumber 3',
                            brandName: 'brandName Dell 3',
                            description: 'description 3',
                            manufacturer: "manufacturer Dell"
                        },
                        assetModel:{
                            assetModelId:5,
                            modelNumber: 'modelNumber 5',
                            modelName: 'modelName Veriton 3900Pro 5',
                            description: 'description 5'
                        },
                        packagedQuantity: '1',
                        platformTechnology: 'Intel vPro Technology 1',
                        assetFormFactor: 'Small form factor 1',
                        colour: 'colour black 1'

                    },
                    assetSoftware: {
                        assetSoftwareId:2,
                        name: 'Linux',
                        description: 'Ubuntu linux 14.2',
                        value: 4,
                        manufacturer: 'Linux'

                    },



                    attributes: [{name:'ram', value:'512MB'},{name:'has-mouse', value:'true'}],
                    serialNumber: 'serialNumber 4',
                    processor: 'processor 4',
                    numberOfCores: '4',
                    ramInstalledTechnology: 'DDR2 SDRAM 4',
                    hardDriveType: 'hardDriveType 4',
                    hardDriveSize: 'hardDriveSize 4',
                    wifi: 'false',
                    manufacturerWarranty: '3 year',
                    systemQuantity: '110',
                    actualQuantity: '110',
                    variance: "0"

                },{
                    assetId:5,
                    warehouse: {
                                    warehouseId:1,
                                    name: 'Warehouse 1',
                                    description: 'description 1',
                                    warehouseType: "InBound",

                                    address:{},
                                    organisation:{name:'organisation 1'}
                                },
                    assetCode: {
                        assetCodeId:1,
                        assetType:{
                            assetTypeId:1,
                            assetTypeNumber: 'assetTypeNumber 1',
                            assetTypeName: 'assetTypeName 1',
                            description: 'description 1',
                            formFactor: "formFactor desktop"
                        },
                        assetBrand:{
                            assetBrandId:3,
                            brandNumber: 'brandNumber 3',
                            brandName: 'brandName Dell 3',
                            description: 'description 3',
                            manufacturer: "manufacturer Dell"
                        },
                        assetModel:{
                            assetModelId:5,
                            modelNumber: 'modelNumber 5',
                            modelName: 'modelName Veriton 3900Pro 5',
                            description: 'description 5'
                        },
                        packagedQuantity: '1',
                        platformTechnology: 'Intel vPro Technology 1',
                        assetFormFactor: 'Small form factor 1',
                        colour: 'colour black 1'

                    },
                    assetSoftware: {
                        assetSoftwareId:2,
                        name: 'Linux',
                        description: 'Ubuntu linux 14.2',
                        value: 4,
                        manufacturer: 'Linux'

                    },



                    attributes: [{name:'ram', value:'512MB'},{name:'has-mouse', value:'true'}],
                    serialNumber: 'serialNumber 1',
                    processor: 'processor 5',
                    numberOfCores: '5',
                    ramInstalledTechnology: 'DDR2 SDRAM 5',
                    hardDriveType: 'hardDriveType 5',
                    hardDriveSize: 'hardDriveSize 5',
                    wifi: 'false',
                    manufacturerWarranty: '3 year',
                    systemQuantity: '110',
                    actualQuantity: '110',
                    variance: "0"

                }
            ];
        }

        // used to manage accordions
        vm.tab = 1;
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



        // ----------------------------- Date code ---------------------------------------------------------------------

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
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        vm.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0;i<vm.events.length;i++){
                    var currentDay = new Date(vm.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return vm.events[i].status;
                    }
                }
            }

            return '';
        };

// ----------------------------- Date code -----------------------------------------------------------------------------

    }

})();
