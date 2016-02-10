namespace MyApp.Controllers {

    export class DealInfoController {

        public routeId;
        public dealInfo;
        public company;

        constructor(private dealService: MyApp.Services.DealService, private companiesService: MyApp.Services.CompaniesService, private $stateParams: ng.ui.IStateParamsService) {

            this.routeId = $stateParams["id"];
            console.log(this.routeId);
            this.getDeal();
            
        }

        public getDeal() {
            this.dealService.getDealByDealId(this.routeId).$promise.then((result) => {
                this.dealInfo = result;
                this.companiesService.getCompany(result.companyId).$promise.then((companyResult) => {
                    console.log(companyResult);
                    this.company = companyResult;
                });
            });
        }

    }

    export class DealInfoNoteController {

    }

    export class DealInfoActivityController {

    }

    export class DealInfoTaskController {

    }

    export class DealInfoEventController {

    }
}