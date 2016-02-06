namespace MyApp.Controllers {

    export class ContactListController {

        public contacts;

        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService, private $uibModal: ng.ui.bootstrap.IModalService) {         
            this.contacts = contactService.getAllContacts();
        }

        public openNewContactModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/modals/contactAddModal.html",
                controller: MyApp.Controllers.ContactAddController,
                controllerAs: 'vm',
                size: "md"
            })        
        }

        public openContactDetailsPage(id: number) {
            this.$location.path('/contactList/' + id);
        }
    }
}