var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactAddController = (function () {
            function ContactAddController(contactService, $state, $uibModalInstance, companiesService) {
                this.contactService = contactService;
                this.$state = $state;
                this.$uibModalInstance = $uibModalInstance;
                this.companiesService = companiesService;
                this.companies = this.companiesService.getCompanies();
            }
            ContactAddController.prototype.addContact = function () {
                var _this = this;
                this.contactService.addContact(this.contact).then(function () {
                    _this.closeModal();
                    _this.$state.reload();
                });
            };
            ContactAddController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return ContactAddController;
        })();
        Controllers.ContactAddController = ContactAddController;
        angular.module("MyApp").controller("contactAddController", ContactAddController);
        var ContactDeleteController = (function () {
            function ContactDeleteController(contactService, $state, $uibModalInstance, $stateParams, $location, contact) {
                this.contactService = contactService;
                this.$state = $state;
                this.$uibModalInstance = $uibModalInstance;
                this.$location = $location;
                this.contact = contact;
            }
            ContactDeleteController.prototype.deleteContact = function () {
                var _this = this;
                this.closeModal();
                this.$location.path("/contacts");
                this.contactService.deleteContact(this.contact.id).then(function () {
                    _this.$state.reload();
                });
            };
            ContactDeleteController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return ContactDeleteController;
        })();
        Controllers.ContactDeleteController = ContactDeleteController;
        angular.module("MyApp").controller("contactDeleteController", ContactDeleteController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=contactAddController.js.map