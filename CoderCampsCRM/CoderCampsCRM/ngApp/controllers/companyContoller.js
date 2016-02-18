var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var CompaniesController = (function () {
            function CompaniesController($uibModal, companiesService, dealService, contactService, $location, $state) {
                this.$uibModal = $uibModal;
                this.companiesService = companiesService;
                this.dealService = dealService;
                this.contactService = contactService;
                this.$location = $location;
                this.$state = $state;
                // this.companies = this.companiesService.getCompanies();
                this.contactsView = contactService.getAllContacts();
                this.getAllItems();
            }
            CompaniesController.prototype.getAllItems = function () {
                var _this = this;
                this.companiesService.getCompanies().$promise.then(function (result) {
                    _this.companies = [];
                    var company;
                    for (var i = 0; i < result.length; i++) {
                        //company = this.companiesService.getCompany(result[i].companyId);
                        //result[i].company = company;
                        _this.companies.push(result[i]);
                    }
                    console.log(_this.companies);
                });
            };
            CompaniesController.prototype.showDetailsModal = function (id) {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/company-info.html",
                    controller: CompanyDetailsController,
                    controllerAs: 'vm',
                    resolve: {
                        companyId: function () { return id; }
                    },
                    size: 'lg'
                });
            };
            CompaniesController.prototype.editModal = function (id) {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/modals/editCompanyModal.html",
                    controller: EditCompanyController,
                    controllerAs: 'vm',
                    resolve: {
                        companyId: function () { return id; }
                    },
                    size: 'lg'
                });
            };
            CompaniesController.prototype.createcompanyModal = function () {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/modals/createcompanyModal.html",
                    controller: CompaniesController,
                    controllerAs: 'vm',
                    size: 'lg'
                });
            };
            CompaniesController.prototype.save = function () {
                var _this = this;
                this.companiesService.createCompany(this.company).then(function () {
                    _this.company = _this.companiesService.getCompanies();
                    _this.$location.path("/companies");
                });
            };
            CompaniesController.prototype.deleteCompany = function (id) {
                var _this = this;
                this.companiesService.deleteCompany(id).then(function () {
                    _this.companies = _this.companiesService.getCompanies();
                    _this.$location.path("/companies");
                });
            };
            CompaniesController.prototype.filterByCountry = function () {
                var _this = this;
                this.companiesService.getCompanies().$promise.then(function (result) {
                    _this.companies = [];
                    var filteredCountry = [];
                    for (var i = 0; i < result.length; i++) {
                        var selectedCountry = _this.selCountry;
                        if (result[i].companyCountry == selectedCountry) {
                            filteredCountry.push(result[i]);
                        }
                    }
                    _this.companies = filteredCountry;
                    //    let filteredCity = [];
                    //    for (let i = 0; i < result.length; i++) {
                    //    let selectedCity = this.selCity;
                    //    if (result[i].companyCity == selectedCity) {
                    //        filteredCity.push(result[i]);
                    //    }
                    //}
                    //    this.companies = filteredCity;
                    //let filteredIndustry = [];
                    //for (let i = 0; i < result.length; i++) {
                    //    let selectedIndustry = this.selIndustry;
                    //    if (result[i].companyIndustry == selectedIndustry) {
                    //        filteredIndustry.push(result[i]);
                    //    }
                    //}
                    //this.companies = filteredIndustry;
                });
            };
            CompaniesController.prototype.filterByCity = function () {
                var _this = this;
                this.companiesService.getCompanies().$promise.then(function (result) {
                    _this.companies = [];
                    var filteredCity = [];
                    for (var i = 0; i < result.length; i++) {
                        var selectedCity = _this.selCity;
                        if (result[i].companyCity == selectedCity) {
                            filteredCity.push(result[i]);
                        }
                    }
                    _this.companies = filteredCity;
                });
            };
            CompaniesController.prototype.filterByState = function () {
                var _this = this;
                this.companiesService.getCompanies().$promise.then(function (result) {
                    _this.companies = [];
                    var filteredState = [];
                    for (var i = 0; i < result.length; i++) {
                        var selectedState = _this.selState;
                        if (result[i].companyState == selectedState) {
                            filteredState.push(result[i]);
                        }
                    }
                    _this.companies = filteredState;
                });
            };
            CompaniesController.prototype.filterByIntustry = function () {
                var _this = this;
                this.companiesService.getCompanies().$promise.then(function (result) {
                    _this.companies = [];
                    var filteredIndustry = [];
                    for (var i = 0; i < result.length; i++) {
                        var selectedIndustry = _this.selIndustry;
                        if (result[i].companyIndustry == selectedIndustry) {
                            filteredIndustry.push(result[i]);
                        }
                    }
                    _this.companies = filteredIndustry;
                });
            };
            return CompaniesController;
        })();
        Controllers.CompaniesController = CompaniesController;
        var CompanyDetailsController = (function () {
            function CompanyDetailsController(companyId, companiesService, $stateParams, $state, contactService) {
                this.companyId = companyId;
                this.companiesService = companiesService;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.contactService = contactService;
                this.companies = this.companiesService.getCompanies();
                this.company = companiesService.getCompany(companyId);
                this.contactsView = contactService.getAllContacts();
                this.routeId = $stateParams["id"];
            }
            return CompanyDetailsController;
        })();
        Controllers.CompanyDetailsController = CompanyDetailsController;
        var EditCompanyController = (function () {
            function EditCompanyController(companyId, $uibModalInstance, companiesService, $location, $routeParams, $route) {
                this.companyId = companyId;
                this.$uibModalInstance = $uibModalInstance;
                this.companiesService = companiesService;
                this.$location = $location;
                this.$route = $route;
                this.company = companiesService.getCompany(companyId);
            }
            EditCompanyController.prototype.save = function () {
                var _this = this;
                this.companiesService.editCompany(this.company).then(function () {
                    _this.$uibModalInstance.close();
                    _this.$route.reload();
                    _this.$location.path("/companies");
                });
            };
            return EditCompanyController;
        })();
        Controllers.EditCompanyController = EditCompanyController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
