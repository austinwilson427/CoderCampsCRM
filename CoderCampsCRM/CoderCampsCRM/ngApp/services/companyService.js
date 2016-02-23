var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var CompaniesService = (function () {
            function CompaniesService($resource) {
                this.$resource = $resource;
                this.companiesResource = $resource("/api/companies/:id");
                this.companyListResource = $resource("api/contactListView/:id");
                this.googleCalendarResource = $resource("api/googleCalendar/:id");
            }
            //////////////Google Calendar /////////
            CompaniesService.prototype.sendToGoogleCalendar = function () {
                return this.googleCalendarResource.get();
            };
            ;
            CompaniesService.prototype.getCompanies = function () {
                return this.companiesResource.query();
            };
            CompaniesService.prototype.getCompany = function (id) {
                return this.companiesResource.get({ id: id });
            };
            CompaniesService.prototype.createCompany = function (company) {
                return this.companiesResource.save(company).$promise;
            };
            CompaniesService.prototype.deleteCompany = function (id) {
                return this.companiesResource.delete({ id: id }).$promise;
            };
            CompaniesService.prototype.editCompany = function (company) {
                return this.companiesResource.save(company).$promise;
            };
            return CompaniesService;
        })();
        Services.CompaniesService = CompaniesService;
        angular.module("MyApp").service("companiesService", CompaniesService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=companyService.js.map