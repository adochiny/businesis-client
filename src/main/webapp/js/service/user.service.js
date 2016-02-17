(function () {
    'use strict';

    angular
        .module('eManager')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q'];
    function UserService($http, $q) {
        var service = {};

        service.GetAllUsers = GetAllUsers;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.AuthenticateUsername = AuthenticateUsername;
        service.logoutUser = logoutUser;

        service.CreateUpdateUser = CreateUpdateUser;

        service.GetAllUserRoles = GetAllUserRoles;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        // var baseUrl = 'http://localhost:8080/iManager/user-management/';
        // http://localhost:8080/aManager/user-management/users/adonis

        function GetAllUsers() {
            return $http.get('http://localhost:8080/risk-rev/user-management/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('http://localhost:8080/risk-rev/user-management/users/username/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function AuthenticateUsername(username, password) {
            console.log("Username - " + username);
            var userDto = {};
            userDto.username = username;
            userDto.password = password;
            return $http.post('http://localhost:8080/risk-rev/user-management/authenticate-username', userDto).then(handleSuccess, handleError('Error auth by username'));
        }

        function CreateUpdateUser(user) {
            console.log(user);
            return $http.post('http://localhost:8080/risk-rev/user-management/create-update-user', user).then(handleSuccess, handleError);

            /*
            var deferred = $q.defer();
            deferred.notify('About to return ' + user + '.');
            deferred.resolve(user);
            // deferred.reject('Greeting ' + name + ' is not allowed.');
            return deferred.promise;*/

        }

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
    }

})();
