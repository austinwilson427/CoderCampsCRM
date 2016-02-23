var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var DashboardService = (function () {
            function DashboardService($resource) {
                this.$resource = $resource;
                this.contactResource = $resource("api/dashboard/contacts");
                this.companyResource = $resource("api/dashboard/companies");
                this.dealResource = $resource("api/dashboard/deals");
                this.taskResource = $resource("api/dashboard/tasks");
                this.quotaResource = $resource("api/dashboard/quotas");
            }
            DashboardService.prototype.listAllContactsForUser = function () {
                return this.contactResource.query();
            };
            DashboardService.prototype.listAllCompaniesForUser = function () {
                return this.companyResource.query();
            };
            DashboardService.prototype.listAllDealsForUser = function () {
                return this.dealResource.query();
            };
            DashboardService.prototype.listAllTasksForUser = function () {
                return this.taskResource.query();
            };
            DashboardService.prototype.listAllQuotasForUser = function () {
                return this.quotaResource.query();
            };
            DashboardService.prototype.saveQuota = function (quotaToSave) {
                return this.quotaResource.save(quotaToSave).$promise;
            };
            return DashboardService;
        })();
        Services.DashboardService = DashboardService;
        angular.module("MyApp").service("dashboardService", DashboardService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
