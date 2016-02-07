var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactDetailsController = (function () {
            function ContactDetailsController(userService, $routeParams, $location) {
                this.userService = userService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.contact = this.userService.getOneContact($routeParams['id']);
            }
            ContactDetailsController.prototype.deleteContact = function (id) {
                return this.userService.deleteContact(id).then(this.$location.path("/contactList"));
            };
            ContactDetailsController.prototype.editContact = function (contact) {
                return this.userService.addContact(contact).then(this.$location.path("/contactList"));
            };
            return ContactDetailsController;
        })();
        Controllers.ContactDetailsController = ContactDetailsController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=contactDetailsController.js.map