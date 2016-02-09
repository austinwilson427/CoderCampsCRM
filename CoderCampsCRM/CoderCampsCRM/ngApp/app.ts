﻿namespace MyApp {

    angular.module('MyApp', ['ngRoute', 'ngResource', 'ui.bootstrap']).config(($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
        $routeProvider
            .when('/', {
                templateUrl: '/ngApp/views/home.html',
                controller: MyApp.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .when('/about', {
                templateUrl: '/ngApp/views/about.html',
                controller: MyApp.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .when('/login', {
                templateUrl: '/ngApp/views/login.html',
                controller: MyApp.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .when('/register', {
                templateUrl: '/ngApp/views/register.html',
                controller: MyApp.Controllers.RegisterController,
                controllerAs: 'vm'
            })
            .when('/tasks', {
                templateUrl: '/ngApp/views/tasks.html',
                controller: MyApp.Controllers.HomeController,
                controllerAs: 'vm'
            })
            .when('/externalLogin', {
                templateUrl: '/ngApp/views/externalLogin.html',
                controller: MyApp.Controllers.ExternalLoginController,
                controllerAs: 'controller'
            })
            
            .when('/externalRegister', {
                templateUrl: '/ngApp/views/externalRegister.html',
                controller: MyApp.Controllers.ExternalRegisterController,
                controllerAs: 'controller'
            })
            .when('/confirmEmail', {
                templateUrl: '/ngApp/views/confirmEmail.html',
                controller: MyApp.Controllers.ConfirmEmailController,
                controllerAs: 'controller'
            })
            .when('/deals', {
                templateUrl: '/ngApp/views/deals.html',
                controller: MyApp.Controllers.DealsController,
                controllerAs: 'vm'
            })
            .when('/deals/:id', {
                templateUrl: '/ngApp/views/deals-info.html',
                controller: MyApp.Controllers.DealInfoController,
                controllerAs: 'vm'
            })
            .when('/companies', {
                templateUrl: '/ngApp/views/companies.html',
                controller: MyApp.Controllers.CompaniesController,
                controllerAs: 'vm'
            })

            .when('/contacts', {
                templateUrl: '/ngApp/views/contactListView.html',
                controller: MyApp.Controllers.ContactListController,
                controllerAs: 'vm'
            })
            .when('/contactDetails', {
                templateUrl: '/ngApp/views/contactDetailsView.html',
                controller: MyApp.Controllers.ContactDetailsController,
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/ngApp/views/notFound.html'
            });

        $locationProvider.html5Mode(true);
    });

    angular.module('MyApp').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                let token = $window.sessionStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                }
                return response || $q.when(response);
            }
        })
    );


    angular.module('MyApp').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

}