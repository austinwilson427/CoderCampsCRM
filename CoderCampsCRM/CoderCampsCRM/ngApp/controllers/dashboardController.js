var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DashboardController = (function () {
            function DashboardController(dashboardService) {
                this.dashboardService = dashboardService;
                this.allActivity = [];
                this.getAllDetails();
            }
            DashboardController.prototype.getAllContacts = function () {
                var _this = this;
                this.dashboardService.listAllContactsForUser().$promise.then(function (result) {
                    _this.totalContacts = result.length;
                    for (var i = 0; i < result.length; i++) {
                        var contactDetails = {
                            id: null,
                            category: null,
                            name: null,
                            createdOn: null,
                            dueBy: null
                        };
                        contactDetails.id = result[i].id;
                        contactDetails.category = "contact";
                        contactDetails.name = result[i].name;
                        contactDetails.createdOn = result[i].createdOn;
                        _this.allActivity.push(contactDetails);
                    }
                });
            };
            DashboardController.prototype.getAllCompanies = function () {
                var _this = this;
                this.dashboardService.listAllCompaniesForUser().$promise.then(function (result) {
                    _this.totalCompanies = result.length;
                    for (var i = 0; i < result.length; i++) {
                        var contactDetails = {
                            id: null,
                            category: null,
                            name: null,
                            createdOn: null,
                            dueBy: null
                        };
                        contactDetails.id = result[i].id;
                        contactDetails.category = "company";
                        contactDetails.name = result[i].companyName;
                        contactDetails.createdOn = result[i].companyCreateDate;
                        _this.allActivity.push(contactDetails);
                    }
                });
            };
            DashboardController.prototype.getAllDeals = function () {
                var _this = this;
                this.dashboardService.listAllDealsForUser().$promise.then(function (result) {
                    _this.totalDeals = result.length;
                    for (var i = 0; i < result.length; i++) {
                        var contactDetails = {
                            id: null,
                            category: null,
                            name: null,
                            createdOn: null,
                            dueBy: null
                        };
                        contactDetails.id = result[i].id;
                        contactDetails.category = "deal";
                        contactDetails.name = result[i].dealName;
                        contactDetails.createdOn = result[i].createdOn;
                        _this.allActivity.push(contactDetails);
                    }
                });
            };
            DashboardController.prototype.getAllTasks = function () {
                var _this = this;
                this.dashboardService.listAllTasksForUser().$promise.then(function (result) {
                    _this.totalTasks = result.length;
                    for (var i = 0; i < result.length; i++) {
                        var contactDetails = {
                            id: null,
                            category: null,
                            name: null,
                            createdOn: null,
                            dueBy: null
                        };
                        contactDetails.id = result[i].id;
                        contactDetails.category = "task";
                        contactDetails.name = result[i].type;
                        contactDetails.createdOn = result[i].createdOn;
                        contactDetails.dueBy = result[i].dueDate;
                        _this.allActivity.push(contactDetails);
                    }
                });
            };
            DashboardController.prototype.getAllDetails = function () {
                this.getAllContacts();
                this.getAllCompanies();
                this.getAllDeals();
                this.getAllTasks();
            };
            return DashboardController;
        })();
        Controllers.DashboardController = DashboardController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
