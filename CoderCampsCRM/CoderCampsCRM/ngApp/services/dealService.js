var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var DealService = (function () {
            function DealService($resource) {
                this.$resource = $resource;
                this.dealResource = $resource("api/deals/:id");
                this.dealResourceFromCompany = $resource("api/deals/company/:id");
                this.dealResourceFromDealOwner = $resource("api/deals/deal-owner/:id");
            }
            DealService.prototype.listAllDeals = function () {
                return this.dealResource.query();
            };
            DealService.prototype.getDealByDealId = function (id) {
                return this.dealResource.get({ id: id });
            };
            DealService.prototype.listAllDealsByCompanyId = function (id) {
                return this.dealResourceFromCompany.query({ id: id });
            };
            DealService.prototype.listAllDealsByDealOwner = function (id) {
                return this.dealResourceFromDealOwner.query({ id: id });
            };
            DealService.prototype.saveDeal = function (dealToSave) {
                return this.dealResource.save(dealToSave).$promise;
            };
            DealService.prototype.deleteDeal = function (id) {
                return this.dealResource.delete({ id: id }).$promise;
            };
            return DealService;
        })();
        Services.DealService = DealService;
        angular.module("MyApp").service("dealService", DealService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=dealService.js.map