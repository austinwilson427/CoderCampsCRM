var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var DealContactService = (function () {
            function DealContactService($resource) {
                this.$resource = $resource;
                this.dealContactResource = $resource("api/dealcontacts/:id");
                this.dealContactShareResource = $resource("api/dealcontacts/share/:id");
            }
            DealContactService.prototype.getAllDealContacts = function () {
                return this.dealContactResource.query();
            };
            DealContactService.prototype.getAllDealContactsByDealId = function (id) {
                return this.dealContactResource.query({ id: id });
            };
            DealContactService.prototype.getAllDealSharersByDealId = function (id) {
                return this.dealContactShareResource.query({ id: id });
            };
            DealContactService.prototype.saveDealContact = function (contactToSave) {
                return this.dealContactResource.save(contactToSave).$promise;
            };
            DealContactService.prototype.deleteDealContact = function (id) {
                return this.dealContactResource.delete({ id: id }).$promise;
            };
            return DealContactService;
        })();
        Services.DealContactService = DealContactService;
        angular.module("MyApp").service("dealContactService", DealContactService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
