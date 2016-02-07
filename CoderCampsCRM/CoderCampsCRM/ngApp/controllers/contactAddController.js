var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactAddController = (function () {
            function ContactAddController(contactService, $location, $uibModalInstance) {
                this.contactService = contactService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
            }
            ContactAddController.prototype.addContact = function () {
                return this.contactService.addContact(this.contact).then(this.$location.path("/contactList"));
            };
            ContactAddController.prototype.cancelAdd = function () {
                this.$uibModalInstance.close();
            };
            return ContactAddController;
        })();
        Controllers.ContactAddController = ContactAddController;
        angular.module("MyApp").controller("contactAddController", ContactAddController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=contactAddController.js.map