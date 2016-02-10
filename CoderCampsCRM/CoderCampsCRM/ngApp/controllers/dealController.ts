namespace MyApp.Controllers {

    export class DealsController {

        public allDeals;
        public allCompanyDeals;
        public sortName;
        public reverse;
        public menuDirectionName; public menuDirectionStage; public menuDirectionDate; public menuDirectionAmount;
        public menuDirectionOwner; public menuDirectionCompany;
        public dateFilter;
        public stageFilter;
        public searchPhrase;
        public minAmount; public maxAmount;
        public validationErrors;
        public showArchived;
        public editDeal;
        public dealsSelected;
        public isSelected;
        public showTrash;

        constructor(private dealService: MyApp.Services.DealService, private $uibModal: ng.ui.bootstrap.IModalService, private $location: ng.ILocationService, private $route: ng.route.IRouteService, private companiesService: MyApp.Services.CompaniesService) {
            this.stageFilter = 0;
            this.dealsSelected = [];
            this.showArchived = false;
            this.reverse = false;
            this.sortName = 'dealName';

            this.getAllItems();
            
        }

        public getAllItems() {

            this.dealService.listAllDeals().$promise.then((result) => {
                this.allDeals = [];
                let company;
                for (var i = 0; i < result.length; i++) {
                    //company = this.companiesService.getCompany(result[i].companyId);
                    //result[i].company = company;
                    this.allDeals.push(result[i]);
                }
                console.log(this.allDeals);
            });
        }

        public sortBy(field) {
            this.sortName = field;
            this.menuDirectionName = this.toggleMenu(this.menuDirectionName, field, "dealName");
            this.menuDirectionStage = this.toggleMenu(this.menuDirectionStage, field, "stage");
            this.menuDirectionDate = this.toggleMenu(this.menuDirectionDate, field, "closeDate");
            this.menuDirectionAmount = this.toggleMenu(this.menuDirectionAmount, field, "amount");
            this.menuDirectionOwner = this.toggleMenu(this.menuDirectionOwner, field, "dealOwnerId");
            this.menuDirectionCompany = this.toggleMenu(this.menuDirectionCompany, field, "companyId");
        }

        private toggleMenu(menuDirection, field, wantedField) {
            let returnDirection;

            if (menuDirection == "glyphicon glyphicon-menu-up" && field == wantedField) {
                returnDirection = "glyphicon glyphicon-menu-down";
                this.reverse = !this.reverse;
            } else if (menuDirection == "glyphicon glyphicon-menu-down" && field == wantedField) {
                returnDirection = "glyphicon glyphicon-menu-up";
                this.reverse = !this.reverse;
            } else if (menuDirection != "glyphicon glyphicon-menu-up" && menuDirection != "glyphicon glyphicon-menu-down" && field == wantedField) {
                returnDirection = "glyphicon glyphicon-menu-down";
                this.reverse = false
            } else {
                returnDirection = "default_span";
            }
            return returnDirection;
        }

        public storeDeal(value) {
            if (value.key == true) {
                this.dealsSelected.push(value);
            } else if (value.key == false) {
                let dealsSelectedReset = [];
                for (let i in this.dealsSelected) {
                    if (this.dealsSelected[i] != value) {
                        dealsSelectedReset.push(this.dealsSelected[i]);
                    }
                }
                this.dealsSelected = dealsSelectedReset;
            }

            if (this.dealsSelected.length > 0) {
                this.showTrash = true;
            } else {
                this.showTrash = false;
            }
        }

        public archiveDeal(dealToArchive) {

            this.dealService.saveDeal(dealToArchive).then(() => {
                this.$location.path('/deals');
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });

        }

        public addDealModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/add-deal.html',
                controller: AddDealModal,
                controllerAs: 'vm',
                size: "deal"
            });
        }

        public editDealModal(dealToAdd) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/edit-deal.html',
                controller: EditDealModal,
                controllerAs: 'vm',
                resolve: {
                    dealDetails: () => dealToAdd
                },
                size: "deal"
            });
        }

        public deleteDealModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/delete-deal.html',
                controller: DeleteDealModal,
                controllerAs: 'vm',
                resolve: {
                    dealsToDelete: () => this.dealsSelected
                },
                size: "deal"
            });
        }

        public archiveDealModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/archive-deal.html',
                controller: ArchiveDealModal,
                controllerAs: 'vm',
                resolve: {
                    dealsToArchive: () => this.dealsSelected
                },
                size: "deal"
            });
        }

        public filterBySelection() {
            this.dealService.listAllDeals().$promise.then((result) => {
                this.allDeals = [];
                let today = new Date();
                let today_num = today.setDate(today.getDate());
                let today_month = new Date().getMonth();
                let today_date = new Date().getDate();
                let today_year = new Date().getFullYear();
                let week_from_today = today.setDate(today.getDate() + 7);
                let month_from_today = today.setDate(today.getDate() + 24); //Adding 24 + 7 for 31 days
                let filteredDates = [];
                for (let i = 0; i < result.length; i++) {
                    let inner_full = new Date(result[i].closeDate);
                    let inner_full_num = inner_full.setDate(inner_full.getDate());
                    let inner_set = inner_full.setDate(inner_full.getDate());
                    let inner_month = new Date(result[i].closeDate).getMonth();
                    let inner_date = new Date(result[i].closeDate).getDate();
                    let inner_year = new Date(result[i].closeDate).getFullYear();

                    if (this.dateFilter == "today") {
                        if (today_month == inner_month && today_date == inner_date && today_year == inner_year) {
                            filteredDates.push(result[i]);
                        }
                    } else if (this.dateFilter == "week") {
                        console.log(result[i].closeDate + " " + inner_full_num);
                        console.log(today + " " + today_num);
                        if (inner_set < week_from_today && inner_full_num >= today_num) {
                            filteredDates.push(result[i]);
                        } else if (today_month == inner_month && today_date == inner_date && today_year == inner_year) {
                            filteredDates.push(result[i]);
                        }
                    } else if (this.dateFilter == "month") {
                        if (inner_set < month_from_today && inner_full_num >= today_num) {
                            filteredDates.push(result[i]);
                        } else if (today_month == inner_month && today_date == inner_date && today_year == inner_year) {
                            filteredDates.push(result[i]);
                        }
                    } else {
                        filteredDates.push(result[i]);
                    }

                }
                this.allDeals = filteredDates;

                let filteredAmounts = [];
                for (var i in this.allDeals) {

                    let minimumAmount = this.minAmount;
                    let maximumAmount = this.maxAmount;

                    if (minimumAmount == undefined) {
                        minimumAmount = 0;
                    }
                    if (maximumAmount == undefined || maximumAmount == 0) {
                        maximumAmount = 100000000000;
                    }

                    if (this.allDeals[i].amount > minimumAmount && this.allDeals[i].amount < maximumAmount) {
                        filteredAmounts.push(this.allDeals[i]);
                    }
                }

                this.allDeals = filteredAmounts;

                let filteredStages = [];
                for (var i in this.allDeals) {
                    if (this.stageFilter == 1 && this.allDeals[i].stage == "Appointment Scheduled") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 2 && this.allDeals[i].stage == "Qualified To Buy") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 3 && this.allDeals[i].stage == "Presentation Scheduled") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 4 && this.allDeals[i].stage == "Decision Maker Bought In") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 5 && this.allDeals[i].stage == "Contract Sent") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 6 && this.allDeals[i].stage == "Closed Won") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 7 && this.allDeals[i].stage == "Closed Lost") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 0) {
                        filteredStages.push(this.allDeals[i]);
                    }
                }
                this.allDeals = filteredStages;
            });

        }

        public unarchiveItem(dealToUnarchive) {
            dealToUnarchive.isArchived = false;
            this.dealService.saveDeal(dealToUnarchive).then(() => {
                this.$location.path('/deals');
            }).catch((error) => {
                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }
    }

    class AddDealModal {

        public validationErrors;

        constructor(private dealService: MyApp.Services.DealService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private $route: ng.route.IRouteService) { }

        public addDeal(dealToAdd) {
            console.log(dealToAdd);
            this.dealService.saveDeal(dealToAdd).then(() => {
                this.closeModal();
                this.$location.path('/deals');
                this.$route.reload();
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }

    class EditDealModal {

        public validationErrors;

        constructor(private dealService: MyApp.Services.DealService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, public dealDetails, private $route: ng.route.IRouteService) {
            this.dealDetails.closeDate = new Date(this.dealDetails.closeDate);
        }

        public editDeal() {
            console.log(this.dealDetails);
            this.dealService.saveDeal(this.dealDetails).then(() => {
                this.closeModal();
                this.$location.path('/deals');
                this.$route.reload();
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }

    class DeleteDealModal {
        public validationErrors;
        public dealsToDeleteLength;

        constructor(private dealService: MyApp.Services.DealService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, public dealsToDelete, private $route: ng.route.IRouteService) {
            this.dealsToDeleteLength = dealsToDelete.length;
            console.log(this.dealsToDelete);

        }

        public deleteDeal() {
            let finalDeal;
            for (let i = 0; i < this.dealsToDelete.length; i++) {
                if (i == this.dealsToDelete.length - 1) {
                    finalDeal = this.dealsToDelete[i];
                    break;
                }
                this.dealService.deleteDeal(this.dealsToDelete[i].id);
            }

            this.dealService.deleteDeal(finalDeal.id).then(() => {
                this.closeModal();
                this.$location.path('/deals');
                this.$route.reload();
            }).catch((error) => {
                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }

    class ArchiveDealModal {
        public validationErrors;
        public dealsToArchiveLength;

        constructor(private dealService: MyApp.Services.DealService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, public dealsToArchive, private $route: ng.route.IRouteService) {
            this.dealsToArchiveLength = dealsToArchive.length;
            console.log(this.dealsToArchive);

        }

        public archiveDeal() {
            let finalDeal;
            for (let i = 0; i < this.dealsToArchive.length; i++) {
                if (i == this.dealsToArchive.length - 1) {
                    finalDeal = this.dealsToArchive[i];
                    finalDeal.isArchived = true;
                    break;
                }
                this.dealsToArchive[i].isArchived = true;
                this.dealService.saveDeal(this.dealsToArchive[i]);
            }

            this.dealService.saveDeal(finalDeal).then(() => {
                this.closeModal();
                this.$location.path('/deals');
            }).catch((error) => {
                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }


}