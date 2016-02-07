namespace MyApp.Controllers {

    export class ContactAddController {

        public contact;

        constructor(private contactService: MyApp.Services.ContactService, private $route: ng.route.IRouteService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

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