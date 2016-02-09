namespace MyApp.Controllers {

    export class ContactDetailsController {
        
        public contactView;  
        public interaction;  
        public contact;

        constructor(private contactService: MyApp.Services.ContactService, private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService) {

            this.contactView = this.contactService.getOneContact($routeParams['id']);
        }

        public deleteContact() {
            return this.contactService.deleteContact(this.contactView.contact.id).then(
                this.$location.path("/contacts"));
        }

        public editContact() {
            return this.contactService.addContact(this.contact).then(
                this.$location.path("/contacts"));
        }

        public addInteraction(interaction) {
            return this.contactService.addInteraction(interaction).then(
                this.$location.path("/contacts"));
        }
    }
}