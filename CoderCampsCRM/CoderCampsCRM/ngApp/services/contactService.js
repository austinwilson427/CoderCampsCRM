var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var ContactService = (function () {
            function ContactService($resource) {
                this.$resource = $resource;
                this.contactResource = $resource("/api/contactList");
                this.interactionResource = $resource("/api/interactions");
                this.contactDetailResource = $resource("/api/contactDetailView/:id");
                this.contactListResource = $resource("/api/contactListView");
            }
            ContactService.prototype.getAllContacts = function () {
                return this.contactListResource.get();
            };
            ContactService.prototype.getOneContact = function (id) {
                return this.contactDetailResource.get({ id: id });
            };
            ContactService.prototype.addContact = function (contact) {
                return this.contactResource.save(contact).$promise;
            };
            ContactService.prototype.editContact = function (contact) {
                return this.contactResource.save(contact);
            };
            ContactService.prototype.deleteContact = function (id) {
                return this.contactResource.remove({ id: id }).$promise;
            };
            ContactService.prototype.addInteraction = function (interaction) {
                return this.interactionResource.save(interaction).$promise;
            };
            return ContactService;
        })();
        Services.ContactService = ContactService;
        angular.module("MyApp").service("contactService", ContactService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
