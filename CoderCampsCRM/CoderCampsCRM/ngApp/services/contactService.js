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
                this.locationResource = $resource("/api/locations");
                this.contactFilterResource = $resource("/api/contactFilterView/:id");
                this.googleContactResource = $resource("/api/contactList/:id");
            }
            ContactService.prototype.filterContacts = function (companyId, dealId, taskId) {
                var vm = {};
                vm.companyId = companyId;
                vm.dealId = dealId;
                vm.taskId = taskId;
                var data = this.contactFilterResource.save(vm);
                data.$promise.then(function () {
                    for (var _i = 0, _a = data.contacts; _i < _a.length; _i++) {
                        var contact = _a[_i];
                        contact.lastInteraction = new Date(Date.parse(contact.lastInteraction));
                    }
                });
                return data.$promise;
            };
            //////////////Google Contacts /////////
            ContactService.prototype.getGoogleContacts = function () {
                var data = this.googleContactResource.query().$promise;
                return data;
            };
            ;
            ContactService.prototype.getAllContacts = function () {
                var data = this.contactListResource.get();
                data.$promise.then(function () {
                    for (var _i = 0, _a = data.contacts; _i < _a.length; _i++) {
                        var contact = _a[_i];
                        contact.lastInteraction = new Date(Date.parse(contact.lastInteraction));
                    }
                });
                return data.$promise;
            };
            ContactService.prototype.getOneContact = function (id) {
                var data = this.contactDetailResource.get({ id: id });
                data.$promise.then(function () {
                    for (var _i = 0, _a = data.interactions; _i < _a.length; _i++) {
                        var interaction = _a[_i];
                        interaction.date = new Date(Date.parse(interaction.date));
                    }
                });
                return data;
            };
            ContactService.prototype.addLocation = function (location) {
                return this.locationResource.save(location).$promise;
            };
            ContactService.prototype.addContact = function (contact) {
                return this.contactResource.save(contact).$promise;
            };
            ContactService.prototype.editContact = function (contact) {
                debugger;
                var data = this.contactResource.save(contact).$promise;
                return data;
            };
            ContactService.prototype.deleteContact = function (id) {
                var data = this.contactResource.remove({ id: id }).$promise;
                return data;
            };
            ContactService.prototype.addInteraction = function (interaction) {
                return this.interactionResource.save(interaction).$promise;
            };
            ContactService.prototype.deleteInteraction = function (id) {
                return this.interactionResource.remove({ id: id }).$promise;
            };
            return ContactService;
        })();
        Services.ContactService = ContactService;
        angular.module("MyApp").service("contactService", ContactService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=contactService.js.map