namespace MyApp.Controllers {

    export class ProfileController {
        public profiles;
        public profile;
        public selectedProfile;
        public validationErrors;
        constructor(private profileService: MyApp.Services.AccountProfileServices, private $location: ng.ILocaleService, private $route: ng.route.IRouteService) {
            this.getProfile();
        }

        getProfile() {
            this.profiles = this.profileService.getAccountProfileByUser();
        }
        populateFields() {
            this.profile = this.selectedProfile;
        }
        //add new profile here?
        addProfile() {
            this.validationErrors = [];            

            this.profile.isActive = true;
            this.profile.Service.createAccountProfile(this.profile).then(() => {
                this.$route.reload();
            //}).catch(Error) => {
            //    for (let i in Error.data.modelState[i];
            //    this.validationErrors = this.validationErrors.concat(errorMessage);

            //}

        });
    }
    editProfile(){
        this.validationErrors = [];
        this.profile.isActive = true;
        this.profileService.saveAccountProfile(this.profile).then(() => {
            this.$route.reload();
        });
    }
    deleteProfile(profile)
    {
        this.profile.isActive = false;
        this.profileService.saveAccountProfile(this.profile).then(() => {
            this.$route.reload();
        });
     }
    }
}

