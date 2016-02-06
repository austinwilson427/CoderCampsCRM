namespace MyApp.Controllers {

    export class ContactAddController {

        public contact;
    
        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

        }

        public addContact() {
            return this.contactService.addContact(this.contact).then(
                this.$location.path("/contactList"));            
        }

        public cancelAdd() {
            this.$uibModalInstance.close();
        }
    }    
    angular.module("MyApp").controller("contactAddController", ContactAddController);
}