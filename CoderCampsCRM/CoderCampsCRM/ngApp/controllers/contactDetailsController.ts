namespace MyApp.Controllers {

    export class ContactDetailsController {
        
        public contact;  
        public interaction;  

        constructor(private userService: MyApp.Services.ContactService, private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService) {

            this.contact = this.userService.getOneContact($routeParams['id']);
        }

        public deleteContact(id: number) {
            return this.userService.deleteContact(id).then(
                this.$location.path("/contacts"));
        }

        public editContact(contact) {
            return this.userService.addContact(contact).then(
                this.$location.path("/contacts"));
        }

        public addInteraction(interaction) {
            return this.userService.addInteraction(interaction).then(
                this.$location.path("/contacts"));
        }
    }
}