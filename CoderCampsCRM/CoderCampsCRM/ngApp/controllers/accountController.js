var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var AccountController = (function () {
            function AccountController(accountService, $location, $uibModal) {
                var _this = this;
                this.accountService = accountService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.getExternalLogins().then(function (results) {
                    _this.externalLogins = results;
                });
            }
            AccountController.prototype.showModal = function () {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/login.html",
                    controller: MyApp.Controllers.LoginController,
                    controllerAs: "controller",
                    resolve: {},
                    size: "sm"
                });
            };
            AccountController.prototype.getClaim = function (type) {
                return this.accountService.getClaim(type);
            };
            AccountController.prototype.isLoggedIn = function () {
                return this.accountService.isLoggedIn();
            };
            AccountController.prototype.logout = function () {
                this.accountService.logout();
            };
            AccountController.prototype.getExternalLogins = function () {
                return this.accountService.getExternalLogins();
            };
            return AccountController;
        })();
        Controllers.AccountController = AccountController;
        angular.module('MyApp').controller('AccountController', AccountController);
        var LoginController = (function () {
            function LoginController(accountService, $location, $uibModal, $uibModalInstance) {
                this.accountService = accountService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.$uibModalInstance = $uibModalInstance;
            }
            LoginController.prototype.login = function () {
                var _this = this;
                this.accountService.login(this.loginUser).then(function () {
                    _this.$location.path('/');
                }).catch(function (results) {
                    _this.validationMessages = results;
                });
            };
            LoginController.prototype.showRegisterModal = function () {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/register.html",
                    controller: MyApp.Controllers.RegisterController,
                    controllerAs: "vm",
                    resolve: {},
                    size: "lg"
                });
            };
            LoginController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return LoginController;
        })();
        Controllers.LoginController = LoginController;
        var RegisterController = (function () {
            function RegisterController(accountService, filepickerService, $scope, $location, $uibModalInstance) {
                this.accountService = accountService;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.picUploaded = false;
                this.file = {
                    url: null
                };
                this.registerUser = {
                    picUrl: ""
                };
            }
            RegisterController.prototype.pickFile = function () {
                this.filepickerService.pick({ mimetype: 'image/*' }, this.fileUploaded.bind(this));
            };
            RegisterController.prototype.fileUploaded = function (file) {
                // save file url to database
                this.file = file;
                if (this.file.url) {
                    this.registerUser.picUrl = this.file.url;
                }
                this.picUploaded = true;
                this.$scope.$apply(); // force page to update
            };
            RegisterController.prototype.register = function () {
                var _this = this;
                this.accountService.register(this.registerUser).then(function () {
                    _this.$location.path('/login');
                }).catch(function (results) {
                    _this.validationMessages = results;
                });
            };
            RegisterController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return RegisterController;
        })();
        Controllers.RegisterController = RegisterController;
        var ExternalLoginController = (function () {
            function ExternalLoginController($http, $location, accountService) {
                this.$location = $location;
                this.accountService = accountService;
                // if the user is already registered then redirect home else register
                var response = accountService.parseOAuthResponse($location.hash());
                var externalAccessToken = response['access_token'];
                accountService.getUserInfo(externalAccessToken).then(function (userInfo) {
                    if (userInfo.hasRegistered) {
                        accountService.storeUserInfo(response);
                        $location.path('/');
                    }
                    else {
                        $location.path('/externalRegister');
                    }
                });
            }
            return ExternalLoginController;
        })();
        Controllers.ExternalLoginController = ExternalLoginController;
        var ExternalRegisterController = (function () {
            function ExternalRegisterController(accountService, $location) {
                this.accountService = accountService;
                this.$location = $location;
                var response = accountService.parseOAuthResponse($location.hash());
                this.externalAccessToken = response['access_token'];
            }
            ExternalRegisterController.prototype.register = function () {
                var _this = this;
                this.accountService.registerExternal(this.registerUser.email, this.externalAccessToken)
                    .then(function (result) {
                    _this.$location.path('/login');
                }).catch(function (result) {
                    _this.validationMessages = result;
                });
            };
            return ExternalRegisterController;
        })();
        Controllers.ExternalRegisterController = ExternalRegisterController;
        var ConfirmEmailController = (function () {
            function ConfirmEmailController(accountService, $http, $routeParams, $location) {
                var _this = this;
                this.accountService = accountService;
                this.$http = $http;
                this.$routeParams = $routeParams;
                this.$location = $location;
                var userId = $routeParams['userId'];
                var code = $routeParams['code'];
                accountService.confirmEmail(userId, code)
                    .then(function (result) {
                    _this.$location.path('/');
                }).catch(function (result) {
                    _this.validationMessages = result;
                });
            }
            return ConfirmEmailController;
        })();
        Controllers.ConfirmEmailController = ConfirmEmailController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
