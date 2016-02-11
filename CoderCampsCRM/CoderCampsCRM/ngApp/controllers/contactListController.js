var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactListController = (function () {
            function ContactListController(contactService, $location, $uibModal) {
                this.contactService = contactService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.contactsView = contactService.getAllContacts();
            }
            ContactListController.prototype.openNewContactModal = function () {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/modals/contactAddModal.html",
                    controller: MyApp.Controllers.ContactAddController,
                    controllerAs: 'modal',
                    size: "sm"
                });
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