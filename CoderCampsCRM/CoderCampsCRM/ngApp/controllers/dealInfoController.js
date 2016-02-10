var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DealInfoController = (function () {
            function DealInfoController(dealService, $routeParams, companiesService) {
                this.dealService = dealService;
                this.$routeParams = $routeParams;
                this.companiesService = companiesService;
                this.routeId = $routeParams["id"];
                this.getDeal();
            }
            DealInfoController.prototype.getDeal = function () {
                var _this = this;
                this.dealService.getDealByDealId(this.routeId).$promise.then(function (result) {
                    _this.dealInfo = result;
                    _this.companiesService.getCompany(result.companyId).$promise.then(function (companyResult) {
                        console.log(companyResult);
                        _this.company = companyResult;
                    });
                });
            };
            return DealInfoController;
        })();
        Controllers.DealInfoController = DealInfoController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
