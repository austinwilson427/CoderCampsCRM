namespace MyApp.Controllers {

    export class ContactAddController {

        public contact;
        public companies;

        constructor(private contactService: MyApp.Services.ContactService, private $route: ng.route.IRouteService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private companiesService: MyApp.Services.CompaniesService) {
            this.companies = this.companiesService.getCompanies();
        }

        public addContact() {
            this.contactService.addContact(this.contact).then(() => {
                this.closeModal();
                this.$route.reload();
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }
    angular.module("MyApp").controller("contactAddController", ContactAddController);
}