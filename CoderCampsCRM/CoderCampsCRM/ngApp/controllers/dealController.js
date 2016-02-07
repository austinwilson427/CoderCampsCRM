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
                this.getAllItems();
            }
            DealsController.prototype.getAllItems = function () {
                var _this = this;
                this.dealService.listAllDeals().$promise.then(function (result) {
                    _this.allDeals = [];
                    for (var i = 0; i < result.length; i++) {
                        _this.allDeals.push(result[i]);
                    }
                });
            };
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
                    size: "deal"
                });
            };
            DealsController.prototype.editDealModal = function (dealToAdd) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/edit-deal.html',
                    controller: EditDealModal,
                    controllerAs: 'vm',
                    resolve: {
                        dealDetails: function () { return dealToAdd; }
                    },
                    size: "deal"
                });
            };
            DealsController.prototype.deleteDealModal = function (dealToDelete) {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/delete-deal.html',
                    controller: DeleteDealModal,
                    controllerAs: 'vm',
                    resolve: {
                        deal: function () { return dealToDelete; }
                    },
                    size: "deal"
                });
            };
            DealsController.prototype.filterByDate = function () {
                var _this = this;
                this.dealService.listAllDeals().$promise.then(function (result) {
                    _this.allDeals = [];
                    var today = new Date();
                    var today_num = today.setDate(today.getDate());
                    var today_month = new Date().getMonth();
                    var today_date = new Date().getDate();
                    var today_year = new Date().getFullYear();
                    var week_from_today = today.setDate(today.getDate() + 7);
                    var month_from_today = today.setDate(today.getDate() + 24); //Adding 24 + 7 for 31 days
                    var filteredDates = [];
                    for (var i = 0; i < result.length; i++) {
                        var inner_full = new Date(result[i].closeDate);
                        var inner_full_num = inner_full.setDate(inner_full.getDate());
                        var inner_set = inner_full.setDate(inner_full.getDate());
                        var inner_month = new Date(result[i].closeDate).getMonth();
                        var inner_date = new Date(result[i].closeDate).getDate();
                        var inner_year = new Date(result[i].closeDate).getFullYear();
                        if (_this.dateFilter == "today") {
                            if (today_month == inner_month && today_date == inner_date && today_year == inner_year) {
                                filteredDates.push(result[i]);
                            }
                        }
                        else if (_this.dateFilter == "week") {
                            if (inner_set < week_from_today && inner_full_num >= today_num) {
                                filteredDates.push(result[i]);
                            }
                        }
                        else if (_this.dateFilter == "month") {
                            if (inner_set < month_from_today && inner_full_num >= today_num) {
                                filteredDates.push(result[i]);
                            }
                        }
                        else {
                            filteredDates.push(result[i]);
                        }
                    }
                    _this.allDeals = filteredDates;
                });
            };
            return DealsController;
        })();
        Controllers.DealsController = DealsController;
        var AddDealModal = (function () {
            function AddDealModal(dealService, $location, $uibModalInstance, $route) {
                this.dealService = dealService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.$route = $route;
            }
            AddDealModal.prototype.addDeal = function (dealToAdd) {
                var _this = this;
                console.log(dealToAdd);
                this.dealService.saveDeal(dealToAdd).then(function () {
                    _this.closeModal();
                    _this.$location.path('/deals');
                    _this.$route.reload();
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            AddDealModal.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return AddDealModal;
        })();
        var EditDealModal = (function () {
            function EditDealModal(dealService, $location, $uibModalInstance, dealDetails, $route) {
                this.dealService = dealService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.dealDetails = dealDetails;
                this.$route = $route;
                this.dealDetails.closeDate = new Date(this.dealDetails.closeDate);
            }
            EditDealModal.prototype.editDeal = function () {
                var _this = this;
                console.log(this.dealDetails);
                this.dealService.saveDeal(this.dealDetails).then(function () {
                    _this.closeModal();
                    _this.$location.path('/deals');
                    _this.$route.reload();
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            EditDealModal.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return EditDealModal;
        })();
        var DeleteDealModal = (function () {
            function DeleteDealModal(dealService, $location, $uibModalInstance, deal, $route) {
                this.dealService = dealService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.deal = deal;
                this.$route = $route;
                console.log(deal);
            }
            DeleteDealModal.prototype.deleteDeal = function () {
                var _this = this;
                console.log(this.deal.id);
                this.dealService.deleteDeal(this.deal.id).then(function () {
                    _this.closeModal();
                    _this.$location.path('/deals');
                    _this.$route.reload();
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            DeleteDealModal.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return DeleteDealModal;
        })();
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
