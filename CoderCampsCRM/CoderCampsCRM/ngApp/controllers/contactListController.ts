namespace MyApp.Controllers {

    export class ContactListController {

        public contacts;

        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService, private $uibModal: angular.ui.bootstrap.IModalService) {         
            this.contacts = contactService.getAllContacts();
        }

        public openNewContactModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/modals/contactAddModal.html",
                controller: MyApp.Controllers.ContactAddController,
                controllerAs: 'modal',
                size: "md"
            })        
        }

        public openContactDetailsPage(id: number) {
            this.$location.path('/contactDetails/' + id);
        }
    }
}