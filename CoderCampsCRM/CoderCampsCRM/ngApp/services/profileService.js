var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        ////
        var AccountProfileService = (function () {
            function AccountProfileService($resource) {
                this.ProfileResource = $resource("/api/profile");
            }
            AccountProfileService.prototype.GetAccountProfile = function () {
                return this.ProfileResource.get().$promise;
            };
            AccountProfileService.prototype.saveAccountProfile = function (profile) {
                return this.ProfileResource.save(profile).$promise;
            };
            return AccountProfileService;
        })();
        Services.AccountProfileService = AccountProfileService;
        angular.module("MyApp").service("profileService", AccountProfileService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
