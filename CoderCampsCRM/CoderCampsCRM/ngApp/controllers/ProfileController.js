var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ProfileController = (function () {
            function ProfileController(profileService, $location, $route) {
                this.profileService = profileService;
                this.$location = $location;
                this.$route = $route;
                this.getProfile();
            }
            ProfileController.prototype.getProfile = function () {
                this.profiles = this.profileService.getAccountProfileByUser();
            };
            ProfileController.prototype.populateFields = function () {
                this.profile = this.selectedProfile;
            };
            //add new profile here?
            ProfileController.prototype.addProfile = function () {
                var _this = this;
                this.validationErrors = [];
                this.profile.isActive = true;
                this.profile.Service.createAccountProfile(this.profile).then(function () {
                    _this.$route.reload();
                    //}).catch(Error) => {
                    //    for (let i in Error.data.modelState[i];
                    //    this.validationErrors = this.validationErrors.concat(errorMessage);
                    //}
                });
            };
            ProfileController.prototype.editProfile = function () {
                var _this = this;
                this.validationErrors = [];
                this.profile.isActive = true;
                this.profileService.saveAccountProfile(this.profile).then(function () {
                    _this.$route.reload();
                });
            };
            ProfileController.prototype.deleteProfile = function (profile) {
                var _this = this;
                this.profile.isActive = false;
                this.profileService.saveAccountProfile(this.profile).then(function () {
                    _this.$route.reload();
                });
            };
            return ProfileController;
        })();
        Controllers.ProfileController = ProfileController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
