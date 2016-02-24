var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactListController = (function () {
            function ContactListController(contactService, $location, $uibModal, $state) {
                this.contactService = contactService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.$state = $state;
                this.sortReverse = false;
                this.showMap = true;
                this.markers = [];
                this.markersSearch = [];
                this.currentPage = 1;
                this.maxSize = 10;
                this.itemsPerPage = 10;
                this.filterIsDisplayed = false;
                this.showAllContacts();
            }
            ContactListController.prototype.hideFilterResponsive = function () {
                this.filterIsDisplayed = false;
            };
            ContactListController.prototype.showFilterResponsive = function () {
                this.filterIsDisplayed = true;
            };
            ContactListController.prototype.updateSearchList = function () {
                this.currentPage = 1;
                this.itemsPerPage += this.currentPage + 5;
                this.setLocations();
            };
            ContactListController.prototype.syncGoogleContacts = function () {
                var _this = this;
                this.contactService.getGoogleContacts().then(function () {
                    _this.showAllContacts();
                });
            };
            ContactListController.prototype.setLocations = function () {
                this.zoom = 4;
                this.center = { latitude: 40.09024, longitude: -97.712891 };
                if (this.searchText == undefined) {
                    if (this.markers != []) {
                        this.markers = [];
                        this.setMarkers();
                    }
                }
                else {
                    for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
                        var marker = _a[_i];
                        if (marker.options.title.toLowerCase().includes(this.searchText.toLowerCase())) {
                            this.markersSearch.push(marker);
                        }
                    }
                    this.markers = [];
                    this.setMarkers(this.markersSearch);
                }
            };
            ContactListController.prototype.setMarkers = function () {
                var markersSearch = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    markersSearch[_i - 0] = arguments[_i];
                }
                if (!this.searchText) {
                    for (var _a = 0, _b = this.contactsView.contacts; _a < _b.length; _a++) {
                        var contact = _b[_a];
                        if (contact.longitude && contact.latitude) {
                            this.markers.push({
                                id: contact.id,
                                options: {
                                    title: contact.name,
                                },
                                coords: { latitude: contact.latitude, longitude: contact.longitude }
                            });
                        }
                    }
                }
                else {
                    for (var _c = 0; _c < markersSearch.length; _c++) {
                        var markers = markersSearch[_c];
                        for (var _d = 0; _d < markers.length; _d++) {
                            var markerFiltered = markers[_d];
                            this.markers.push({
                                id: markerFiltered.id,
                                options: {
                                    title: markerFiltered.options.title,
                                },
                                coords: { latitude: markerFiltered.coords.latitude, longitude: markerFiltered.coords.longitude }
                            });
                        }
                    }
                }
            };
            ContactListController.prototype.toggleMap = function () {
                if (this.showMap == false) {
                    this.showMap = true;
                    this.setLocations();
                }
                else {
                    this.showMap = false;
                }
            };
            ContactListController.prototype.openNewContactModal = function () {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/modals/contactAddModal.html",
                    controller: MyApp.Controllers.ContactAddController,
                    controllerAs: 'modal',
                    size: "sm"
                });
            };
            ContactListController.prototype.filterContacts = function () {
                var _this = this;
                return this.contactService.filterContacts(this.companyFilter, this.dealFilter, this.taskFilter).then(function (result) {
                    _this.contactsView = result;
                    _this.setLocations();
                });
            };
            ContactListController.prototype.showAllContacts = function () {
                var _this = this;
                this.contactsView = this.contactService.getAllContacts().then(function (result) {
                    _this.contactsView = result;
                    _this.totalItems = result.contacts.length;
                    _this.taskFilter = null;
                    _this.dealFilter = null;
                    _this.companyFilter = null;
                    _this.setLocations();
                });
            };
            ContactListController.prototype.openContactDetailsPage = function (id) {
                this.$location.path('/contactDetails/' + id);
            };
            return ContactListController;
        })();
        Controllers.ContactListController = ContactListController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
