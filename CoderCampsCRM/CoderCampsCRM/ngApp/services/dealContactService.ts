namespace MyApp.Services {

    export class DealContactService {

        public dealContactResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.dealContactResource = $resource("api/dealcontacts/:id");
        }

        public getAllDealContacts() {
            return this.dealContactResource.query();
        }

        public getAllDealContactsByDealId(id) {
            return this.dealContactResource.query({ id: id });
        }

        public saveDealContact(contactToSave) {
            return this.dealContactResource.save(contactToSave).$promise;
        }

        public deleteDealContact(id) {
            return this.dealContactResource.delete({ id: id }).$promise;
        }

    }

    angular.module("MyApp").service("dealContactService", DealContactService);

}