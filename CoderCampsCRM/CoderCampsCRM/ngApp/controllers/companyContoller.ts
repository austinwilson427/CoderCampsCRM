namespace MyApp.Controllers {

    export class CompaniesController {
        public routeId;
        public companies;
        public company;
        public contactView;
        public filterChoice;
        public dateFilter;
        public stageFilter;
        public minAmount; public maxAmount;
        public selCountry;
        public selCity;
        public selState;
        public selIndustry;
        public companyLogItems;
        public filterIsDisplayed;

        constructor(private $uibModal: angular.ui.bootstrap.IModalService,
            private companiesService: MyApp.Services.CompaniesService,
            private companyLogItemService: MyApp.Services.CompanyLogItemService,
            private dealService: MyApp.Services.DealService,
            private contactService: MyApp.Services.ContactService,
            private $location: angular.ILocationService,
            private $state: ng.ui.IStateService,
            
            $stateParams: ng.ui.IStateParamsService) {
           // this.companies = this.companiesService.getCompanies();
            this.contactView = contactService.getAllContacts();
            this.getAllItems();
            this.filterIsDisplayed = false;
          
        }

        public hideFilterResponsive() {
            this.filterIsDisplayed = false;
        }

        public showFilterResponsive() {
            this.filterIsDisplayed = true;
        }

        public getAllItems() {

            this.companiesService.getCompanies().$promise.then((result) => {
                this.companies = [];
                let company;
                for (var i = 0; i < result.length; i++) {
                    //company = this.companiesService.getCompany(result[i].companyId);
                    //result[i].company = company;
                    this.companies.push(result[i]);
                }
                console.log(this.companies);
            });
        }

        public getCompanyLogItemsByRouteId() {
            this.companyLogItemService.listCompanyLogItemsByCompanyId(this.routeId).$promise.then((result) => {
                this.companyLogItems = result;
            });
        }

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

        public editModal(id) {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/modals/editCompanyModal.html",
                controller: EditCompanyController,
                controllerAs: 'vm',
                resolve: {
                    companyId: () => id
                },
                size: 'lg'
            });
        }
        
        public createcompanyModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/modals/createcompanyModal.html",
                controller: CompaniesController,
                controllerAs: 'vm',
                size: 'lg'
            });
        }
        //public createcompanyModal2() {
        //    this.$uibModal.open({
        //        templateUrl: "/ngApp/views/modals/createcompanyModal_2.html",
        //        controller: EditCompanyController,
        //        controllerAs: 'vm',
        //        size: 'lg'
        //    });
        //}


       
        public save() {
            this.companiesService.createCompany(this.company).then(() => {
                this.company = this.companiesService.getCompanies();
               
                this.$location.path("/companies");              
                location.reload(false);
            });
        }
        
        public deleteCompany(id) {
            this.companiesService.deleteCompany(id).then(() => {
                this.companies = this.companiesService.getCompanies();
                this.$location.path("/companies");


            });
        }
        
        public filterByCountry() {
            this.companiesService.getCompanies().$promise.then((result) => {
                this.companies = [];

                let filteredCountry = [];
                for (let i = 0; i < result.length; i++) {

                   let selectedCountry = this.selCountry;

                    if (result[i].companyCountry == selectedCountry) {
                        filteredCountry.push(result[i]);
                    }
                }

                this.companies = filteredCountry;

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
        }

        public filterByCity() {
            this.companiesService.getCompanies().$promise.then((result) => {
                this.companies = [];

                let filteredCity = [];
                for (let i = 0; i < result.length; i++) {

                    let selectedCity = this.selCity;

                    if (result[i].companyCity == selectedCity) {
                        filteredCity.push(result[i]);
                    }
                }

                this.companies = filteredCity;
            });
        }

        public filterByState() {
            this.companiesService.getCompanies().$promise.then((result) => {
                this.companies = [];

                let filteredState = [];
                for (let i = 0; i < result.length; i++) {

                    let selectedState = this.selState;

                    if (result[i].companyState == selectedState) {
                        filteredState.push(result[i]);
                    }
                }

                this.companies = filteredState;

            });
        }


        public filterByIntustry() {
            this.companiesService.getCompanies().$promise.then((result) => {
                this.companies = [];

                
                let filteredIndustry = [];
                for (let i = 0; i < result.length; i++) {

                    let selectedIndustry = this.selIndustry;

                    if (result[i].companyIndustry == selectedIndustry) {
                        filteredIndustry.push(result[i]);
                    }
                }

                this.companies = filteredIndustry;

            });
        }
    }



    export class CompanyDetailsController {
        public routeId;
        public company;
        public companies;
        public companyInfo;
        public contactView;
        public deals;
        public tasks;
        public activityContent;
        public formatDate;
        public validationErrors;
        public companyLogItems;

        constructor(
            private companyLogItemService: MyApp.Services.CompanyLogItemService,
            private companiesService: MyApp.Services.CompaniesService,
            private dealService: MyApp.Services.DealService,
            private taskService: MyApp.Services.TaskService,
            private $stateParams: ng.ui.IStateParamsService,
            private $state: ng.ui.IStateService,
            private $location: angular.ILocationService,
            private contactService: MyApp.Services.ContactService,
            $routeParams: ng.route.IRouteParamsService,
            private $route: ng.route.IRouteService) {
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
        public getCompany() {
            this.companiesService.getCompany(this.routeId).$promise.then((result) => {
                this.companyInfo = result;
                
            });
        }
        public getCompanyLogItemsByRouteId() {
            this.companyLogItemService.listCompanyLogItemsByCompanyId(this.routeId).$promise.then((result) => {
                this.companyLogItems = result;
            });
        }

        public getAllContact() {

            this.contactService.getAllContacts().then((result) => {
                this.contactView = [];
                let contact;
               // console.log(result.contacts);
                for (var i = 0; i < result.contacts.length; i++) {
                   // console.log(result.contacts[i].companyId);
                    contact = this.contactService.getOneContact(result.contacts[i].companyId);
                  //  console.log(contact);
                    if (this.routeId == result.contacts[i].companyId) {
                        //result[i].contact = contact;
                        this.contactView.push(result.contacts[i]);
                    }
                }
                
            });
        }

        public getAllDeals() {

            this.dealService.listAllDealsOwned().$promise.then((result) => {
                this.deals = [];
                let deal;
                //console.log(result);
                //console.log(result[1].companyId);
                for (var i = 0; i < result.length; i++) {
                    deal = this.dealService.getDealsSharedByDealId(result[i].companyId);
                  // result[i].deal = deal;
                    if (this.routeId == result[i].companyId) {
                        this.deals.push(result[i]);
                    }
                }
               });
        }
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


        public editCompany() {
            $(".tdEdit").attr("contenteditable", "true").attr("style", "background-color: rgb(255, 255, 194)");
        }
        public editNotes() {
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
        }
        public confirmEdit() {
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
        }

        //public submitActivity() {
        //    let activityToSubmit = {
        //        startTime: null,
        //        type: null,
        //        content: null,
        //        dealId: null,
        //        contactId: null,
        //        submittedBy: null
        //    };

        //    activityToSubmit.startTime = this.formatDate;
        //    activityToSubmit.type = "Activity";
        //    activityToSubmit.content = this.activityContent;
        //    activityToSubmit.dealId = this.companyInfo.id;
        //    /*Temporary ContactId*/
        //    activityToSubmit.contactId = 1;
        //    /*Temporary SubmittedBy*/
        //    activityToSubmit.submittedBy = "Austin Wilson";

        //    this.companyLogItemService.saveCompanyLogItem(activityToSubmit).then(() => {
        //        location.reload(false);
        //    }).catch((error) => {

        //        let validationErrors = [];
        //        for (let i in error.data.modelState) {
        //            let errorMessage = error.data.modelState[i];
        //            validationErrors = validationErrors.concat(errorMessage);
        //        }
        //        this.validationErrors = validationErrors;
        //      //  console.log(this.validationErrors);
        //    });

        //}


    }






    export class EditCompanyController {
        public company;
        

        constructor(private companyId,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private companiesService: MyApp.Services.CompaniesService,
            private $location: ng.ILocationService, $routeParams: ng.route.IRouteParamsService, private $route: ng.route.IRouteService) {
            
            this.company = companiesService.getCompany(companyId);

        }

        public save() {

            this.companiesService.editCompany(this.company).then(() => {
                this.$uibModalInstance.close();
                this.$route.reload();
                this.$location.path("/companies");

            });
        }



    }







}