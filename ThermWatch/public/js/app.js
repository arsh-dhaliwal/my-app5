// app.js - Main Angular application file for ThermWatch

(function() {
    'use strict';

    // Define the main module and inject dependencies
    angular.module('ThermWatch', ['ngRoute', 'chart.js'])
        .config(['$routeProvider', function($routeProvider) {
            // Configure routes for the application
            $routeProvider
                .when('/', {
                    templateUrl: 'views/dashboard.html',
                    controller: 'DashboardController'
                })
                .when('/settings', {
                    templateUrl: 'views/settings.html',
                    controller: 'SettingsController'
                })
                .when('/daq-config', {
                    templateUrl: 'views/daq-config.html',
                    controller: 'DAQConfigController'
                })
                .when('/alerts', {
                    templateUrl: 'views/alerts.html',
                    controller: 'AlertsController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }])
        .run(['$rootScope', function($rootScope) {
            // Initialize global state variables
            $rootScope.darkMode = false;
            $rootScope.selectedPlant = null;
            $rootScope.selectedAsset = null;
            $rootScope.temperatureUnit = 'Celsius';

            // Function to toggle dark mode
            $rootScope.toggleDarkMode = function() {
                $rootScope.darkMode = !$rootScope.darkMode;
            };

            // Function to toggle temperature unit
            $rootScope.toggleTemperatureUnit = function() {
                $rootScope.temperatureUnit = $rootScope.temperatureUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius';
            };

            // Function to update selected plant and asset
            $rootScope.updateSelection = function(plant, asset) {
                $rootScope.selectedPlant = plant;
                $rootScope.selectedAsset = asset;
            };
        }])
        .controller('MainController', ['$scope', function($scope) {
            // Main controller for the application
            $scope.appName = 'ThermWatch';
            $scope.companyName = '';

            // Function to launch app configurations on first start
            $scope.launchAppConfigurations = function() {
                // TODO: Implement launchAppConfigurations logic
            };

            // Function to handle demo mode activation
            $scope.activateDemoMode = function() {
                // TODO: Implement activateDemoMode logic
            };
        }])
        .controller('DashboardController', ['$scope', function($scope) {
            // Controller for the dashboard page
            // TODO: Implement DashboardController logic
        }])
        .controller('SettingsController', ['$scope', function($scope) {
            // Controller for the settings page
            // TODO: Implement SettingsController logic
        }])
        .controller('DAQConfigController', ['$scope', function($scope) {
            // Controller for the DAQ configuration page
            // TODO: Implement DAQConfigController logic
        }])
        .controller('AlertsController', ['$scope', function($scope) {
            // Controller for the alerts and alarms page
            // TODO: Implement AlertsController logic
        }]);

    // Bootstrap the Angular application
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['ThermWatch']);
    });
})();