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
        public file;
        public imageReady: boolean;

        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService, private $uibModal: ng.ui.bootstrap.IModalService, $stateParams: ng.ui.IStateParamsService, private $state: ng.ui.IStateService, private filepickerService, private dealService: MyApp.Services.DealService, private taskService: MyApp.Services.TaskService) {
            this.contact = {};
            this.location = {};
            this.contactView = this.contactService.getOneContact($stateParams['id']);    
            let timeNow = new Date(); 
            timeNow = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), timeNow.getHours(), timeNow.getMinutes());
            this.interaction = {
                date: timeNow
            };      
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

        public pickFile() {
            this.filepickerService.pick(
                { mimetype: 'image/*' },
                this.fileUploaded.bind(this)
            )
        }

        public fileUploaded(file) {
            this.file = file;
            this.imageReady = true;
            this.imageUpload();
        }

        public imageUpload() {
            this.getViewDetails();
            this.contact.imageUrl = this.file.url;
            return this.contactService.editContact(this.contact);
        }

        public editContact() {
            $(".tdEdit").attr("contenteditable", "true").attr("style", "background-color: rgb(255, 255, 194)");  
        }

        public btnEdit() {
            this.getViewDetails();
            return this.contactService.editContact(this.contact);
        }

        public getViewDetails() {
            this.contact.id = this.contactView.contact.id;
            if (this.contact.companyId != null) {
                this.contact.companyId = this.companyChoice;
            }
            this.contact.companyId = this.companyChoice;
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
            this.contact.imageUrl = this.contactView.contact.imageUrl;  
        }

        public confirmEdit() {
            $(".tdEdit").removeAttr("contenteditable").removeAttr("style");
            this.getViewDetails();  
            return this.contactService.editContact(this.contact);
        }

        public chooseCompany() {
            this.getViewDetails();
            return this.contactService.editContact(this.contact).then(() => {
                this.$state.reload();
            });            
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

        public addDealModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/add-deal.html',
                controller: MyApp.Controllers.AddDealModal,
                controllerAs: 'vm',
                size: "deal",
            });
        }
    }
}