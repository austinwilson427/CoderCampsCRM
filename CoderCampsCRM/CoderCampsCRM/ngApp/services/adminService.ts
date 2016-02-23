namespace MyApp.Services {

    export class AdminService {

        public adminResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.adminResource = $resource("/api/admin");
        }

        public getUserResource() {
            return this.adminResource.query().$promise;
        }
    }
    angular.module("MyApp").service("adminService", AdminService);
}