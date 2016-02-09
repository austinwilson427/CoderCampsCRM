var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var CompaniesController = (function () {
            function CompaniesController($uibModal, companiesService, $location) {
                this.$uibModal = $uibModal;
                this.companiesService = companiesService;
                this.$location = $location;
                this.companies = this.companiesService.getCompanies();
            }
            CompaniesController.prototype.showDetailsModal = function (id) {
                console.log(id);
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/companyDetailsModal.html",
                    controller: CompanyDetailsController,
                    controllerAs: 'controller',
                    resolve: {
                        companyId: function () { return id; }
                    },
                    size: 'lg'
                });
            };
            CompaniesController.prototype.editModal = function (id) {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/editCompanyModal.html",
                    controller: EditCompanyController,
                    controllerAs: 'controller',
                    resolve: {
                        companyId: function () { return id; }
                    },
                    size: 'lg'
                });
            };
            CompaniesController.prototype.deleteCompany = function (id) {
                var _this = this;
                this.companiesService.deleteCompany(id).then(function () {
                    _this.companies = _this.companiesService.getCompanies();
                    _this.$location.path("/companies");
                });
            };
            return CompaniesController;
        })();
        Controllers.CompaniesController = CompaniesController;
        var CompanyDetailsController = (function () {
            function CompanyDetailsController(companyId, companiesService) {
                this.companyId = companyId;
                this.companiesService = companiesService;
                this.company = companiesService.getCompany(companyId);
            }
            return CompanyDetailsController;
        })();
        var EditCompanyController = (function () {
            function EditCompanyController(companyId, companiesService, $location, $routeParams) {
                this.companyId = companyId;
                this.companiesService = companiesService;
                this.$location = $location;
                this.company = companiesService.getCompany(companyId);
            }
            EditCompanyController.prototype.save = function () {
                var _this = this;
                this.companiesService.editCompany(this.company).then(function () {
                    _this.$location.path("/companies");
                });
            };
            return EditCompanyController;
        })();
        Controllers.EditCompanyController = EditCompanyController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=companyContoller.js.map