namespace MyApp.Controllers {

    export class ContactListController {

        public contactsView;
        public filterChoice;
        public sortType = name;
        public sortReverse = false;
        public showMap = true;
        public zoom;
        public center;
        public markers = [];
        public totalItems;
        public currentPage = 1;
        public maxSize = 5;
        public itemsPerPage = 5;
        public contactsSearch;

        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService, private $uibModal: angular.ui.bootstrap.IModalService, private $state: ng.ui.IStateService) {
            this.showAllContacts();
        }

        public updateSearchList() {
            this.currentPage = 1;
            this.itemsPerPage += 5;
        }

        public totalItemsGet() {
            this.totalItems = this.contactsView.contacts.length;
        } 

        public setLocations() {
            this.zoom = 4;
            this.center = { latitude: 40.09024, longitude: -97.712891 };
            if (this.markers != []) {
                this.markers = [];
                this.setMarkers();
            } else {
                this.setMarkers();
            }
        }

        public setMarkers() {
            for (let contact of this.contactsView.contacts) {
                if (contact.longitude && contact.latitude) {
                    this.markers.push({
                        id: contact.id,
                        options: {
                            title: contact.name,
                        },
                        coords: { latitude: contact.latitude, longitude: contact.longitude }
                    })
                }
            }
        }

        public toggleMap() {
            if (this.showMap == false) {
                this.showMap = true;
                this.setLocations();
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
                this.contactsView = result;
                this.setLocations();
            });
        }

        public filterByDeals() {
            return this.contactService.filterByDeals(this.filterChoice).then((result) => {
                this.contactsView = result;
                this.setLocations();
            });
        }

        public filterByTasks() {
            return this.contactService.filterByTasks(this.filterChoice).then((result) => {
                this.contactsView = result;
                this.setLocations();
            });
        }

        public showAllContacts() {
            this.contactsView = this.contactService.getAllContacts().then((result) => {
                this.contactsView = result;
                this.totalItems = result.contacts.length;
                this.setLocations();
            });
        }

        public openContactDetailsPage(id: number) {
            this.$location.path('/contactDetails/' + id);
        }
    }
}