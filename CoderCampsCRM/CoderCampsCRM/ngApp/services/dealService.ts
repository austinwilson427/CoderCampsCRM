namespace MyApp.Services {

    export class DealService {

        private dealResourceOwned;
        private dealResourceShared;
        private dealResourceFromCompany;
        private dealResourceFromDealOwner;
        private dealResourcePag;

        constructor(private $resource: ng.resource.IResourceService) {
            this.dealResourceOwned = $resource("api/deals/owned/:id");
            this.dealResourceShared = $resource("api/deals/shared/:id");
            this.dealResourcePag = $resource("api/deals/pag/:take/:skip/:order/:orderDirection");
            this.dealResourceFromCompany = $resource("api/deals/company/:id");
            this.dealResourceFromDealOwner = $resource("api/deals/deal-owner/:id");
        }

        public listAllDealsOwned() {
            return this.dealResourceOwned.query();
        }

        public listAllDealsShared() {
            return this.dealResourceShared.query();
        }

        public listDealsByPag(takeCount, skipCount, order, direction) {
            return this.dealResourcePag.query({
                skip: skipCount,
                take: takeCount,
                order: order,
                orderDirection: direction
            });
        }

        public getDealsOwnedByDealId(id) {
            return this.dealResourceOwned.get({ id: id });
        }

        public getDealsSharedByDealId(id) {
            return this.dealResourceShared.get({ id: id });
        }


        public listAllDealsByCompanyId(id) {
            return this.dealResourceFromCompany.query({id: id});
        }

        public listAllDealsByDealOwner(id) {
            return this.dealResourceFromDealOwner.query({ id: id });
        }

        public saveDeal(dealToSave) {
            return this.dealResourceOwned.save(dealToSave).$promise;
        }

        public deleteDeal(id) {
            return this.dealResourceOwned.delete({ id: id }).$promise;
        }



    }

    angular.module("MyApp").service("dealService", DealService);

}