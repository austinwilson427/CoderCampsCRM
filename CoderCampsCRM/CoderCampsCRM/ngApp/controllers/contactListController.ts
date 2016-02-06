namespace MyApp.Controllers {

    export class ContactListController {

        public contacts;

        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService) {  
                
            this.contacts = contactService.getAllContacts();
        }

        public openNewContactModal() {
            
            
        }

        public openContactDetailsPage(id: number) {

            this.$location.path('/contactList/' + id);
        }
    }
}