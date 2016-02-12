namespace MyApp.Controllers {

    export class CompaniesController {
        public companies;
        public company;
        public contactsView;

        constructor(private $uibModal: angular.ui.bootstrap.IModalService,
            private companiesService: MyApp.Services.CompaniesService,
            private dealService: MyApp.Services.DealService,
            private contactService: MyApp.Services.ContactService,
            private $location: angular.ILocationService) {
            this.companies = this.companiesService.getCompanies();
            this.contactsView = contactService.getAllContacts();

            console.log(this.contactsView);
        }
        public showDetailsModal(id) {

            this.$uibModal.open({
                templateUrl: "/ngApp/views/modals/companyDetails.html",
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

    }
    class CompanyDetailsController {
        public company;
        public companies;

        constructor(private companyId, private companiesService: MyApp.Services.CompaniesService) {
            this.companies = this.companiesService.getCompanies();
            this.company = companiesService.getCompany(companyId);

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