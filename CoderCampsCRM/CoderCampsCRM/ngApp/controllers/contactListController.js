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
                this.sortType = name;
                this.sortReverse = false;
                this.showMap = false;
                this.markers = [];
                this.showAllContacts();
            }
            ContactListController.prototype.setLocations = function () {
                this.zoom = 4;
                this.center = { latitude: 40.09024, longitude: -97.712891 };
                for (var _i = 0, _a = this.contactsView.locations; _i < _a.length; _i++) {
                    var location_1 = _a[_i];
                    this.markers.push({
                        id: location_1.id,
                        options: {
                            title: location_1.title,
                        },
                        latitude: location_1.latitude,
                        longitude: location_1.longitude,
                    });
                }
                if (this.showMap == false) {
                    this.showMap = true;
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
            ContactListController.prototype.filterByCompanies = function () {
                var _this = this;
                return this.contactService.filterByCompanies(this.filterChoice).then(function (result) {
                    _this.contactsView = result;
                });
            };
            ContactListController.prototype.filterByDeals = function () {
                var _this = this;
                return this.contactService.filterByDeals(this.filterChoice).then(function (result) {
                    _this.contactsView = result;
                });
            };
            ContactListController.prototype.filterByTasks = function () {
                var _this = this;
                return this.contactService.filterByTasks(this.filterChoice).then(function (result) {
                    _this.contactsView = result;
                });
            };
            ContactListController.prototype.showAllContacts = function () {
                this.contactsView = this.contactService.getAllContacts();
            };
            ContactListController.prototype.openContactDetailsPage = function (id) {
                this.$location.path('/contactDetails/' + id);
            };
            return ContactListController;
        })();
        Controllers.ContactListController = ContactListController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
