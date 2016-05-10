﻿(function () {
    'use strict';

    angular
        .module('eManager')
        .factory('SharedProperties', SharedProperties);

    SharedProperties.$inject = ['$filter','$location'];
    function SharedProperties($filter, $location) {

        var dataLoadingImage = "";

        var props = {};

        var bp = {};
        var bpList = undefined;
        var companyList = undefined;
        var company = {};
        var companyUser = {};
        var companyCert = {};

        // diagnosis
        var Governance = {};
        var TaxCompliance = {};
        var Labour = {};
        var SafetyHealth = {};
        var Standards = {};
        var BBBEE = {};
        var Production = {};
        var SalesMarketing = {};
        var InformationTechnology = {};
        var FinancialControlsManagement = {};
        var TechnicalSiteVisit = {};
        var IntellectualProperty = {};
        var RiskManagement = {};



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

        props.getDataLoadingImage = getDataLoadingImage;

        props.getBp = getBp;
        props.setBp = setBp;

        props.getBpList = getBpList;
        props.setBpList = setBpList;

        props.getCompanyList = getCompanyList;
        props.setCompanyList = setCompanyList;
        props.getCompany = getCompany;
        props.setCompany = setCompany;

        props.getCompanyUser = getCompanyUser;
        props.setCompanyUser = setCompanyUser;

        props.getCompanyCert = getCompanyCert;
        props.setCompanyCert = setCompanyCert;

// ------------------------- Diagnosis ---------------------------------------------------------------------------------
        props.getGovernance = getGovernance;
        props.setGovernance = setGovernance;

        props.getTaxCompliance = getTaxCompliance;
        props.setTaxCompliance = setTaxCompliance;

        props.getLabour = getLabour;
        props.setLabour = setLabour;

        props.getSafetyHealth = getSafetyHealth;
        props.setSafetyHealth = setSafetyHealth;

        props.getStandards = getStandards;
        props.setStandards = setStandards;

        props.getBBBEE = getBBBEE;
        props.setBBBEE = setBBBEE;

        props.getProduction = getProduction;
        props.setProduction = setProduction;

        props.getSalesMarketing = getSalesMarketing;
        props.setSalesMarketing = setSalesMarketing;

        props.getInformationTechnology = getInformationTechnology;
        props.setInformationTechnology = setInformationTechnology;

        props.getFinancialControlsManagement = getFinancialControlsManagement;
        props.setFinancialControlsManagement = setFinancialControlsManagement;

        props.getTechnicalSiteVisit = getTechnicalSiteVisit;
        props.setTechnicalSiteVisit = setTechnicalSiteVisit;

        props.getIntellectualProperty = getIntellectualProperty;
        props.setIntellectualProperty = setIntellectualProperty;

        props.getRiskManagement = getRiskManagement;
        props.setRiskManagement = setRiskManagement;

// ------------------------- Diagnosis ---------------------------------------------------------------------------------


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


        props.CacheProvider = CacheProvider;
        // ex of use :  var reg = cache.get(c) || cache.set(c, new RegExp("(?:^|\\s+)" + c + "(?:\\s+|$)"));

        return props;


        // org getter and setter
        function getBp() {
            return bp;
        }
        function setBp(value) {
            bp = value;
        }

        function getBpList() {
            return bpList;
        }
        function setBpList(value) {
            bpList = value;
        }

        function getCompanyList() {
            return companyList;
        }
        function setCompanyList(value) {
            companyList = value;
        }

        function getCompany() {
            return company;
        }
        function setCompany(value) {
            company = value;
        }

        function getCompanyUser() {
            return companyUser;
        }
        function setCompanyUser(value) {
            companyUser = value;
        }

        function getCompanyCert() {
            return companyCert;
        }
        function setCompanyCert(value) {
            companyCert = value;
        }

// --------------------------------- Diagnosis getters and setters -----------------------------------------------------

        function getGovernance() {
            return Governance;
        }
        function setGovernance(value) {
            Governance = value;
        }

        function getTaxCompliance() {
            return TaxCompliance;
        }
        function setTaxCompliance(value) {
            TaxCompliance = value;
        }

        function getLabour() {
            return Labour;
        }
        function setLabour(value) {
            Labour = value;
        }

        function getSafetyHealth() {
            return SafetyHealth;
        }
        function setSafetyHealth(value) {
            SafetyHealth = value;
        }

        function getStandards() {
            return Standards;
        }
        function setStandards(value) {
            Standards = value;
        }

        function getBBBEE() {
            return BBBEE;
        }
        function setBBBEE(value) {
            BBBEE = value;
        }

        function getProduction() {
            return Production;
        }
        function setProduction(value) {
            Production = value;
        }

        function getSalesMarketing() {
            return SalesMarketing;
        }
        function setSalesMarketing(value) {
            SalesMarketing = value;
        }

        function getInformationTechnology() {
            return InformationTechnology;
        }
        function setInformationTechnology(value) {
            InformationTechnology = value;
        }

        function getFinancialControlsManagement() {
            return FinancialControlsManagement;
        }
        function setFinancialControlsManagement(value) {
            FinancialControlsManagement = value;
        }

        function getTechnicalSiteVisit() {
            return TechnicalSiteVisit;
        }
        function setTechnicalSiteVisit(value) {
            TechnicalSiteVisit = value;
        }

        function getIntellectualProperty() {
            return IntellectualProperty;
        }
        function setIntellectualProperty(value) {
            IntellectualProperty = value;
        }

        function getRiskManagement() {
            return RiskManagement;
        }
        function setRiskManagement(value) {
            RiskManagement = value;
        }

// --------------------------------- Diagnosis getters and setters -----------------------------------------------------





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

        var CacheProvider = {
            _cache:{},

            /**
             * {String} k - the key
             * {Boolean} local - get this from local storage?
             * {Boolean} o - is the value you put in local storage an object?
             */
            get: function(k, local, o) {
                if (local && CacheProvider.hasLocalStorage) {
                    var action = o ? 'getObject' : 'getItem';
                    return localStorage[action](k) || undefined;
                } else {
                    return this._cache[k] || undefined;
                }
            },


            /**
             * {String} k - the key
             * {Object} v - any kind of value you want to store
             * however only objects and strings are allowed in local storage
             * {Boolean} local - put this in local storage
             */
            set: function(k, v, local) {
                if (local && CacheProvider.hasLocalStorage) {
                    if (typeof v !== 'string') {
                        // make assumption if it's not a string, then we're storing an object
                        localStorage.setObject(k, v);
                    } else {
                        try {
                            localStorage.setItem(k, v);
                        } catch (ex) {
                            if (ex.name == 'QUOTA_EXCEEDED_ERR') {
                                // developer needs to figure out what to start invalidating
                                throw new Exception(v);
                                return;
                            }
                        }
                    }
                } else {
                    // put in our local object
                    this._cache[k] = v;
                }
                // return our newly cached item
                return v;
            },


            /**
             * {String} k - the key
             * {Boolean} local - put this in local storage
             * {Boolean} o - is this an object you want to put in local storage?
             */
            clear: function(k, local, o) {
                if (local && CacheProvider.hasLocalStorage) {
                    localStorage.removeItem(k);
                }
                // delete in both caches - doesn't hurt.
                delete this._cache[k];
            }


        };
    }
})();