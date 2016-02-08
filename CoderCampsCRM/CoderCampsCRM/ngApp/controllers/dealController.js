var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DealsController = (function () {
            function DealsController(dealService, $uibModal) {
                this.dealService = dealService;
                this.$uibModal = $uibModal;
                this.reverse = false;
                this.sortName = 'dealName';
                this.allDeals = dealService.listAllDeals();
            }
            DealsController.prototype.sortBy = function (field) {
                this.sortName = field;
                this.menuDirectionName = this.toggleMenu(this.menuDirectionName, field, "dealName");
                this.menuDirectionStage = this.toggleMenu(this.menuDirectionStage, field, "stage");
                this.menuDirectionDate = this.toggleMenu(this.menuDirectionDate, field, "closeDate");
                this.menuDirectionAmount = this.toggleMenu(this.menuDirectionAmount, field, "amount");
                this.menuDirectionOwner = this.toggleMenu(this.menuDirectionOwner, field, "dealOwnerId");
                this.menuDirectionCompany = this.toggleMenu(this.menuDirectionCompany, field, "companyId");
            };
            DealsController.prototype.toggleMenu = function (menuDirection, field, wantedField) {
                var returnDirection;
                if (menuDirection == "glyphicon glyphicon-menu-up" && field == wantedField) {
                    returnDirection = "glyphicon glyphicon-menu-down";
                    this.reverse = !this.reverse;
                }
                else if (menuDirection == "glyphicon glyphicon-menu-down" && field == wantedField) {
                    returnDirection = "glyphicon glyphicon-menu-up";
                    this.reverse = !this.reverse;
                }
                else if (menuDirection != "glyphicon glyphicon-menu-up" && menuDirection != "glyphicon glyphicon-menu-down" && field == wantedField) {
                    returnDirection = "glyphicon glyphicon-menu-down";
                    this.reverse = false;
                }
                else {
                    returnDirection = "default_span";
                }
                return returnDirection;
            };
            DealsController.prototype.addDealModal = function () {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/add-deal.html',
                    controller: AddDealModal,
                    controllerAs: 'vm',
                    size: "sm"
                });
            };
            return DealsController;
        })();
        Controllers.DealsController = DealsController;
        var AddDealModal = (function () {
            function AddDealModal() {
            }
            return AddDealModal;
        })();
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=dealController.js.map