var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DashboardController = (function () {
            function DashboardController(dashboardService) {
                this.dashboardService = dashboardService;
                this.getAllContacts();
            }
            DashboardController.prototype.getAllContacts = function () {
                var _this = this;
                this.dashboardService.listAllContactsForUser().$promise.then(function (result) {
                    _this.totalContacts = result.length;
                    console.log(result);
                });
            };
            return DashboardController;
        })();
        Controllers.DashboardController = DashboardController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=dashboardController.js.map