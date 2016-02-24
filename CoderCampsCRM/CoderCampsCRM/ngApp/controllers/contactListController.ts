namespace MyApp.Controllers {

    export class ContactListController {

        public contactsView;
        public filterChoice;
        public sortType;
        public sortReverse = false;
        public showMap = true;
        public zoom;
        public center;
        public markers: any = [];
        public markersSearch: any = [];
        public totalItems;
        public companyFilter;
        public dealFilter;
        public taskFilter;
        public searchText;
        public currentPage = 1;
        public maxSize = 10;
        public itemsPerPage = 10;
        public filterIsDisplayed;

        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService, private $uibModal: angular.ui.bootstrap.IModalService, private $state: ng.ui.IStateService) {
            this.filterIsDisplayed = false;
            this.showAllContacts();
        }

        public hideFilterResponsive() {
            this.filterIsDisplayed = false;
        }

        public showFilterResponsive() {
            this.filterIsDisplayed = true;
        }

        public updateSearchList() {
            this.currentPage = 1;
            this.itemsPerPage += this.currentPage + 5;
            this.setLocations();
        }

        public syncGoogleContacts() {
            this.contactService.getGoogleContacts().then(() => {
                this.showAllContacts();
            });
        }

        public setLocations() {
            this.zoom = 4;
            this.center = { latitude: 40.09024, longitude: -97.712891 };
            if (this.searchText == undefined) {
                if (this.markers != []) {
                    this.markers = [];
                    this.setMarkers();
                }
            }
            else {
                for (let marker of this.markers) {
                    if (marker.options.title.toLowerCase().includes(this.searchText.toLowerCase())) {
                        this.markersSearch.push(marker);
                    }
                }
                this.markers = [];
                this.setMarkers(this.markersSearch);
            }
        }

        public setMarkers(...markersSearch) {
            if (!this.searchText) {
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
            else {
                for (let markers of markersSearch) {
                    for (let markerFiltered of markers) {
                        this.markers.push({
                            id: markerFiltered.id,
                            options: {
                                title: markerFiltered.options.title,
                            },
                            coords: { latitude: markerFiltered.coords.latitude, longitude: markerFiltered.coords.longitude }
                        })
                    }
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

        public filterContacts() {
            return this.contactService.filterContacts(this.companyFilter, this.dealFilter, this.taskFilter).then((result) => {
                this.contactsView = result;
                this.setLocations();
            });
        }

        public showAllContacts() {
            this.contactsView = this.contactService.getAllContacts().then((result) => {
                this.contactsView = result;
                this.totalItems = result.contacts.length;
                this.taskFilter = null;
                this.dealFilter = null;
                this.companyFilter = null;
                this.setLocations();
            });
        }

        public openContactDetailsPage(id: number) {
            this.$location.path('/contactDetails/' + id);
        }
    }
}