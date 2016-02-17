var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DealsController = (function () {
            function DealsController(dealService, $uibModal, $location, $route, companiesService) {
                this.dealService = dealService;
                this.$uibModal = $uibModal;
                this.$location = $location;
                this.$route = $route;
                this.companiesService = companiesService;
                this.searchPhrase = "";
                this.currentOrder = "name";
                this.currentPage = 1;
                this.itemsPerPage = 5;
                this.sortOrder = "ascending";
                this.stageFilter = 0;
                this.dealsSelected = [];
                this.showArchived = false;
                this.reverse = false;
                this.sortName = 'dealName';
                this.filterBySelection();
            }
            DealsController.prototype.filterBySelection = function () {
                var _this = this;
                var result = this.allDeals;
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
                    var itemsFiltered = _this.allDeals;
                    itemsFiltered.sort(function (a, b) {
                        if (_this.sortName == "amount" || _this.sortName == "-amount") {
                            if (a.amount == b.amount) {
                                return 0;
                            }
                            else {
                                if (a.amount > b.amount) {
                                    if (_this.sortName == "amount") {
                                        return 1;
                                    }
                                    else {
                                        return -1;
                                    }
                                }
                                else if (a.amount < b.amount) {
                                    if (_this.sortName == "amount") {
                                        return -1;
                                    }
                                    else {
                                        return 1;
                                    }
                                }
                            }
                        }
                        else if (_this.sortName == "dealName" || _this.sortName == "-dealName") {
                            if (a.dealName == b.dealName) {
                                return 0;
                            }
                            else {
                                if (a.dealName > b.dealName) {
                                    if (_this.sortName == "dealName") {
                                        return 1;
                                    }
                                    else {
                                        return -1;
                                    }
                                }
                                else if (a.dealName < b.dealName) {
                                    if (_this.sortName == "dealName") {
                                        return -1;
                                    }
                                    else {
                                        return 1;
                                    }
                                }
                            }
                        }
                        else if (_this.sortName == "stage" || _this.sortName == "-stage") {
                            if (a.stage == b.stage) {
                                return 0;
                            }
                            else {
                                if (a.stage > b.stage) {
                                    if (_this.sortName == "stage") {
                                        return 1;
                                    }
                                    else {
                                        return -1;
                                    }
                                }
                                else if (a.stage < b.stage) {
                                    if (_this.sortName == "stage") {
                                        return -1;
                                    }
                                    else {
                                        return 1;
                                    }
                                }
                            }
                        }
                        else if (_this.sortName == "closeDate" || _this.sortName == "-closeDate") {
                            if (a.closeDate == b.closeDate) {
                                return 0;
                            }
                            else {
                                if (a.closeDate > b.closeDate) {
                                    if (_this.sortName == "closeDate") {
                                        return 1;
                                    }
                                    else {
                                        return -1;
                                    }
                                }
                                else if (a.closeDate < b.closeDate) {
                                    if (_this.sortName == "closeDate") {
                                        return -1;
                                    }
                                    else {
                                        return 1;
                                    }
                                }
                            }
                        }
                        else if (_this.sortName == "dealOwner" || _this.sortName == "-dealOwner") {
                            if (a.contact.name == b.contact.name) {
                                return 0;
                            }
                            else {
                                if (a.contact.name > b.contact.name) {
                                    if (_this.sortName == "dealOwner") {
                                        return 1;
                                    }
                                    else {
                                        return -1;
                                    }
                                }
                                else if (a.contact.name < b.contact.name) {
                                    if (_this.sortName == "dealOwner") {
                                        return -1;
                                    }
                                    else {
                                        return 1;
                                    }
                                }
                            }
                        }
                        else if (_this.sortName == "company" || _this.sortName == "-company") {
                            if (a.company.companyName == b.company.companyName) {
                                return 0;
                            }
                            else {
                                if (a.company.companyName > b.company.companyName) {
                                    if (_this.sortName == "dealOwner") {
                                        return 1;
                                    }
                                    else {
                                        return -1;
                                    }
                                }
                                else if (a.company.companyName < b.company.companyName) {
                                    if (_this.sortName == "dealOwner") {
                                        return -1;
                                    }
                                    else {
                                        return 1;
                                    }
                                }
                            }
                        }
                    });
                    _this.totalPages = Math.ceil(itemsFiltered.length / _this.itemsPerPage);
                    _this.pagesArray = [];
                    for (var j = 1; j <= _this.totalPages; j++) {
                        _this.pagesArray.push(j);
                    }
                    var itemPagFilter = [];
                    var start = (_this.currentPage - 1) * _this.itemsPerPage;
                    var end = start + _this.itemsPerPage;
                    console.log(start);
                    console.log(end);
                    for (var k = start; k < end; k++) {
                        if (!itemsFiltered[k]) {
                            break;
                        }
                        itemPagFilter[k] = itemsFiltered[k];
                    }
                    _this.allDeals = itemPagFilter;
                });
            };
            DealsController.prototype.paginate = function (page) {
                this.currentPage = page;
                this.filterBySelection();
            };
            DealsController.prototype.assignClass = function (page) {
                if (page == this.currentPage) {
                    return "active";
                }
                if (page == this.itemsPerPage) {
                    return "active";
                }
            };
            DealsController.prototype.selectItems = function (items) {
                this.currentPage = 1;
                if (items != 'all') {
                    this.itemsPerPage = items;
                }
                else {
                    this.itemsPerPage = 1000000;
                }
                this.filterBySelection();
            };
            DealsController.prototype.assignDisabledPrev = function () {
                if (this.currentPage == 1) {
                    return "disabled";
                }
            };
            DealsController.prototype.assignDisabledNext = function () {
                if (this.currentPage == this.totalPages) {
                    return "disabled";
                }
            };
            DealsController.prototype.prevPage = function () {
                if (this.currentPage == 1) {
                    return false;
                }
                this.currentPage--;
                this.filterBySelection();
            };
            DealsController.prototype.nextPage = function () {
                if (this.currentPage == this.totalPages) {
                    return false;
                }
                this.currentPage++;
                this.filterBySelection();
            };
            DealsController.prototype.getAllItems = function () {
                var _this = this;
                this.dealService.listAllDeals().$promise.then(function (result) {
                    _this.allDeals = [];
                    var company;
                    for (var i = 0; i < result.length; i++) {
                        //company = this.companiesService.getCompany(result[i].companyId);
                        //result[i].company = company;
                        _this.allDeals.push(result[i]);
                    }
                });
            };
            DealsController.prototype.sortBy = function (field) {
                this.currentPage = 1;
                this.sortName = field;
                this.menuDirectionName = this.toggleMenu(this.menuDirectionName, field, "dealName");
                this.menuDirectionStage = this.toggleMenu(this.menuDirectionStage, field, "stage");
                this.menuDirectionDate = this.toggleMenu(this.menuDirectionDate, field, "closeDate");
                this.menuDirectionAmount = this.toggleMenu(this.menuDirectionAmount, field, "amount");
                this.menuDirectionOwner = this.toggleMenu(this.menuDirectionOwner, field, "dealOwner");
                this.menuDirectionCompany = this.toggleMenu(this.menuDirectionCompany, field, "company");
                this.filterBySelection();
            };
            DealsController.prototype.toggleMenu = function (menuDirection, field, wantedField) {
                var returnDirection;
                if (menuDirection == "glyphicon glyphicon-menu-down" && field == wantedField) {
                    returnDirection = "glyphicon glyphicon-menu-up";
                    this.sortName = "-" + this.sortName;
                }
                else if (menuDirection == "glyphicon glyphicon-menu-up" && field == wantedField) {
                    returnDirection = "glyphicon glyphicon-menu-down";
                }
                else if (menuDirection != "glyphicon glyphicon-menu-up" && menuDirection != "glyphicon glyphicon-menu-down" && field == wantedField) {
                    returnDirection = "glyphicon glyphicon-menu-down";
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
            DealsController.prototype.unarchiveItem = function (dealToUnarchive) {
                var _this = this;
                dealToUnarchive.isArchived = false;
                this.dealService.saveDeal(dealToUnarchive).then(function () {
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
            return DealsController;
        })();
        Controllers.DealsController = DealsController;
        var AddDealModal = (function () {
            function AddDealModal(dealService, $location, $uibModalInstance, $route, contactService, companiesService) {
                this.dealService = dealService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.$route = $route;
                this.contactService = contactService;
                this.companiesService = companiesService;
                this.getMyContacts();
                this.getMyCompanies();
            }
            AddDealModal.prototype.getMyContacts = function () {
                var _this = this;
                this.contactService.getAllContacts().$promise.then(function (result) {
                    _this.myContacts = result;
                });
            };
            AddDealModal.prototype.getMyCompanies = function () {
                var _this = this;
                this.companiesService.getCompanies().$promise.then(function (result) {
                    _this.myCompanies = result;
                });
            };
            AddDealModal.prototype.addDeal = function (dealToAdd) {
                var _this = this;
                console.log(dealToAdd);
                this.dealService.saveDeal(dealToAdd).then(function () {
                    _this.closeModal();
                    location.reload(false);
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
            function EditDealModal(dealService, $location, $uibModalInstance, dealDetails, $route, companiesService) {
                this.dealService = dealService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.dealDetails = dealDetails;
                this.$route = $route;
                this.companiesService = companiesService;
                this.getMyCompanies();
                this.dealDetails.closeDate = new Date(this.dealDetails.closeDate);
            }
            EditDealModal.prototype.getMyCompanies = function () {
                var _this = this;
                this.companiesService.getCompanies().$promise.then(function (result) {
                    _this.myCompanies = result;
                });
            };
            EditDealModal.prototype.editDeal = function () {
                var _this = this;
                console.log(this.dealDetails);
                this.dealService.saveDeal(this.dealDetails).then(function () {
                    _this.closeModal();
                    location.reload();
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
            ArchiveDealModal.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return ArchiveDealModal;
        })();
        var DealTableViewController = (function () {
            function DealTableViewController(dealService, $stateParams, $location) {
                this.dealService = dealService;
                this.$stateParams = $stateParams;
                this.$location = $location;
                this.stages = ["Appointment Scheduled", "Qualified to Buy", "Presentation Scheduled", "Decision Maker Bought In", "Contract Sent"];
                this.getAllItems();
            }
            DealTableViewController.prototype.getAllItems = function () {
                var _this = this;
                this.dealService.listAllDeals().$promise.then(function (result) {
                    _this.allDeals = [];
                    var company;
                    for (var i = 0; i < result.length; i++) {
                        _this.allDeals.push(result[i]);
                    }
                    _this.draggableObjects = _this.allDeals;
                    _this.droppedObjects1 = _this.draggableObjects;
                    _this.droppedObjects2 = _this.draggableObjects;
                    _this.droppedObjects3 = _this.draggableObjects;
                    _this.droppedObjects4 = _this.draggableObjects;
                    _this.droppedObjects5 = _this.draggableObjects;
                });
            };
            DealTableViewController.prototype.editDeal = function (dealToAdd) {
                var _this = this;
                console.log(dealToAdd);
                this.dealService.saveDeal(dealToAdd).then(function () {
                    //location.reload(false);
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            DealTableViewController.prototype.onDropComplete1 = function (data, evt) {
                console.log(data);
                var index = this.droppedObjects1.indexOf(data);
                data.stage = "Appointment Scheduled";
                if (index == -1) {
                    this.droppedObjects1.push(data);
                    this.editDeal(data);
                }
            };
            DealTableViewController.prototype.onDragSuccess1 = function (data, evt) {
                var index = this.droppedObjects1.indexOf(data);
                if (index != -1) {
                    this.droppedObjects1.splice(index, 1);
                }
            };
            DealTableViewController.prototype.onDropComplete2 = function (data, evt) {
                console.log(data);
                var index = this.droppedObjects2.indexOf(data);
                data.stage = "Qualified to Buy";
                if (index == -1) {
                    this.droppedObjects2.push(data);
                    this.editDeal(data);
                }
            };
            DealTableViewController.prototype.onDragSuccess2 = function (data, evt) {
                var index = this.droppedObjects2.indexOf(data);
                if (index != -1) {
                    this.droppedObjects2.splice(index, 1);
                }
            };
            DealTableViewController.prototype.onDropComplete3 = function (data, evt) {
                console.log(data);
                var index = this.droppedObjects3.indexOf(data);
                data.stage = "Presentation Scheduled";
                if (index == -1) {
                    this.droppedObjects3.push(data);
                    this.editDeal(data);
                }
            };
            DealTableViewController.prototype.onDragSuccess3 = function (data, evt) {
                var index = this.droppedObjects3.indexOf(data);
                if (index != -1) {
                    this.droppedObjects3.splice(index, 1);
                }
            };
            DealTableViewController.prototype.onDropComplete4 = function (data, evt) {
                console.log(data);
                var index = this.droppedObjects4.indexOf(data);
                data.stage = "Decision Maker Bought In";
                if (index == -1) {
                    this.droppedObjects4.push(data);
                    this.editDeal(data);
                }
            };
            DealTableViewController.prototype.onDragSuccess4 = function (data, evt) {
                var index = this.droppedObjects4.indexOf(data);
                if (index != -1) {
                    this.droppedObjects4.splice(index, 1);
                }
            };
            DealTableViewController.prototype.onDropComplete5 = function (data, evt) {
                console.log(data);
                var index = this.droppedObjects5.indexOf(data);
                data.stage = "Contract Sent";
                if (index == -1) {
                    this.droppedObjects5.push(data);
                    this.editDeal(data);
                }
            };
            DealTableViewController.prototype.onDragSuccess5 = function (data, evt) {
                var index = this.droppedObjects5.indexOf(data);
                if (index != -1) {
                    this.droppedObjects5.splice(index, 1);
                }
            };
            DealTableViewController.prototype.getData = function (data, element) {
                var showOverlay = angular.element(document.querySelector('.overlay'));
                showOverlay.addClass('show');
            };
            DealTableViewController.prototype.hideOverlay = function (element) {
                var hideOverlay = angular.element(document.querySelector('.overlay'));
                hideOverlay.removeClass('show');
            };
            return DealTableViewController;
        })();
        Controllers.DealTableViewController = DealTableViewController;
        var DealChartsController = (function () {
            function DealChartsController(dealService) {
                var _this = this;
                this.dealService = dealService;
                this.dealService.listAllDeals().$promise.then(function (result) {
                    console.log(result);
                    var qualifiedToBuy = [];
                    var appointmentScheduled = [];
                    var presentationScheduled = [];
                    var decisionMakerBoughtIn = [];
                    var contractSent = [];
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].stage == "Qualified to Buy") {
                            qualifiedToBuy.push(result[i]);
                        }
                        else if (result[i].stage == "Appointment Scheduled") {
                            appointmentScheduled.push(result[i]);
                        }
                        else if (result[i].stage == "Presentation Scheduled") {
                            presentationScheduled.push(result[i]);
                        }
                        else if (result[i].stage == "Decision Maker Bought In") {
                            decisionMakerBoughtIn.push(result[i]);
                        }
                        else if (result[i].stage == "Contract Sent") {
                            contractSent.push(result[i]);
                        }
                    }
                    _this.qtbCount = qualifiedToBuy.length;
                    _this.asCount = appointmentScheduled.length;
                    _this.psCount = presentationScheduled.length;
                    _this.dmbiCount = decisionMakerBoughtIn.length;
                    _this.csCount = contractSent.length;
                    _this.myJson = {
                        globals: {
                            shadow: false,
                            fontFamily: "Verdana",
                            fontWeight: "100"
                        },
                        type: "pie",
                        backgroundColor: "#fff",
                        //legend: {
                        //    "item": {
                        //        "font-size": "16px"
                        //    },
                        //    "background-color": "#0A64A4"
                        //},
                        tooltip: {
                            text: "%v requests"
                        },
                        plot: {
                            refAngle: "-90",
                            borderWidth: "2px",
                            valueBox: {
                                placement: "in",
                                text: "%npv %",
                                fontSize: "15px",
                                textAlpha: 1,
                            }
                        },
                        series: [
                            {
                                text: "Qualified to Buy",
                                values: [_this.qtbCount],
                                backgroundColor: "red",
                            },
                            {
                                text: "Appointment Scheduled",
                                values: [_this.asCount],
                                backgroundColor: "blue"
                            }, {
                                text: "Presentation Scheduled",
                                values: [_this.psCount],
                                backgroundColor: "green"
                            }, {
                                text: "Decision Maker Bought In",
                                values: [_this.dmbiCount],
                                backgroundColor: "#28C2D1"
                            }, {
                                text: "Contract Sent",
                                values: [_this.csCount],
                                backgroundColor: "#D2D6DE",
                            }]
                    };
                });
            }
            return DealChartsController;
        })();
        Controllers.DealChartsController = DealChartsController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
