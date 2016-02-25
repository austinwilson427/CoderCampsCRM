var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var CompaniesController = (function () {
            function CompaniesController($uibModal, companiesService, companyLogItemService, dealService, contactService, $location, $state, $stateParams) {
                this.$uibModal = $uibModal;
                this.companiesService = companiesService;
                this.companyLogItemService = companyLogItemService;
                this.dealService = dealService;
                this.contactService = contactService;
                this.$location = $location;
                this.$state = $state;
                // this.companies = this.companiesService.getCompanies();
                this.contactView = contactService.getAllContacts();
                this.getAllItems();
                this.filterIsDisplayed = false;
            }
            CompaniesController.prototype.hideFilterResponsive = function () {
                this.filterIsDisplayed = false;
            };
            CompaniesController.prototype.showFilterResponsive = function () {
                this.filterIsDisplayed = true;
            };
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
            CompaniesController.prototype.getCompanyLogItemsByRouteId = function () {
                var _this = this;
                this.companyLogItemService.listCompanyLogItemsByCompanyId(this.routeId).$promise.then(function (result) {
                    _this.companyLogItems = result;
                });
            };
            //public showDetailsModal(id) {
            //    this.$uibModal.open({
            //        templateUrl: "/ngApp/views/company-info.html",
            //        controller: CompanyDetailsController,
            //        controllerAs: 'vm',
            //        resolve: {
            //            companyId: () => id
            //        },
            //        size: 'lg'
            //    });
            //}
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
            //public createcompanyModal2() {
            //    this.$uibModal.open({
            //        templateUrl: "/ngApp/views/modals/createcompanyModal_2.html",
            //        controller: EditCompanyController,
            //        controllerAs: 'vm',
            //        size: 'lg'
            //    });
            //}
            CompaniesController.prototype.save = function () {
                var _this = this;
                this.companiesService.createCompany(this.company).then(function () {
                    _this.company = _this.companiesService.getCompanies();
                    _this.$location.path("/companies");
                    location.reload(false);
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
            function CompanyDetailsController(companyLogItemService, companiesService, dealService, taskService, $stateParams, $state, $location, contactService, $routeParams, $route) {
                this.companyLogItemService = companyLogItemService;
                this.companiesService = companiesService;
                this.dealService = dealService;
                this.taskService = taskService;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.$location = $location;
                this.contactService = contactService;
                this.$route = $route;
                this.company = {};
                this.routeId = $stateParams["id"];
                this.getCompany();
                this.getAllContact();
                this.getAllDeals();
                this.getCompanyLogItemsByRouteId();
                // this.submitActivity()
                // this.getAllTasks();
                // this.companies = this.companiesService.getCompanies();
                // this.company = companiesService.getCompany(companyId);
                // this.company = companiesService.getCompany($routeParams['id'])
                //this.contactView = contactService.getAllContacts();
                //this.contactView = this.contactService.getOneContact($stateParams['id']);  
                // this.deals = this.dealService.getDealByDealId($stateParams['id']);      
                //this.routeId = $stateParams["id"];
                //console.log(this.deals);
            }
            CompanyDetailsController.prototype.getCompany = function () {
                var _this = this;
                this.companiesService.getCompany(this.routeId).$promise.then(function (result) {
                    _this.companyInfo = result;
                });
            };
            CompanyDetailsController.prototype.getCompanyLogItemsByRouteId = function () {
                var _this = this;
                this.companyLogItemService.listCompanyLogItemsByCompanyId(this.routeId).$promise.then(function (result) {
                    _this.companyLogItems = result;
                });
            };
            CompanyDetailsController.prototype.getAllContact = function () {
                var _this = this;
                this.contactService.getAllContacts().then(function (result) {
                    _this.contactView = [];
                    var contact;
                    // console.log(result.contacts);
                    for (var i = 0; i < result.contacts.length; i++) {
                        // console.log(result.contacts[i].companyId);
                        contact = _this.contactService.getOneContact(result.contacts[i].companyId);
                        //  console.log(contact);
                        if (_this.routeId == result.contacts[i].companyId) {
                            //result[i].contact = contact;
                            _this.contactView.push(result.contacts[i]);
                        }
                    }
                });
            };
            CompanyDetailsController.prototype.getAllDeals = function () {
                var _this = this;
                this.dealService.listAllDealsOwned().$promise.then(function (result) {
                    _this.deals = [];
                    var deal;
                    //console.log(result);
                    //console.log(result[1].companyId);
                    for (var i = 0; i < result.length; i++) {
                        deal = _this.dealService.getDealsSharedByDealId(result[i].companyId);
                        // result[i].deal = deal;
                        if (_this.routeId == result[i].companyId) {
                            _this.deals.push(result[i]);
                        }
                    }
                });
            };
            //public getAllTasks() {
            //    this.taskService.listTasks().$promise.then((result) => {
            //        this.tasks = [];
            //        let task;
            //        //console.log(result);
            //        for (var i = 0; i < result.length; i++) {
            //            task = this.taskService.getTask(result[i].company_Id);
            //            // result[i].deal = deal;
            //            if (this.routeId == result[i].company_Id) {
            //                this.tasks.push(result[i]);
            //            }
            //        }
            //    });
            //}
            CompanyDetailsController.prototype.editCompany = function () {
                $(".tdEdit").attr("contenteditable", "true").attr("style", "background-color: rgb(255, 255, 194)");
            };
            CompanyDetailsController.prototype.editNotes = function () {
                $(".tdEdit").removeAttr("contenteditable").removeAttr("style");
                this.company.id = this.companyInfo.id;
                this.company.companyName = $("#companyName").text();
                this.company.companyDomainName = $("#companyDomainName").text();
                this.company.companyPhoneNumber = $("#companyPhoneNumber").text();
                this.company.companyCountry = $("#companyCountry").text();
                this.company.country = $("#country").text();
                this.company.companyCity = $("#companyCity").text();
                this.company.companyState = $("#companyState").text();
                this.company.companyZip = $("#companyZip").text();
                this.company.comapanyAddress = $("#comapanyAddress").text();
                this.company.companyDescription = $("#companyDescription").text();
                this.company.companyIndustry = $("#companyIndustry").text();
                this.company.companyIsPublic = $("#companyIsPublic").text();
                this.company.companyFacebook = $("#companyFacebook").text();
                this.company.companyLinkedin = $("#companyLinkedin").text();
                this.company.companyLinkedin = $("#companyTwitter").text();
                this.company.longitude = $("#long").text();
                this.company.latitude = $("#lat").text();
                return this.companiesService.editCompany(this.company);
            };
            CompanyDetailsController.prototype.confirmEdit = function () {
                $(".tdEdit").removeAttr("contenteditable").removeAttr("style");
                this.company.id = this.companyInfo.id;
                this.company.companyName = $("#companyName").text();
                this.company.companyDomainName = $("#companyDomainName").text();
                this.company.companyPhoneNumber = $("#companyPhoneNumber").text();
                this.company.companyCountry = $("#companyCountry").text();
                this.company.country = $("#country").text();
                this.company.companyCity = $("#companyCity").text();
                this.company.companyState = $("#companyState").text();
                this.company.companyZip = $("#companyZip").text();
                this.company.comapanyAddress = $("#comapanyAddress").text();
                this.company.companyDescription = $("#companyDescription").text();
                this.company.companyIndustry = $("#companyIndustry").text();
                this.company.companyIsPublic = $("#companyIsPublic").text();
                this.company.companyFacebook = $("#companyFacebook").text();
                this.company.companyLinkedin = $("#companyLinkedin").text();
                this.company.companyLinkedin = $("#companyTwitter").text();
                this.company.longitude = $("#long").text();
                this.company.latitude = $("#lat").text();
                return this.companiesService.editCompany(this.company);
            };
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
