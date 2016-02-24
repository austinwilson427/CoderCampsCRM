namespace MyApp.Controllers {

    export class ProfileController {
        public profiles;
        public profile;
        public selectedProfile;
        public validationErrors;
        public file;
        constructor(private profileService: MyApp.Services.AccountProfileService, private $location: ng.ILocaleService, private $route: ng.route.IRouteService, private filepickerService) {
            this.getProfile();
        }

        getProfile() {
            this.profileService.GetAccountProfile().then((result) => {
                this.profile = result;
            });
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

        editProfile() {

            this.validationErrors = [];
            this.profile.isActive = true;
            this.profileService.saveAccountProfile(this.profile).then(() => {
                this.$route.reload();
            });
        }

        deleteProfile() {
            this.profile.isActive = false;
            this.profileService.saveAccountProfile(this.profile).then(() => {
                this.$route.reload();
            });
        }

        public pickFile() {
            this.filepickerService.pick(
                { mimetype: 'image/*' },
                this.fileUploaded.bind(this)
            );
        }

        public fileUploaded(file) {

            // save file url to database
            this.file = file;

            if (this.file.url) {
                this.profile.picUrl = this.file.url;
            }
            this.$route.reload();
        }
    }
}
