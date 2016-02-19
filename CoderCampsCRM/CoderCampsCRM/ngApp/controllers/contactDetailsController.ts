namespace MyApp.Controllers {

    export class ContactDetailsController {
        
        public contactView;  
        public interaction;  
        public contact;
        public location;
        public note;
        public companyChoice;
        public zoom;
        public center;
        public marker;
        public showMap = false;

        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService, private $uibModal: ng.ui.bootstrap.IModalService, $stateParams: ng.ui.IStateParamsService, private $state: ng.ui.IStateService) {
            this.contact = {};
            this.location = {};
            this.contactView = this.contactService.getOneContact($stateParams['id']);             
        }

        public deleteModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/modals/contactDeleteModal.html",
                controller: MyApp.Controllers.ContactDeleteController,
                controllerAs: 'modal',
                size: 'sm',
                resolve: {
                    contact: () => this.contactView.contact
                }
            });
        }

        public setLocation() {
            this.zoom = 10;
            this.center = { latitude: this.contactView.contact.latitude, longitude: this.contactView.contact.longitude}; 
            this.marker = [
                {
                    id: this.contactView.contact.id,
                    options: {
                        title: this.contactView.contact.name,
                    },
                    latitude: this.contactView.contact.latitude,
                    longitude: this.contactView.contact.longitude,
                }, 
            ]
            if (this.showMap == false) {
                this.showMap = true;
            }
            else {
                this.showMap = false;
            }
        }

        public editContact() {
            $(".tdEdit").attr("contenteditable", "true").attr("style", "background-color: rgb(255, 255, 194)");  
        }

        public editNotes() {
            this.contact.id = this.contactView.contact.id;
            this.contact.companyId = this.contactView.contact.companyId;
            this.contact.lastInteraction = $("#lastInteraction").text();
            this.contact.name = $("#name").text();
            this.contact.email = $("#email").text();
            this.contact.phoneNumber = $("#phoneNumber").text();
            this.contact.jobTitle = $("#jobTitle").text();
            this.contact.country = $("#country").text();
            this.contact.city = $("#city").text();
            this.contact.state = $("#state").text();
            this.contact.zip = $("#zip").text();
            this.contact.notes = $("#notes").text();
            this.contact.streetAddress = $("#streetAddress").text();
            this.contact.longitude = $("#long").text();
            this.contact.latitude = $("#lat").text();  
            this.contact.userId = this.contactView.contact.userId;
            return this.contactService.editContact(this.contact);
        }

        public confirmEdit() {
            $(".tdEdit").removeAttr("contenteditable").removeAttr("style");
            this.contact.id = this.contactView.contact.id;
            this.contact.companyId = this.contactView.contact.companyId;  
            this.contact.lastInteraction = $("#lastInteraction").text();          
            this.contact.name = $("#name").text();
            this.contact.email = $("#email").text();
            this.contact.phoneNumber = $("#phoneNumber").text();
            this.contact.jobTitle = $("#jobTitle").text();
            this.contact.country = $("#country").text(); 
            this.contact.city = $("#city").text();  
            this.contact.state = $("#state").text();  
            this.contact.zip = $("#zip").text();  
            this.contact.notes = $("#notes").text();
            this.contact.streetAddress = $("#streetAddress").text();  
            this.contact.longitude = $("#long").text();
            this.contact.latitude = $("#lat").text();    
            this.contact.userId = this.contactView.contact.userId;     
            return this.contactService.editContact(this.contact);
        }

        public chooseCompany() {
            
            this.contact.id = this.contactView.contact.id;
            this.contact.companyId = this.companyChoice;
            this.contact.lastInteraction = $("#lastInteraction").text();
            this.contact.name = $("#name").text();
            this.contact.email = $("#email").text();
            this.contact.phoneNumber = $("#phoneNumber").text();
            this.contact.jobTitle = $("#jobTitle").text();  
            this.contact.city = $("#city").text();
            this.contact.state = $("#state").text();
            this.contact.zip = $("#zip").text();
            this.contact.streetAddress = $("#streetAddress").text(); 
            this.contact.longitude = $("#long").text();
            this.contact.latitude = $("#lat").text();  
            this.contact.userId = this.contactView.contact.userId;
            return this.contactService.editContact(this.contact).then(this.$state.reload());            
        }

        public checkCoordsId() {
            if (this.contactView.location) {
                this.location.id = this.contactView.location.id;
            }
            else {
                this.location.id = 0;
            }
        }
        
        public addInteraction() {
            this.interaction.contactId = this.contactView.contact.id;
            return this.contactService.addInteraction(this.interaction).then(
                this.$state.reload());
        }

        public deleteInteraction(id) {
            return this.contactService.deleteInteraction(id).then(
                this.$state.reload());
        }
    }
}