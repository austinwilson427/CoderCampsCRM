namespace MyApp.Controllers {

    export class DealsController {

        public allDeals;
        public allCompanyDeals;
        public sortName;
        public reverse;
        public menuDirectionName; public menuDirectionStage; public menuDirectionDate; public menuDirectionAmount;
        public menuDirectionOwner; public menuDirectionCompany;

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
                size: "sm"
            });
        }




    }

    class AddDealModal {

        constructor() {

        }
    }


}