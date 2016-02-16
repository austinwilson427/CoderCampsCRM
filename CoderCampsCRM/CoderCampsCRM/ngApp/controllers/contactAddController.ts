namespace MyApp.Controllers {

    export class ContactAddController {

        public contact;
        public companies;

        constructor(private contactService: MyApp.Services.ContactService, private $state: ng.ui.IStateService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private companiesService: MyApp.Services.CompaniesService) {
            this.companies = this.companiesService.getCompanies();
        }

        public addContact() {
            this.contactService.addContact(this.contact).then(() => {
                this.closeModal();
                this.$state.reload();
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }
    angular.module("MyApp").controller("contactAddController", ContactAddController);

    export class ContactDeleteController {

        constructor(private contactService: MyApp.Services.ContactService, private $state: ng.ui.IStateService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $stateParams: ng.ui.IStateParamsService, private $location: ng.ILocationService, public contact) {

        }

        public deleteContact() {
            this.closeModal();
            this.$location.path("/contacts");
            this.contactService.deleteContact(this.contact.id).then(() => {            
                this.$state.reload();
            })               
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }
    angular.module("MyApp").controller("contactDeleteController", ContactDeleteController);
}