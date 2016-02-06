namespace MyApp.Controllers {

    export class AddContactController {

        public contact;
    
        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService) {

        }

        public addContact() {
            return this.contactService.addContact(this.contact).then(
                this.$location.path("/contactList"));            
        }
    }    
}