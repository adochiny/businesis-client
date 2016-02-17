(function () {
    'use strict';

    angular
        .module('eManager')
        .factory('SharedProperties', SharedProperties);

    SharedProperties.$inject = ['$filter','$location'];
    function SharedProperties($filter, $location) {

        var dataLoadingImage = "";

        var props = {};

        var org = {};
        var user = {};
        // our clients
        // var businessPartner = {};

        var warehouse = {};

        // Asset details
        // AssetCode - contains AssetBrand, AssetModel and assetType
        var assetCode = {};

        var assetBrand = {};
        var assetModel = {};
        var assetType = {};

        // Asset contains AssetCode and AssetSoftware
        var asset = {};
        var assetSoftware = {};

        var allAssetWarehouses = [];

        // will develop this for later.
        // Request
        // Period

        props.getDataLoadingImage = getDataLoadingImage;
        // getters and setters
        props.getOrg = getOrg;
        props.setOrg = setOrg;

        // props.getBusinessPartner = getBusinessPartner;
        // props.setBusinessPartner = setBusinessPartner;

        props.getUser = getUser;
        props.setUser = setUser;

        props.getWarehouse = getWarehouse;
        props.setWarehouse = setWarehouse;

        // Assets getters and setters
        props.getAssetCode = getAssetCode;
        props.setAssetCode = setAssetCode;

        props.getAssetBrand = getAssetBrand;
        props.setAssetBrand = setAssetBrand;

        props.getAssetModel = getAssetModel;
        props.setAssetModel = setAssetModel;

        props.getAssetType = getAssetType;
        props.setAssetType = setAssetType;

        props.getAsset = getAsset;
        props.setAsset = setAsset;

        props.getAssetSoftware = getAssetSoftware;
        props.setAssetSoftware = setAssetSoftware;


        props.navigateToPage = navigateToPage;
        props.isEmpty = isEmpty;

        props.getAllAssetWarehouses = getAllAssetWarehouses;
        props.setAllAssetWarehouses = setAllAssetWarehouses;

        return props;


        // org getter and setter
        function getOrg() {
            return org;
        }
        function setOrg(value) {
            org = value;
        }

        function getDataLoadingImage() {
            return dataLoadingImage;
        }

        /*function getBusinessPartner() {
            return businessPartner;
        }
        function setBusinessPartner(value) {
            businessPartner = value;
        }*/

        // user getter and setter
        function getUser() {
            return user;
        }
        function setUser(value) {
            user = value;
        }

        // Warehouse getter and setter
        function getWarehouse() {
            return warehouse;
        }
        function setWarehouse(value) {
            warehouse = value;
        }

        // Assets getters and setters.
        function getAssetCode() {
            return assetCode;
        }
        function setAssetCode(value) {
            assetCode = value;
        }

        function getAssetType() {
            return assetType;
        }
        function setAssetType(value) {
            assetType = value;
        }

        function getAssetBrand() {
            return assetBrand;
        }
        function setAssetBrand(value) {
            assetBrand = value;
        }

        function getAssetModel() {
            return assetModel;
        }
        function setAssetModel(value) {
            assetModel = value;
        }

        function getAsset() {
            return asset;
        }
        function setAsset(value) {
            asset = value;
        }

        function getAssetSoftware() {
            return assetSoftware;
        }
        function setAssetSoftware(value) {
            assetSoftware = value;
        }

        function getAllAssetWarehouses() {
            return allAssetWarehouses;
        }
        function setAllAssetWarehouses(value) {
            allAssetWarehouses = value;
        }

        function navigateToPage(path){
            $location.path('/' + path);
        }

        function isEmpty(str) {
            // boolean (`true` if field is empty)
            return !str.replace(/^\s+/g, '').length;
        }


    }
})();