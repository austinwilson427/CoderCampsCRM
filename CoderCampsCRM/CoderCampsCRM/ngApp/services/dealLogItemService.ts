namespace MyApp.Services {

    export class DealLogItemService {
        
        private dealResource;
        private dealResourceFromDeal;

        constructor(private $resource: ng.resource.IResourceService) {
            this.dealResource = $resource("api/deallogitems/:id");
            this.dealResourceFromDeal = $resource("api/deallogitems/deal/:id");
        }

        public listAllDealLogItems() {
            return this.dealResource.query();
        }

        public getDealLogItemsById(id) {
            return this.dealResource.get({ id: id });
        }

        public listDealLogItemsByDealId(id) {
            return this.dealResourceFromDeal.query({ id: id });
        }

        public saveDealLogItem(dealToSave) {
            return this.dealResource.save(dealToSave).$promise;
        }

        public deleteDealLogItem(id) {
            return this.dealResource.delete({ id: id }).$promise;
        }



    }

    angular.module("MyApp").service("dealLogItemService", DealLogItemService);

}