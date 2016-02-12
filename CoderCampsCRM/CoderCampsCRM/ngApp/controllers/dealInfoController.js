var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DealInfoController = (function () {
            function DealInfoController(dealService, companiesService, $stateParams) {
                this.dealService = dealService;
                this.companiesService = companiesService;
                this.$stateParams = $stateParams;
                this.routeId = $stateParams["id"];
                console.log(this.routeId);
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
        var DealInfoNoteController = (function () {
            function DealInfoNoteController() {
            }
            return DealInfoNoteController;
        })();
        Controllers.DealInfoNoteController = DealInfoNoteController;
        var DealInfoActivityController = (function () {
            function DealInfoActivityController() {
            }
            return DealInfoActivityController;
        })();
        Controllers.DealInfoActivityController = DealInfoActivityController;
        var DealInfoTaskController = (function () {
            function DealInfoTaskController() {
            }
            return DealInfoTaskController;
        })();
        Controllers.DealInfoTaskController = DealInfoTaskController;
        var DealInfoEventController = (function () {
            function DealInfoEventController() {
            }
            return DealInfoEventController;
        })();
        Controllers.DealInfoEventController = DealInfoEventController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=dealInfoController.js.map