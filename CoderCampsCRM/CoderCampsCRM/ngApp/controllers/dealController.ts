namespace MyApp.Controllers {

    export class DealsController {

        public allDeals;
        public allCompanyDeals;
        public sortName;
        public reverse;
        public menuDirectionName; public menuDirectionStage; public menuDirectionDate; public menuDirectionAmount;
        public menuDirectionOwner; public menuDirectionCompany;
        public dateFilter;

        constructor(private dealService: MyApp.Services.DealService, private $uibModal: ng.ui.bootstrap.IModalService) {
            this.reverse = false;
            this.sortName = 'dealName';
            this.allDeals = dealService.listAllDeals();
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
            let today_date = new Date().getDate;
            let today_month = new Date().getMonth;
            let today_year = new Date().getFullYear;

            for (let i = 0; i < this.allDeals.length; i++) {
                let innerDate = new Date(this.allDeals[i].closeDate);
                let innerDate 
                if (innerDate == today) {
                    console.log("Happened");
                }
            }
        }

    }

    class AddDealModal {

        public validationErrors;

        constructor(private dealService: MyApp.Services.DealService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private $route: ng.route.IRouteService ) { }

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