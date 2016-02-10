var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactDetailsController = (function () {
            function ContactDetailsController(contactService, $routeParams, $location) {
                this.contactService = contactService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.contactView = this.contactService.getOneContact($routeParams['id']);
            }
            ContactDetailsController.prototype.deleteContact = function () {
                return this.contactService.deleteContact(this.contactView.contact.id).then(this.$location.path("/contacts"));
            };
            ContactDetailsController.prototype.editContact = function () {
                return this.contactService.addContact(this.contact).then(this.$location.path("/contacts"));
            };
            ContactDetailsController.prototype.addInteraction = function (interaction) {
                return this.contactService.addInteraction(interaction).then(this.$location.path("/contacts"));
            };
            return ContactDetailsController;
        })();
        Controllers.ContactDetailsController = ContactDetailsController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
