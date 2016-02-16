namespace MyApp.Services {
    export class CompaniesService {
        private companiesResource;
        private companyListResource;
        private companyFilterResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.companiesResource = $resource("/api/companies/:id");
            this.companyListResource = $resource("api/contactListView/:id");
            //this.companyFilterResource = $resource("/api/companies/:id", null, {
            //    filterByCountry: {
            //        method: 'GET',
            //        url: '/api/companies/filterByCompanies/:id',
            //        isArray: false
            //    },
            //    filterByDeals: {
            //        method: 'GET',
            //        url: '/api/contactFilterView/filterByDeals/:id',
            //        isArray: false
            //    },
            //    filterByTasks: {
            //        method: 'GET',
            //        url: '/api/contactFilterView/filterByTasks/:id',
            //        isArray: false
            //    }
            //});


        }

        public getCompanies() {
            return this.companiesResource.query();
        }
        public getCompany(id) {
            return this.companiesResource.get({ id: id });
        }
        public getCompanyListView(id) {
            return this.companyListResource.get({ id: id });
        }
        public createCompany(company) {
            return this.companiesResource.save(company).$promise;
        }
        public deleteCompany(id) {
            return this.companiesResource.delete({ id: id }).$promise;
        }
        public editCompany(company) {
            return this.companiesResource.save(company).$promise;
        }
        //public filterByCountry(id: number) {
        //    return this.companyFilterResource.filterByCountry({ id: id }).$promise;
        //}
    }
    angular.module("MyApp").service("companiesService", CompaniesService);

}
