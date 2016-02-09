namespace MyApp.Controllers {

    export class DealInfoController {

        public routeId;
        public dealInfo;
        public company;

        constructor(private dealService: MyApp.Services.DealService, private $routeParams: ng.route.IRouteParamsService, private companiesService: MyApp.Services.CompaniesService) {
            this.routeId = $routeParams["id"];
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

}