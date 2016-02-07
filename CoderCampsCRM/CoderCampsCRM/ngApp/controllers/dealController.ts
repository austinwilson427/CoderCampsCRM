namespace MyApp.Controllers {

    export class DealsController {

        public allDeals;
        public allCompanyDeals;
        public sortName;
        public reverse;
        public menuDirectionName; public menuDirectionStage; public menuDirectionDate; public menuDirectionAmount;
        public menuDirectionOwner; public menuDirectionCompany;
        public dateFilter;
        public searchPhrase;

        constructor(private dealService: MyApp.Services.DealService, private $uibModal: ng.ui.bootstrap.IModalService) {
            this.reverse = false;
            this.sortName = 'dealName';

            this.getAllItems();

        }

        public getAllItems() {

            this.dealService.listAllDeals().$promise.then((result) => {
                this.allDeals = [];
                for (var i = 0; i < result.length; i++) {
                    this.allDeals.push(result[i]);
                }
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

        public deleteDealModal(dealToDelete) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/delete-deal.html',
                controller: DeleteDealModal,
                controllerAs: 'vm',
                resolve: {
                    deal: () => dealToDelete
                },
                size: "deal"
            });
        }

        public filterByDate() {
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
                        if (inner_set < week_from_today && inner_full_num >= today_num) {
                            filteredDates.push(result[i]);
                        }
                    } else if (this.dateFilter == "month") {
                        if (inner_set < month_from_today && inner_full_num >= today_num) {
                            filteredDates.push(result[i]);
                        }
                    } else {
                        filteredDates.push(result[i]);
                    }

                }
                this.allDeals = filteredDates;
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

        constructor(private dealService: MyApp.Services.DealService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, public deal, private $route: ng.route.IRouteService) {
            console.log(deal);
        }

        public deleteDeal() {
            console.log(this.deal.id);
            this.dealService.deleteDeal(this.deal.id).then(() => {
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


}