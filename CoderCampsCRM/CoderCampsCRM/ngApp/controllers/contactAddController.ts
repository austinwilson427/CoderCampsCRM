namespace MyApp.Controllers {

    export class ContactAddController {

        public contact;

        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

        }

        public addContact() {
            this.contactService.addContact(this.contact).then(() => {
                this.closeModal();
                window.location.reload();
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }
    angular.module("MyApp").controller("contactAddController", ContactAddController);
}