var MyApp;
(function (MyApp) {
    angular.module('MyApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ui.router', 'angular-filepicker', 'ngDraggable']).config(function ($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider, filepickerProvider) {
        filepickerProvider.setKey('ANnIsnaUARuBQjAtPZGBQz');
        $stateProvider
            .state('home', {
            url: '/',
            templateUrl: '/ngApp/views/home.html',
            controller: MyApp.Controllers.HomeController,
            controllerAs: 'controller'
        })
            .state('externalRegister', {
            url: '/externalRegister',
            templateUrl: '/ngApp/views/externalRegister.html',
            controller: MyApp.Controllers.ExternalRegisterController,
            controllerAs: 'controller'
        })
            .state('externalLogin', {
            url: '/externalLogin',
            templateUrl: '/ngApp/views/externalLogin.html',
            controller: MyApp.Controllers.ExternalLoginController,
            controllerAs: 'controller'
        })
            .state('deals', {
            url: '/deals',
            templateUrl: '/ngApp/views/deals.html',
            controller: MyApp.Controllers.DealsController,
            controllerAs: 'vm'
        })
            .state('deals.table-view', {
            url: '/table-view',
            templateUrl: '/ngApp/views/routes/deal-table-view.html',
            controller: MyApp.Controllers.DealTableViewController,
            controllerAs: 'vm'
        })
            .state('deals.list-view', {
            url: '/list-view',
            templateUrl: '/ngApp/views/routes/deal-list-view.html',
            controller: MyApp.Controllers.DealsController,
            controllerAs: 'vm'
        })
            .state('tasks', {
            url: '/tasks',
            templateUrl: '/ngApp/views/tasks.html',
            controller: MyApp.Controllers.TaskListController,
            controllerAs: 'vm'
        })
            .state('addtask', {
            url: '/addtask',
            templateUrl: '/ngApp/views/addtask.html',
            controller: MyApp.Controllers.TaskAddController,
            controllerAs: 'vm'
        })
            .state('deletetask', {
            url: '/deletetask/:id',
            templateUrl: '/ngApp/views/deletetask.html',
            controller: MyApp.Controllers.TaskDeleteController,
            controllerAs: 'vm'
        })
            .state('taskdetails', {
            url: '/task-details',
            templateUrl: '/ngApp/views/task-details.html',
            controller: MyApp.Controllers.TaskListController,
            controllerAs: 'vm'
        })
            .state('myAccount', {
            url: '/tasks',
            templateUrl: '/ngApp/views/tasks.html',
            controller: MyApp.Controllers.TaskListController,
            controllerAs: 'vm'
        })
            .state('about', {
            url: '/about',
            templateUrl: '/ngApp/views/about.html',
            controller: MyApp.Controllers.AboutController,
            controllerAs: 'controller'
        })
            .state('companies', {
            url: '/companies',
            templateUrl: '/ngApp/views/companies.html',
            controller: MyApp.Controllers.CompaniesController,
            controllerAs: 'vm'
        })
            .state('createCompany', {
            url: '/createcompany',
            templateUrl: '/ngApp/views/createCompany.html',
            controller: MyApp.Controllers.CompaniesController,
            controllerAs: 'vm'
        })
            .state('editCompanyModal', {
            url: '/createcompany',
            templateUrl: '/ngApp/views/modals/editCompanyModal.html',
            controller: MyApp.Controllers.EditCompanyController,
            controllerAs: 'vm'
        })
            .state('contacts', {
            url: '/contacts',
            templateUrl: '/ngApp/views/contactListView.html',
            controller: MyApp.Controllers.ContactListController,
            controllerAs: 'vm'
        })
            .state('contactDetails', {
            url: '/contactDetails/:id',
            templateUrl: '/ngApp/views/contactDetailsView.html',
            controller: MyApp.Controllers.ContactDetailsController,
            controllerAs: 'vm'
        })
            .state('deal-info', {
            url: '/deals/:id',
            templateUrl: '/ngApp/views/deals-info.html',
            controller: MyApp.Controllers.DealInfoController,
            controllerAs: 'vm'
        })
            .state('deal-info.note', {
            url: '/note',
            templateUrl: 'ngApp/views/routes/deal-info-note.html',
            controller: MyApp.Controllers.DealInfoNoteController,
            controllerAs: "vm"
        })
            .state('deal-info.activity', {
            url: '/activity',
            templateUrl: 'ngApp/views/routes/deal-info-activity.html',
            controller: MyApp.Controllers.DealInfoActivityController,
            controllerAs: "vm"
        })
            .state('deal-info.task', {
            url: '/task',
            templateUrl: 'ngApp/views/routes/deal-info-task.html',
            controller: MyApp.Controllers.DealInfoTaskController,
            controllerAs: "vm"
        })
            .state('deal-info.event', {
            url: '/event',
            templateUrl: 'ngApp/views/routes/deal-info-event.html',
            controller: MyApp.Controllers.DealInfoEventController,
            controllerAs: "vm"
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    });
    angular.module('MyApp').factory('authInterceptor', function ($q, $window, $location) {
        return ({
            request: function (config) {
                config.headers = config.headers || {};
                var token = $window.sessionStorage.getItem('token');
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
        });
    });
    angular.module('MyApp').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})(MyApp || (MyApp = {}));
