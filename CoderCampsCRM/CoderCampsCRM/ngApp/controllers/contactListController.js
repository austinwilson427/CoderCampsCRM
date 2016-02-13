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
                this.showAllContacts();
            }
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
            ContactListController.prototype.invertArrow = function (id) {
                if ($(id).attr("glyphicon glyphicon-chevron-down")) {
                    $(id).removeAttr("glyphicon glyphicon-chevron-down");
                    $(id).attr("glyphicon glyphicon-chevron-up");
                }
                else {
                    $(id).removeAttr("glyphicon glyphicon-chevron-up");
                    $(id).attr("glyphicon glyphicon-chevron-down");
                }
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