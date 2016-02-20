var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var DealService = (function () {
            function DealService($resource) {
                this.$resource = $resource;
                this.dealResourceOwned = $resource("api/deals/owned/:id");
                this.dealResourceShared = $resource("api/deals/shared/:id");
                this.dealResourcePag = $resource("api/deals/pag/:take/:skip/:order/:orderDirection");
                this.dealResourceFromCompany = $resource("api/deals/company/:id");
                this.dealResourceFromDealOwner = $resource("api/deals/deal-owner/:id");
            }
            DealService.prototype.listAllDealsOwned = function () {
                return this.dealResourceOwned.query();
            };
            DealService.prototype.listAllDealsShared = function () {
                return this.dealResourceShared.query();
            };
            DealService.prototype.listDealsByPag = function (takeCount, skipCount, order, direction) {
                return this.dealResourcePag.query({
                    skip: skipCount,
                    take: takeCount,
                    order: order,
                    orderDirection: direction
                });
            };
            DealService.prototype.getDealsOwnedByDealId = function (id) {
                return this.dealResourceOwned.get({ id: id });
            };
            DealService.prototype.getDealsSharedByDealId = function (id) {
                return this.dealResourceShared.get({ id: id });
            };
            DealService.prototype.listAllDealsByCompanyId = function (id) {
                return this.dealResourceFromCompany.query({ id: id });
            };
            DealService.prototype.listAllDealsByDealOwner = function (id) {
                return this.dealResourceFromDealOwner.query({ id: id });
            };
            DealService.prototype.saveDeal = function (dealToSave) {
                return this.dealResourceOwned.save(dealToSave).$promise;
            };
            DealService.prototype.deleteDeal = function (id) {
                return this.dealResourceOwned.delete({ id: id }).$promise;
            };
            return DealService;
        })();
        Services.DealService = DealService;
        angular.module("MyApp").service("dealService", DealService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=dealService.js.map