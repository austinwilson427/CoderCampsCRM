namespace MyApp.Services {
////
    export class AccountProfileService {
      
        private ProfileResource;
        public profiles;

        constructor($resource: ng.resource.IResourceService) {
            this.ProfileResource = $resource("/api/profile");
           
        }

        public GetAccountProfile() {
               
            return this.ProfileResource.get().$promise;
        }
        public saveAccountProfile(profile) {
            return this.ProfileResource.save(profile).$promise;
        }
       

    }
    angular.module("MyApp").service("profileService",AccountProfileService);
}