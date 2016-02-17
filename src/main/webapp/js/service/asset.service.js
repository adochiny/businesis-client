(function () {
    'use strict';

    var baseUrl = 'http://localhost:8080/iManager/asset-management/';

    angular
        .module('eManager')
        .factory('AssetService', AssetService);

    AssetService.$inject = ['$http', '$q'];
    function AssetService($http, $q) {
        var service = {};

        service.GetAllAssetTypes = GetAllAssetTypes;
        service.CreateUpdateAssetType = CreateUpdateAssetType;

        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        service.GetAllAssetBrands = GetAllAssetBrands;
        service.CreateUpdateAssetBrand = CreateUpdateAssetBrand;

        service.GetAllAssetModels = GetAllAssetModels;
        service.CreateUpdateAssetModel = CreateUpdateAssetModel;

        service.GetAllAssetCodes = GetAllAssetCodes;
        service.CreateUpdateAssetCode = CreateUpdateAssetCode;

        service.GetAllAssetSoftwares = GetAllAssetSoftwares;
        service.CreateUpdateAssetSoftware = CreateUpdateAssetSoftware;

        service.FindAllAssets = FindAllAssets;
        service.CreateUpdateAsset = CreateUpdateAsset;
        service.CreateUpdateAssetWarehouse = CreateUpdateAssetWarehouse;

        return service;

        function GetAllAssetTypes() {
            return $http.get('http://localhost:8080/iManager/asset-management/' + 'asset-types').then(handleSuccess, handleError('Error getting asset types'));
        }

        function CreateUpdateAssetType(assetType) {
            console.log(assetType);
            return $http.post('http://localhost:8080/iManager/asset-management/' + 'create-update-asset-type', assetType).then(handleSuccess, handleError('Error saving asset type'));
        }

        // AssetBrands
        function GetAllAssetBrands() {
            return $http.get('http://localhost:8080/iManager/asset-management/' + 'asset-brands').then(handleSuccess, handleError('Error getting asset brands'));
        }

        function CreateUpdateAssetBrand(assetBrand) {
            console.log(assetBrand);
            return $http.post('http://localhost:8080/iManager/asset-management/' + 'create-update-asset-brand', assetBrand).then(handleSuccess, handleError('Error saving asset brand'));
        }

        // Asset Models
        function GetAllAssetModels() {
            return $http.get('http://localhost:8080/iManager/asset-management/' + 'asset-models').then(handleSuccess, handleError('Error getting asset models'));
        }

        function CreateUpdateAssetModel(assetModel) {
            console.log(assetModel);
            return $http.post('http://localhost:8080/iManager/asset-management/' + 'create-update-asset-model', assetModel).then(handleSuccess, handleError('Error saving asset model'));
        }

        // Asset Codes
        function GetAllAssetCodes() {
            return $http.get('http://localhost:8080/iManager/asset-management/' + 'asset-codes').then(handleSuccess, handleError('Error getting asset codes'));
        }

        function CreateUpdateAssetCode(assetCode) {
            console.log(assetCode);
            return $http.post('http://localhost:8080/iManager/asset-management/' + 'create-update-asset-code', assetCode).then(handleSuccess, handleError('Error saving asset code'));
        }

        // Asset Softwares
        function GetAllAssetSoftwares() {
            return $http.get('http://localhost:8080/iManager/asset-management/' + 'asset-softwares').then(handleSuccess, handleError('Error getting asset softwares'));
        }

        function CreateUpdateAssetSoftware(assetSoftware) {
            console.log(assetSoftware);
            return $http.post('http://localhost:8080/iManager/asset-management/' + 'create-update-asset-software', assetSoftware).then(handleSuccess, handleError('Error saving asset software'));
        }

        // Assets
        function FindAllAssets(aSeach) {
            console.log(aSeach);
            return $http.post('http://localhost:8080/iManager/asset-management/' + 'assets',aSeach).then(handleSuccess, handleError('Error getting assets'));
        }

        function CreateUpdateAsset(asset) {
            console.log(asset);
            return $http.post('http://localhost:8080/iManager/asset-management/' + 'create-update-asset', asset).then(handleSuccess, handleError('Error saving asset'));
        }

        function CreateUpdateAssetWarehouse(asset) {
            console.log(asset);
            return $http.post('http://localhost:8080/iManager/asset-management/' + 'create-update-asset-wh-hist', asset).then(handleSuccess, handleError('Error saving asset'));
        }

        /**
         *
         */

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('http://localhost:8080/iManager/user-management/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            // return $http.post('http://localhost:8080/iManager/user-management/create-user', user).then(handleSuccess, handleError);
            console.log(user);

            var deferred = $q.defer();
            deferred.notify('About to return ' + user + '.');
            deferred.resolve(user);
            // deferred.reject('Greeting ' + name + ' is not allowed.');
            return deferred.promise;

        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function baseUrl() {
            return 'http://localhost:8080/iManager/user-management/';
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
