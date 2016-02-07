var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var ContactService = (function () {
            function ContactService($resource) {
                this.$resource = $resource;
                this.contactResource = $resource("/api/contactResource");
            }
            ContactService.prototype.getAllContacts = function () {
                return this.contactResource.query();
            };
            ContactService.prototype.getOneContact = function (id) {
                return this.contactResource.get({ id: id });
            };
            ContactService.prototype.addContact = function (contact) {
                return this.contactResource.save().$promise;
            };
            ContactService.prototype.deleteContact = function (id) {
                return this.contactResource.remove({ id: id }).$promise;
            };
            return ContactService;
        })();
        Services.ContactService = ContactService;
        angular.module("MyApp").service("contactService", ContactService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=contactService.js.map