/**
 * General service to be used by Org and warehouse and other general items.
 * http://localhost:8080/iManager/general-management/organisations
 * http://localhost:8080/iManager/general-management/warehouses
 */
(function () {
    'use strict';

    var baseUrl = 'http://localhost:8080/iManager/general-management/';

    angular
        .module('eManager')
        .factory('GeneralService', GeneralService);

    GeneralService.$inject = ['$http', '$q'];
    function GeneralService($http, $q) {
        var service = {};
            service.GetAllOrgs = GetAllOrgs;
            service.CreateUpdateOrg = CreateUpdateOrg;

            service.GetAllWarehouses = GetAllWarehouses;
            service.GetAllAssetWarehouses = GetAllAssetWarehouses;
            service.CreateUpdateWarehouse = CreateUpdateWarehouse;
        return service;

        function GetAllOrgs() {
            return $http.get('http://localhost:8080/iManager/general-management/' + 'organisations').then(handleSuccess, handleError('Error getting orgs'));
        }

        function CreateUpdateOrg(org) {
            console.log(org);
            return $http.post('http://localhost:8080/iManager/general-management/' + 'create-update-organisation', org).then(handleSuccess, handleError('Error saving org'));
        }

        // warehouses
        function GetAllWarehouses() {
            return $http.get('http://localhost:8080/iManager/general-management/' + 'warehouses').then(handleSuccess, handleError('Error getting warehouses'));
        }

        // GetAllAssetWarehouses
        function GetAllAssetWarehouses(assetId) {
            console.log(assetId);
            return $http.get('http://localhost:8080/iManager/general-management/' + 'asset-warehouses/'+assetId).then(handleSuccess, handleError('Error getting assetWarehouses'));
        }

        function CreateUpdateWarehouse(warehouse) {
            console.log(warehouse);
            return $http.post('http://localhost:8080/iManager/general-management/' + 'create-update-warehouse', warehouse).then(handleSuccess, handleError('Error saving warehouse'));
        }

        function handleSuccess(data) {
            data.success = true;
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
