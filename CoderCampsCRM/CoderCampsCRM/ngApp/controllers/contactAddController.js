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
                var _this = this;
                this.contactService.addContact(this.contact).then(function () {
                    _this.closeModal();
                    window.location.reload();
                });
            };
            ContactAddController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return ContactAddController;
        })();
        Controllers.ContactAddController = ContactAddController;
        angular.module("MyApp").controller("contactAddController", ContactAddController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
