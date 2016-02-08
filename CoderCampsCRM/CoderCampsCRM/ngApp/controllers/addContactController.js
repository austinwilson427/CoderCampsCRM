var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var AddContactController = (function () {
            function AddContactController(contactService) {
                this.contactService = contactService;
            }
            AddContactController.prototype.addContact = function () {
                return this.contactService.addContact(this.contact);
            };
            return AddContactController;
        })();
        Controllers.AddContactController = AddContactController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
