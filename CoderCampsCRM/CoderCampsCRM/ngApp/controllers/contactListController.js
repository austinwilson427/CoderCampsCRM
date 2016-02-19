var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactListController = (function () {
            function ContactListController(contactService, $location, $uibModal, $state) {
                var _this = this;
                this.contactService = contactService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.$state = $state;
                this.sortType = name;
                this.sortReverse = false;
                this.showMap = true;
                this.markers = [];
                this.currentPage = 1;
                this.maxSize = 5;
                this.itemsPerPage = 5;
                this.contactService.getGoogleContacts().then(function () {
                    _this.showAllContacts();
                });
            }
            ContactListController.prototype.updateSearchList = function () {
                this.currentPage = 1;
                this.itemsPerPage += this.currentPage + 5;
            };
            ContactListController.prototype.totalItemsGet = function () {
                this.totalItems = this.contactsView.contacts.length;
            };
            ContactListController.prototype.setLocations = function () {
                this.zoom = 4;
                this.center = { latitude: 40.09024, longitude: -97.712891 };
                if (this.markers != []) {
                    this.markers = [];
                    this.setMarkers();
                }
                else {
                    this.setMarkers();
                }
            };
            ContactListController.prototype.setMarkers = function () {
                for (var _i = 0, _a = this.contactsView.contacts; _i < _a.length; _i++) {
                    var contact = _a[_i];
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
//# sourceMappingURL=contactListController.js.map