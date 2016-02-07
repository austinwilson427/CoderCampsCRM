var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactAddController = (function () {
            function ContactAddController(contactService, $location) {
                this.contactService = contactService;
                this.$location = $location;
            }
            ContactAddController.prototype.addContact = function () {
                return this.contactService.addContact(this.contact).then(this.$location.path("/contactList"));
            };
            return ContactAddController;
        })();
        Controllers.ContactAddController = ContactAddController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
