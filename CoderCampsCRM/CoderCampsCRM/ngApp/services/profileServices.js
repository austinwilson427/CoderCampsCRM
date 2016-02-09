var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        ////
        var AccountProfileServices = (function () {
            function AccountProfileServices($resource) {
                this.ProfileResource = $resource("/api/AccountProfile/:id");
                this.ProfilesByUserResource = $resource("api/AccountProfile/getProfileByUser/");
            }
            AccountProfileServices.prototype.createAccountProfile = function (profile) {
                //////
                console.log("add profile");
                console.log("profileServices addProfile " + profile);
                return this.ProfileResource.save(profile).$promise;
            };
            AccountProfileServices.prototype.saveAccountProfile = function (profile) {
                return this.ProfileResource.save(profile).$promise;
            };
            AccountProfileServices.prototype.getAccountProfileByUser = function () {
                this.profiles = this.ProfilesByUserResource.query();
                return this.profiles;
            };
            return AccountProfileServices;
        })();
        Services.AccountProfileServices = AccountProfileServices;
        angular.module("MyApp").service("profileService", AccountProfileServices);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=profileServices.js.map