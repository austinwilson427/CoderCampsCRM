var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var DealLogItemService = (function () {
            function DealLogItemService($resource) {
                this.$resource = $resource;
                this.dealResource = $resource("api/deallogitems/:id");
                this.dealResourceFromDeal = $resource("api/deallogitems/deal/:id");
            }
            DealLogItemService.prototype.listAllDealLogItems = function () {
                return this.dealResource.query();
            };
            DealLogItemService.prototype.getDealLogItemsById = function (id) {
                return this.dealResource.get({ id: id });
            };
            DealLogItemService.prototype.listDealLogItemsByDealId = function (id) {
                return this.dealResourceFromDeal.query({ id: id });
            };
            DealLogItemService.prototype.saveDealLogItem = function (dealToSave) {
                return this.dealResource.save(dealToSave).$promise;
            };
            DealLogItemService.prototype.deleteDealLogItem = function (id) {
                return this.dealResource.delete({ id: id }).$promise;
            };
            return DealLogItemService;
        })();
        Services.DealLogItemService = DealLogItemService;
        angular.module("MyApp").service("dealLogItemService", DealLogItemService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
