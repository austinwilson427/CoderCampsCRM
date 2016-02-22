namespace MyApp.Services {

    export class DashboardService {

        private contactResource;
        private companyResource;
        private dealResource;
        private taskResource;
        private quotaResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.contactResource = $resource("api/dashboard/contacts");
            this.companyResource = $resource("api/dashboard/companies");
            this.dealResource = $resource("api/dashboard/deals");
            this.taskResource = $resource("api/dashboard/tasks");
            this.quotaResource = $resource("api/dashboard/quotas");
        }

        public listAllContactsForUser() {
            return this.contactResource.query();
        }

        public listAllCompaniesForUser() {
            return this.companyResource.query();
        }

        public listAllDealsForUser() {
            return this.dealResource.query();
        }

        public listAllTasksForUser() {
            return this.taskResource.query();
        }

        public listAllQuotasForUser() {
            return this.quotaResource.query();
        }

        public saveQuota(quotaToSave) {
            return this.quotaResource.save(quotaToSave).$promise;
        }



    }

    angular.module("MyApp").service("dashboardService", DashboardService);

}

