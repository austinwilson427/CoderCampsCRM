var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactListController = (function () {
            function ContactListController(contactService, $location, $uibModal) {
                this.contactService = contactService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.contacts = contactService.getAllContacts();
            }
            ContactListController.prototype.openNewContactModal = function () {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/modals/contactAddModal.html",
                    controller: MyApp.Controllers.ContactAddController,
                    controllerAs: 'vm',
                    size: "md"
                });
            };
            ContactListController.prototype.openContactDetailsPage = function (id) {
                this.$location.path('/contactList/' + id);
            };
            return ContactListController;
        })();
        Controllers.ContactListController = ContactListController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
