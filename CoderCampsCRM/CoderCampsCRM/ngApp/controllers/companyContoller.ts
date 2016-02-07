namespace MyApp.Controllers {

    export class CompaniesController {
        public companies;

        constructor(private $uibModal: angular.ui.bootstrap.IModalService,
            private companiesService: MyApp.Services.CompaniesService,
            private $location: angular.ILocationService) {
            this.companies = this.companiesService.getCompanies();
        }
        public showDetailsModal(id) {
            console.log(id);
            this.$uibModal.open({
                templateUrl: "/ngApp/views/companyDetailsModal.html",
                controller: CompanyDetailsController,
                controllerAs: 'controller',
                resolve: {
                    companyId: () => id
                },
                size: 'lg'
            });
        }

        public editModal(id) {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/editCompanyModal.html",
                controller: EditCompanyController,
                controllerAs: 'controller',
                resolve: {
                    companyId: () => id
                },
                size: 'lg'
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

        constructor(private companyId, private companiesService: MyApp.Services.CompaniesService) {

            this.company = companiesService.getCompany(companyId);

        }

    }






    export class EditCompanyController {
        public company;

        constructor(private companyId,
            private companiesService: MyApp.Services.CompaniesService,
            private $location: ng.ILocationService, $routeParams: ng.route.IRouteParamsService) {
            
            this.company = companiesService.getCompany(companyId);

        }

        public save() {
           
            this.companiesService.editCompany(this.company).then(() => {
               
                this.$location.path("/companies");
            });
        }



    }







}