(function () {
    'use strict';

    angular
        .module('eManager')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['AuthenticationService', '$location','$scope','$rootScope'];
    function MenuController(AuthenticationService, $location, $scope, $rootScope) {
        $scope.currentUser = $rootScope.globals.currentUser;

        (function initController() {
            // reset register form
            $scope.currentUser = $rootScope.globals.currentUser;
        })();

        $scope.logout = function() {
            AuthenticationService.ClearCredentials($scope.currentUser);
            $scope.currentUser = null;
            $rootScope.globals.currentUser = null;
            $location.path('/login');
        };

    }

})();
