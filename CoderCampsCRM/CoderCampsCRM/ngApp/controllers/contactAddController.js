var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactAddController = (function () {
            function ContactAddController(contactService, $route, $uibModalInstance, companiesService) {
                this.contactService = contactService;
                this.$route = $route;
                this.$uibModalInstance = $uibModalInstance;
                this.companiesService = companiesService;
                this.companies = this.companiesService.getCompanies();
            }
            ContactAddController.prototype.addContact = function () {
                var _this = this;
                this.contactService.addContact(this.contact).then(function () {
                    _this.closeModal();
                    _this.$route.reload();
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
//# sourceMappingURL=contactAddController.js.map