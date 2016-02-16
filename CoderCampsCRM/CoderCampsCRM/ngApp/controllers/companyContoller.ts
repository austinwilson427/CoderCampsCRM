namespace MyApp.Controllers {

    export class CompaniesController {
        public companies;
        public company;
        public contactsView;
        public filterChoice;
        public dateFilter;
        public stageFilter;
        public minAmount; public maxAmount;
        public selCountry;
        public selCity;
        public selState;
        public selIndustry;

        constructor(private $uibModal: angular.ui.bootstrap.IModalService,
            private companiesService: MyApp.Services.CompaniesService,
            private dealService: MyApp.Services.DealService,
            private contactService: MyApp.Services.ContactService,
            private $location: angular.ILocationService,
            private $state: ng.ui.IStateService) {
           // this.companies = this.companiesService.getCompanies();
            this.contactsView = contactService.getAllContacts();
            this.getAllItems();
          
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
        public showDetailsModal(id) {

            this.$uibModal.open({
                templateUrl: "/ngApp/views/company-info.html",
                controller: CompanyDetailsController,
                controllerAs: 'vm',
                resolve: {
                    companyId: () => id
                },
                size: 'lg'
            });
        }

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

        public save() {
            this.companiesService.createCompany(this.company).then(() => {
                this.company = this.companiesService.getCompanies();
                this.$location.path("/companies");
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
        public contactsView;

        constructor(private companyId,
            private companiesService: MyApp.Services.CompaniesService,
            private $stateParams: ng.ui.IStateParamsService,
            private $state: ng.ui.IStateService,
            private contactService: MyApp.Services.ContactService ) {
            this.companies = this.companiesService.getCompanies();
            this.company = companiesService.getCompany(companyId);
            this.contactsView = contactService.getAllContacts();
            this.routeId = $stateParams["id"];
        }

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