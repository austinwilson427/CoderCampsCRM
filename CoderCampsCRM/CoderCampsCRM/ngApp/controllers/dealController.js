var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DealsController = (function () {
            function DealsController(dealService, $uibModal, $location, $route) {
                this.dealService = dealService;
                this.$uibModal = $uibModal;
                this.$location = $location;
                this.$route = $route;
                this.stageFilter = 0;
                this.dealsSelected = [];
                this.showArchived = false;
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
            DealsController.prototype.storeDeal = function (value) {
                if (value.key == true) {
                    this.dealsSelected.push(value);
                }
                else if (value.key == false) {
                    var dealsSelectedReset = [];
                    for (var i in this.dealsSelected) {
                        if (this.dealsSelected[i] != value) {
                            dealsSelectedReset.push(this.dealsSelected[i]);
                        }
                    }
                    this.dealsSelected = dealsSelectedReset;
                }
                if (this.dealsSelected.length > 0) {
                    this.showTrash = true;
                }
                else {
                    this.showTrash = false;
                }
            };
            DealsController.prototype.archiveDeal = function (dealToArchive) {
                var _this = this;
                this.dealService.saveDeal(dealToArchive).then(function () {
                    _this.$location.path('/deals');
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
                });
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
            DealsController.prototype.deleteDealModal = function () {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/delete-deal.html',
                    controller: DeleteDealModal,
                    controllerAs: 'vm',
                    resolve: {
                        dealsToDelete: function () { return _this.dealsSelected; }
                    },
                    size: "deal"
                });
            };
            DealsController.prototype.archiveDealModal = function () {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/archive-deal.html',
                    controller: ArchiveDealModal,
                    controllerAs: 'vm',
                    resolve: {
                        dealsToArchive: function () { return _this.dealsSelected; }
                    },
                    size: "deal"
                });
            };
            DealsController.prototype.filterBySelection = function () {
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
                    for (var i_1 = 0; i_1 < result.length; i_1++) {
                        var inner_full = new Date(result[i_1].closeDate);
                        var inner_full_num = inner_full.setDate(inner_full.getDate());
                        var inner_set = inner_full.setDate(inner_full.getDate());
                        var inner_month = new Date(result[i_1].closeDate).getMonth();
                        var inner_date = new Date(result[i_1].closeDate).getDate();
                        var inner_year = new Date(result[i_1].closeDate).getFullYear();
                        if (_this.dateFilter == "today") {
                            if (today_month == inner_month && today_date == inner_date && today_year == inner_year) {
                                filteredDates.push(result[i_1]);
                            }
                        }
                        else if (_this.dateFilter == "week") {
                            console.log(result[i_1].closeDate + " " + inner_full_num);
                            console.log(today + " " + today_num);
                            if (inner_set < week_from_today && inner_full_num >= today_num) {
                                filteredDates.push(result[i_1]);
                            }
                            else if (today_month == inner_month && today_date == inner_date && today_year == inner_year) {
                                filteredDates.push(result[i_1]);
                            }
                        }
                        else if (_this.dateFilter == "month") {
                            if (inner_set < month_from_today && inner_full_num >= today_num) {
                                filteredDates.push(result[i_1]);
                            }
                            else if (today_month == inner_month && today_date == inner_date && today_year == inner_year) {
                                filteredDates.push(result[i_1]);
                            }
                        }
                        else {
                            filteredDates.push(result[i_1]);
                        }
                    }
                    _this.allDeals = filteredDates;
                    var filteredAmounts = [];
                    for (var i in _this.allDeals) {
                        var minimumAmount = _this.minAmount;
                        var maximumAmount = _this.maxAmount;
                        if (minimumAmount == undefined) {
                            minimumAmount = 0;
                        }
                        if (maximumAmount == undefined || maximumAmount == 0) {
                            maximumAmount = 100000000000;
                        }
                        if (_this.allDeals[i].amount > minimumAmount && _this.allDeals[i].amount < maximumAmount) {
                            filteredAmounts.push(_this.allDeals[i]);
                        }
                    }
                    _this.allDeals = filteredAmounts;
                    var filteredStages = [];
                    for (var i in _this.allDeals) {
                        if (_this.stageFilter == 1 && _this.allDeals[i].stage == "Appointment Scheduled") {
                            filteredStages.push(_this.allDeals[i]);
                        }
                        else if (_this.stageFilter == 2 && _this.allDeals[i].stage == "Qualified To Buy") {
                            filteredStages.push(_this.allDeals[i]);
                        }
                        else if (_this.stageFilter == 3 && _this.allDeals[i].stage == "Presentation Scheduled") {
                            filteredStages.push(_this.allDeals[i]);
                        }
                        else if (_this.stageFilter == 4 && _this.allDeals[i].stage == "Decision Maker Bought In") {
                            filteredStages.push(_this.allDeals[i]);
                        }
                        else if (_this.stageFilter == 5 && _this.allDeals[i].stage == "Contract Sent") {
                            filteredStages.push(_this.allDeals[i]);
                        }
                        else if (_this.stageFilter == 6 && _this.allDeals[i].stage == "Closed Won") {
                            filteredStages.push(_this.allDeals[i]);
                        }
                        else if (_this.stageFilter == 7 && _this.allDeals[i].stage == "Closed Lost") {
                            filteredStages.push(_this.allDeals[i]);
                        }
                        else if (_this.stageFilter == 0) {
                            filteredStages.push(_this.allDeals[i]);
                        }
                    }
                    _this.allDeals = filteredStages;
                });
            };
            DealsController.prototype.unarchiveItem = function (dealToUnarchive) {
                var _this = this;
                dealToUnarchive.isArchived = false;
                this.dealService.saveDeal(dealToUnarchive).then(function () {
                    _this.$location.path('/deals');
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
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
            function DeleteDealModal(dealService, $location, $uibModalInstance, dealsToDelete, $route) {
                this.dealService = dealService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.dealsToDelete = dealsToDelete;
                this.$route = $route;
                this.dealsToDeleteLength = dealsToDelete.length;
                console.log(this.dealsToDelete);
            }
            DeleteDealModal.prototype.deleteDeal = function () {
                var _this = this;
                var finalDeal;
                for (var i = 0; i < this.dealsToDelete.length; i++) {
                    if (i == this.dealsToDelete.length - 1) {
                        finalDeal = this.dealsToDelete[i];
                        break;
                    }
                    this.dealService.deleteDeal(this.dealsToDelete[i].id);
                }
                this.dealService.deleteDeal(finalDeal.id).then(function () {
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
        var ArchiveDealModal = (function () {
            function ArchiveDealModal(dealService, $location, $uibModalInstance, dealsToArchive, $route) {
                this.dealService = dealService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.dealsToArchive = dealsToArchive;
                this.$route = $route;
                this.dealsToArchiveLength = dealsToArchive.length;
                console.log(this.dealsToArchive);
            }
            ArchiveDealModal.prototype.archiveDeal = function () {
                var _this = this;
                var finalDeal;
                for (var i = 0; i < this.dealsToArchive.length; i++) {
                    if (i == this.dealsToArchive.length - 1) {
                        finalDeal = this.dealsToArchive[i];
                        finalDeal.isArchived = true;
                        break;
                    }
                    this.dealsToArchive[i].isArchived = true;
                    this.dealService.saveDeal(this.dealsToArchive[i]);
                }
                this.dealService.saveDeal(finalDeal).then(function () {
                    _this.closeModal();
                    _this.$location.path('/deals');
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            ArchiveDealModal.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return ArchiveDealModal;
        })();
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=dealController.js.map