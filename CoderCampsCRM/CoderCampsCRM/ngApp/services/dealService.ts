namespace MyApp.Services {

    export class DealService {

        private dealResource;
        private dealResourceFromCompany;
        private dealResourceFromDealOwner;

        constructor(private $resource: ng.resource.IResourceService) {
            this.dealResource = $resource("api/deals/:id");
            this.dealResourceFromCompany = $resource("api/deals/company/:id");
            this.dealResourceFromDealOwner = $resource("api/deals/deal-owner/:id");
        }

        public listAllDeals() {
            return this.dealResource.query();
        }

        public getDealByDealId(id) {
            return this.dealResource.get({ id: id });
        }

        public listAllDealsByCompanyId(id) {
            return this.dealResourceFromCompany.query({id: id});
        }

        public listAllDealsByDealOwner(id) {
            return this.dealResourceFromDealOwner.query({ id: id });
        }

        public saveDeal(dealToSave) {
            return this.dealResource.save(dealToSave).$promise;
        }

        public deleteDeal(id) {
            return this.dealResource.delete({ id: id }).$promise;
        }



    }

    angular.module("MyApp").service("dealService", DealService);

}