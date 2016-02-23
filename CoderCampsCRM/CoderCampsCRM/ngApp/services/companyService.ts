namespace MyApp.Services {
    export class CompaniesService {
        private companiesResource;
        private companyListResource;
        private companyFilterResource;
        public googleCalendarResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.companiesResource = $resource("/api/companies/:id");
            this.companyListResource = $resource("api/contactListView/:id");
            this.googleCalendarResource = $resource("api/googleCalendar/:id");
      

        }
        //////////////Google Calendar /////////
        public sendToGoogleCalendar() {

            return this.googleCalendarResource.get();
           
        };


        public getCompanies() {
            return this.companiesResource.query();
        }
        public getCompany(id) {
            return this.companiesResource.get({ id: id });
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
       
    }
    angular.module("MyApp").service("companiesService", CompaniesService);

}
