namespace MyApp.Controllers {

    export class DealsController {

        public allDeals;
        public allCompanyDeals;

        constructor(private dealService: MyApp.Services.DealService) {

            this.allDeals = dealService.listAllDeals();


        }










    }
}