namespace MyApp.Controllers {

    export class ContactDetailsController {
        
        public contactView;  
        public interaction;  
        public contact;

        constructor(private contactService: MyApp.Services.ContactService, private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService, private $uibModal: ng.ui.bootstrap.IModalService) {
            this.contact = {};
            this.contactView = this.contactService.getOneContact($routeParams['id']);
        }

        public deleteContact() {
            return this.contactService.deleteContact(this.contactView.contact.id).then(
                this.$location.path("/contacts"));
        }

        public editContact() {
            $(".tdEdit").attr("contenteditable", "true").attr("style", "background-color: rgb(255, 255, 194)");  
        }

        public confirmEdit() {
            $(".tdEdit").removeAttr("contenteditable").removeAttr("style");
            this.contact.id = this.contactView.contact.id;
            this.contact.companyId = this.contactView.contact.companyId;            
            this.contact.name = $("#name").text();
            this.contact.email = $("#email").text();
            this.contact.phoneNumber = $("#phoneNumber").text();
            this.contact.jobTitle = $("#jobTitle").text();
            this.contact.country = $("#country").text(); 
            this.contact.city = $("#city").text();  
            this.contact.state = $("#state").text();  
            this.contact.zip = $("#zip").text();  
            this.contact.streetAddress = $("#streetAddress").text();           
            return this.contactService.editContact(this.contact);
        }

        public chooseCompany(companyId) {
            
            this.contact.id = this.contactView.contact.id;
            this.contact.companyId = companyId;
            this.contact.name = $("#name").text();
            this.contact.email = $("#email").text();
            this.contact.phoneNumber = $("#phoneNumber").text();
            this.contact.jobTitle = $("#jobTitle").text();  
            this.contact.city = $("#city").text();
            this.contact.state = $("#state").text();
            this.contact.zip = $("#zip").text();
            this.contact.streetAddress = $("#streetAddress").text(); 
            return this.contactService.editContact(this.contact);            
        }
        
        public addInteraction() {
            this.interaction.contactId = this.contactView.contact.id;
            return this.contactService.addInteraction(this.interaction).then(
                this.$location.path("/contacts"));
        }
    }
}