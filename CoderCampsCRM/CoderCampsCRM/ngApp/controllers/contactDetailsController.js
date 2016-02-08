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
                return this.userService.deleteContact(id).then(this.$location.path("/contacts"));
            };
            ContactDetailsController.prototype.editContact = function (contact) {
                return this.userService.addContact(contact).then(this.$location.path("/contacts"));
            };
            ContactDetailsController.prototype.addInteraction = function (interaction) {
                return this.userService.addInteraction(interaction).then(this.$location.path("/contacts"));
            };
            return ContactDetailsController;
        })();
        Controllers.ContactDetailsController = ContactDetailsController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
