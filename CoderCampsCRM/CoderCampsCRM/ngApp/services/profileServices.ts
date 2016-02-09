namespace MyApp.Services {
////
    export class AccountProfileServices {
        private ProfilesByUserResource;
        private ProfileResource;
        public profiles;

        constructor($resource: ng.resource.IResourceService) {
            this.ProfileResource = $resource("/api/AccountProfile/:id");
            this.ProfilesByUserResource = $resource("api/AccountProfile/getProfileByUser/");
        }

        public createAccountProfile(profile) {
        //////
            console.log("add profile");
            console.log("profileServices addProfile " + profile);
            return this.ProfileResource.save(profile).$promise;
        }
        public saveAccountProfile(profile) {
            return this.ProfileResource.save(profile).$promise;
        }
        public getAccountProfileByUser() {
            this.profiles = this.ProfilesByUserResource.query();
            return this.profiles;

        }

    }
    angular.module("MyApp").service("profileService",AccountProfileServices);
}