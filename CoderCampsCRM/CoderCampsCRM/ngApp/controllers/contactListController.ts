namespace MyApp.Controllers {

    export class ContactListController {

        public contactsView;
        public filterChoice;
        public sortType = name;
        public sortReverse = false;
        public showMap = false;
        public zoom;
        public center;
        public markers = [];

        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService, private $uibModal: angular.ui.bootstrap.IModalService, private $state: ng.ui.IStateService) {         
            this.showAllContacts();

        }

        public setLocations() {
            this.zoom = 4;
            this.center = { latitude: 40.09024, longitude: -97.712891 };
            for (let location of this.contactsView.locations) {         
                this.markers.push({
                    id: location.id,
                    options: {
                        title: location.title,
                    },
                    latitude: location.latitude,
                    longitude: location.longitude,
                })
            }
            if (this.showMap == false) {
                this.showMap = true;
            }
            else {
                this.showMap = false;
            }
        }

        public openNewContactModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/modals/contactAddModal.html",
                controller: MyApp.Controllers.ContactAddController,
                controllerAs: 'modal',
                size: "sm"
            })        
        }

        public filterByCompanies() {
            return this.contactService.filterByCompanies(this.filterChoice).then((result) => {
                this.contactsView = result
            });
        }

        public filterByDeals() {
            return this.contactService.filterByDeals(this.filterChoice).then((result) => {
                this.contactsView = result
            });
        }

        public filterByTasks() {
            return this.contactService.filterByTasks(this.filterChoice).then((result) => {
                this.contactsView = result
            });
        }

        public showAllContacts() {
            this.contactsView = this.contactService.getAllContacts();
        }

        public openContactDetailsPage(id: number) {
            this.$location.path('/contactDetails/' + id);
        }
    }
}