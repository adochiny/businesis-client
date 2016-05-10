(function () {
    'use strict';

    angular
        .module('eManager')
        .factory('BpService', BpService);

    BpService.$inject = ['$http', '$q'];
    function BpService($http, $q) {
        var service = {};

        service.GetAllBps = GetAllBps;
        service.GetInProgressBps = GetInProgressBps;
        service.GetCompletedBps = GetCompletedBps;
        service.SaveBp = SaveBp;

        service.GetInProgressCompanies = GetInProgressCompanies;
        service.GetCompleteCompanies = GetCompleteCompanies;
        service.GetAllCompanies = GetAllCompanies;

        service.SaveCompany = SaveCompany;
        service.SaveCompanyUser = SaveCompanyUser;
        service.GetBpById = GetBpById;
        service.GetCompanyUserByParentId = GetCompanyUserByParentId;
        service.GetCompanyCerts = GetCompanyCerts;

        service.GetAllCompanyDiagnosis = GetAllCompanyDiagnosis;
        service.SaveDiagnosis = SaveDiagnosis;
       /*
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.AuthenticateUsername = AuthenticateUsername;
        service.logoutUser = logoutUser;

        service.CreateUpdateUser = CreateUpdateUser;

        service.GetAllUserRoles = GetAllUserRoles;
        service.Update = Update;
        service.Delete = Delete;
        */

        return service;

        // var baseUrl = 'http://localhost:8080/iManager/user-management/';
        // http://localhost:8080/aManager/user-management/users/adonis

        function GetAllBps() {
            return $http.get('http://localhost:8081/businesis/company-bp/get-all-company-bp/BP')
                        .then(handleSuccess, handleError('Error getting all Business Partners'));
            /*
            var deferred = $q.defer();

            deferred.resolve({success: true,data: [{
                companyName:"ABSA",
                tradingAs:"Trading as1",
                registrationNumber:"Reg number1",
                "userId": 51,
                "created": "2015-06-14", "updated": "2015-06-14", "isactive": true,
                "createdby": 100, "updatedby": 100},{
                companyName:"FNB",
                tradingAs:"Trading as2",
                registrationNumber:"Reg number2",
                "userId": 5,
                "created": "2015-06-14", "updated": "2015-06-14", "isactive": true,
                "createdby": 100, "updatedby": 100}]});
            return deferred.promise;*/
        }

        function GetInProgressBps() {
            return $http.get('http://localhost:8081/businesis/company-bp/get-all-bps-for-company/INCOMPLETED')
                        .then(handleSuccess, handleError('Error getting all Business Partners'));
        }

        function GetCompletedBps() {
            return $http.get('http://localhost:8081/businesis/company-bp/get-all-bps-for-company/COMPLETED')
                        .then(handleSuccess, handleError('Error getting all Business Partners'));
        }

        function GetInProgressCompanies(parentId) {
            return $http.get('http://localhost:8081/businesis/company-bp/get-all-companies-for-bp/'+parentId+'/INCOMPLETED')
                        .then(handleSuccess, handleError('Error getting all Companies'));
        }

        function GetCompleteCompanies(parentId) {
            return $http.get('http://localhost:8081/businesis/company-bp/get-all-companies-for-bp/'+parentId+'/COMPLETED')
                        .then(handleSuccess, handleError('Error getting all Companies'));
        }

        function GetAllCompanies(parentId) {
            return $http.get('http://localhost:8081/businesis/company-bp/get-all-company-for-bp/'+parentId)
                        .then(handleSuccess, handleError('Error getting all Companies'));
        }

        function GetAllCompanyDiagnosis(parentId, companySection) {
            return $http.get('http://localhost:8081/businesis/company-bp/get-diagnosis-section-for-company/'+parentId + '/' + companySection)
                        .then(handleSuccess, handleError('Error getting all Company Diagnosis'));
        }

        function GetBpById(id) {
            return $http.get('http://localhost:8081/businesis/company-bp/get-company-bp-id/' + id)
                .then(handleSuccess, handleError('Error getting company by id'));
        }

        function GetCompanyUserByParentId(id) {
            return $http.get('http://localhost:8081/businesis/user-management/company-user/' + id)
                .then(handleSuccess, handleError('Error getting company user by parent id'));
        }

        function GetCompanyCerts(id) {
            return $http.get('http://localhost:8081/businesis/company-bp/get-all-companies-certs/' + id)
                .then(handleSuccess, handleError('Error getting company user by parent id'));
        }

        function GetByUsername(username) {
            return $http.get('http://localhost:8081/businesis/user-management/users/username/' + username)
                .then(handleSuccess, handleError('Error getting user by username'));
        }

        function AuthenticateUsername(username, password) {
            console.log("Username - " + username);
            var userDto = {};
            userDto.username = username;
            userDto.password = password;
            // return $http.post('http://localhost:8080/risk-rev/user-management/authenticate-username', userDto).then(handleSuccess, handleError('Error auth by username'));

            var deferred = $q.defer();
            /*$http.get('/api/v1/movies/' + movie)
                .success(function(data) {
                    deferred.resolve({
                            title: data.title,
                    cost: data.price});
            }).error(function(msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            });*/
            deferred.resolve({success: true,data:  {
                "userId": 51,
                "created": "2015-06-14", "updated": "2015-06-14", "isactive": true,
                "createdby": 100, "updatedby": 100,
                "username": "adonis@fnb.co.za", "firstName": "Adonis",
                "firstName1": null, "firstName2": null, "firstName3": null,
                "surname": "Mhlanga", "password": "123", "idNumber": null,
                "dateOfBirth": 1434277284914, "gender": null, "title": null,
                "notes": null, "jobTitle": null, "description": null,

                "userRole": {
                    "created": "2015-06-14",
                    "updated": "2015-06-14",
                    "isactive": true,
                    "createdby": 100,
                    "updatedby": 100,
                    "roleId": 51,
                    "name": "Admin",
                    "description": null,
                    "userList": []
                },

                "organisation": null,

                "contactDetails": {
                    "created": "2015-06-14",
                    "updated": "2015-06-14",
                    "isactive": true,
                    "createdby": 100,
                    "updatedby": 100,
                    "contactDetailsId": 51,
                    "workNumber": null,
                    "homeNumber": null,
                    "cellNumber": "0728030942",
                    "otherNumber": null,
                    "faxNumber": null,
                    "email": "adochiny@gmail.com",
                    "website": null,
                    "twitter": "@adochiny",
                    "facebook": null,
                    "linkedin": null },

                "address": null
            }});
            return deferred.promise;

        }



        function SaveBp(bp) {
            console.log(bp);
            return $http.post('http://localhost:8081/businesis/company-bp/create-update-company-bp', bp)
                .then(handleSuccess, handleError);
            /*
            var deferred = $q.defer();
            deferred.notify('About to save ' + bp + '.');
            deferred.resolve(bp);
            // deferred.reject('Greeting ' + name + ' is not allowed.');
            return deferred.promise;
            */
        }

        function SaveCompany (company) {
            console.log(company);
            // return $http.post('http://localhost:8080/risk-rev/user-management/create-update-user', user)
            // .then(handleSuccess, handleError);
            var deferred = $q.defer();
            deferred.notify('About to return ' + company + '.');
            deferred.resolve(company);
            // deferred.reject('Greeting ' + name + ' is not allowed.');
            return deferred.promise;
        }

        function SaveCompanyUser (companyUser) {
            console.log(companyUser);
             return $http.post('http://localhost:8081/businesis/user-management/create-update-user', companyUser)
             .then(handleSuccess, handleError);

            /*
            var deferred = $q.defer();
            deferred.notify('About to return ' + companyUser + '.');
            deferred.resolve(companyUser);
            // deferred.reject('Greeting ' + name + ' is not allowed.');
            return deferred.promise;*/
        }

        function SaveDiagnosis(diagnosis) {
            console.log(diagnosis);
            return $http.post('http://localhost:8081/businesis/company-bp/create-update-company-diagnosis', diagnosis)
                .then(handleSuccess, handleError);
        }

        // ---------------------User stuff --------------------------------------------------------------------------------------------

        function logoutUser(user) {
            console.log(user);
            return $http.post('http://localhost:8080/risk-rev/user-management/logout-user', user).then(handleSuccess, handleError);
        }

        function GetAllUserRoles() {
            return $http.get('http://localhost:8080/risk-rev/user-management/user-roles').then(handleSuccess, handleError('Error getting all userRoles'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function baseUrl() {
            return 'http://localhost:8080/risk-rev/user-management/';
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

        // ---------------------------MOCKS----------------------------------------------------------------------------------

        var user = {
            "userId": 51,
            "created": "2015-06-14", "updated": "2015-06-14", "isactive": true,
            "createdby": 100, "updatedby": 100,
            "username": "adonis@fnb.co.za", "firstName": "Adonis",
            "firstName1": null, "firstName2": null, "firstName3": null,
            "surname": "Mhlanga", "password": "123", "idNumber": null,
            "dateOfBirth": 1434277284914, "gender": null, "title": null,
            "notes": null, "jobTitle": null, "description": null,

            "userRole": {
                "created": "2015-06-14",
                "updated": "2015-06-14",
                "isactive": true,
                "createdby": 100,
                "updatedby": 100,
                "roleId": 51,
                "name": "Admin",
                "description": null,
                "userList": []
            },

            "organisation": null,

            "contactDetails": {
                "created": "2015-06-14",
                "updated": "2015-06-14",
                "isactive": true,
                "createdby": 100,
                "updatedby": 100,
                "contactDetailsId": 51,
                "workNumber": null,
                "homeNumber": null,
                "cellNumber": "0728030942",
                "otherNumber": null,
                "faxNumber": null,
                "email": "adochiny@gmail.com",
                "website": null,
                "twitter": "@adochiny",
                "facebook": null,
                "linkedin": null },

            "address": null
        };
        // ---------------------------MOCKS----------------------------------------------------------------------------------
    }

})();
