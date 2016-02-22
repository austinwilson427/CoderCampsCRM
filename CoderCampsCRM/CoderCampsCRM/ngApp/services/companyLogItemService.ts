namespace MyApp.Services {

    export class CompanyLogItemService {

        private companyResource;
        private companyResourceFromCompany;

        constructor(private $resource: ng.resource.IResourceService) {
            this.companyResource = $resource("api/companylogitems/:id");
            this.companyResourceFromCompany = $resource("api/companylogitems/company/:id");
        }

        public listAllCompanyLogItems() {
            return this.companyResource.query();
        }

        public getCompanyLogItemsById(id) {
            return this.companyResource.get({ id: id });
        }

        public listCompanyLogItemsByCompanyId(id) {
            return this.companyResourceFromCompany.query({ id: id });
        }

        public saveCompanyLogItem(companyToSave) {
            return this.companyResource.save(companyToSave).$promise;
        }

        public deleteCompanyLogItem(id) {
            return this.companyResource.delete({ id: id }).$promise;
        }



    }
    
    angular.module("MyApp").service("companyLogItemService", CompanyLogItemService);

}