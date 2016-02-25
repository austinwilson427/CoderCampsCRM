namespace MyApp.Controllers {

    export class AccountController {
        public externalLogins;
        public currentUserName;

        public showModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/login.html",
                controller: MyApp.Controllers.LoginController,
                controllerAs: "controller",
                resolve: {

                },
                size: "md"

            });
        }
        public getClaim(type) {
            return this.accountService.getClaim(type);
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public logout() {
            this.accountService.logout();
            this.$location.path('/');
            location.reload();
        }

        public getExternalLogins() {
            return this.accountService.getExternalLogins();
        }

        public showRegisterModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/register.html",
                controller: MyApp.Controllers.RegisterController,
                controllerAs: "vm",
                resolve: {
                    userInfo: null
                },
                size: "lg"

            });
        };

        constructor(private accountService: MyApp.Services.AccountService, private $location: ng.ILocationService, private $uibModal: angular.ui.bootstrap.IModalService, private $window: ng.IWindowService, private $state: ng.ui.IStateService) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
                this.currentUserName = this.$window.sessionStorage.getItem("firstName");
            });
        }
    }

    angular.module('MyApp').controller('AccountController', AccountController);


    export class LoginController {
        public loginUser;
        public validationMessages;
        public externalLogins;


        public login() {
            this.accountService.login(this.loginUser).then(() => {
                this.closeModal();
                this.$location.path('/dashboard');
                location.reload();
            }).catch((results) => {
                this.validationMessages = results;
            });
        }
        public showRegisterModal() {
            this.closeModal();
            this.$uibModal.open({
                templateUrl: "/ngApp/views/register.html",
                controller: MyApp.Controllers.RegisterController,
                controllerAs: "vm",
                resolve: {
                    userInfo: null
                },
                size: "lg"

            });

        }

        public closeModal() {
            this.$uibModalInstance.close();
        }

        public getExternalLogins() {
            return this.accountService.getExternalLogins();
        }


        constructor(private accountService: MyApp.Services.AccountService, private $location: ng.ILocationService, private $uibModal: angular.ui.bootstrap.IModalService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });
        }
    }

    export class MyHomeController {
        public registerUser;
        constructor(private accountService: MyApp.Services.AccountService, private $location: ng.ILocationService, private $uibModal: angular.ui.bootstrap.IModalService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) {

        }

        public showLoginModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/login.html",
                controller: MyApp.Controllers.LoginController,
                controllerAs: "controller",
                resolve: {

                },
                size: "md"

            });
        }
        public showRegisterModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/register.html",
                controller: MyApp.Controllers.RegisterController,
                controllerAs: "vm",
                resolve: {
                    userInfo: this.registerUser
                },
                size: "lg"

            });

        };
    }

    export class RegisterController {
        public registerUser;
        public validationMessages;
        public picUploaded;
        public file;

        public showLoginModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/login.html",
                controller: MyApp.Controllers.LoginController,
                controllerAs: "controller",
                resolve: {

                },
                size: "md"

            });
        }

        public pickFile() {
            this.closeModal();
            this.filepickerService.pick(
                { mimetype: 'image/*' },
                this.fileUploaded.bind(this)
            );
        }

        public fileUploaded(file) {

            // save file url to database
            this.file = file;

            if (this.file.url) {
                this.registerUser.picUrl = this.file.url;
            }

            this.$uibModal.open({
                templateUrl: "/ngApp/views/register.html",
                controller: MyApp.Controllers.RegisterController,
                controllerAs: "vm",
                resolve: {
                    userInfo: this.registerUser
                },
                size: "lg"

            });
        }

      
        public register() {

        
            this.accountService.register(this.registerUser).then(() => {
                this.closeModal();
                this.showLoginModal();

            }).catch((results) => {
                this.validationMessages = results;
            });

        }
        public closeModal() {
            this.$uibModalInstance.close();
        }

        constructor(private accountService: MyApp.Services.AccountService, private filepickerService, private $scope: ng.IScope, private $location: ng.ILocationService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private $uibModal: angular.ui.bootstrap.IModalService, public userInfo) {

            if (this.userInfo) {
                this.registerUser = this.userInfo;
                this.picUploaded = true;
            } else {
                this.picUploaded = false;
                this.registerUser = {
                    picUrl: ""
                };
            }

            this.file = {
                url: null
            };


        }
    }



    export class ExternalLoginController {

        constructor($http: ng.IHttpService, private $location: ng.ILocationService, private accountService: MyApp.Services.AccountService) {
            // if the user is already registered then redirect home else register
            let response = accountService.parseOAuthResponse($location.hash());
            let externalAccessToken = response['access_token'];
            accountService.getUserInfo(externalAccessToken).then((userInfo: any) => {
                if (userInfo.hasRegistered) {
                    accountService.storeUserInfo(response);
                    $location.path('/');

                } else {
                    $location.path('/externalRegister');
                }
            });
        }
    }


    export class ExternalRegisterController {
        private externalAccessToken;
        public registerUser;
        public validationMessages;
        public firstName;
        public lastName;
        public company;
        public timeZone;
        public picUrl;

        public register() {
            this.accountService.registerExternal(this.registerUser, this.externalAccessToken)
                .then((result) => {
                    this.$location.path('/');
                    this.$uibModal.open({
                        templateUrl: "/ngApp/views/login.html",
                        controller: MyApp.Controllers.LoginController,
                        controllerAs: "controller",
                        resolve: {

                        },
                        size: "md"

                    });
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }

        constructor(private accountService: MyApp.Services.AccountService, private $location: ng.ILocationService, private $uibModal: angular.ui.bootstrap.IModalService) {
            let response = accountService.parseOAuthResponse($location.hash());
            this.externalAccessToken = response['access_token'];
        }

    }

    export class ConfirmEmailController {
        public validationMessages;

        constructor(
            private accountService: MyApp.Services.AccountService,
            private $http: ng.IHttpService,
            private $routeParams: ng.route.IRouteParamsService,
            private $location: ng.ILocationService
        ) {
            let userId = $routeParams['userId'];
            let code = $routeParams['code'];
            accountService.confirmEmail(userId, code)
                .then((result) => {
                    this.$location.path('/');
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }
    }

}