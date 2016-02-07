var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DealsController = (function () {
            function DealsController(dealService) {
                this.dealService = dealService;
                this.allDeals = dealService.listAllDeals();
            }
            return DealsController;
        })();
        Controllers.DealsController = DealsController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
