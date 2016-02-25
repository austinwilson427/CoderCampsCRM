var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var AccountController = (function () {
            function AccountController(accountService, $location, $uibModal, $window, $state) {
                var _this = this;
                this.accountService = accountService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.$window = $window;
                this.$state = $state;
                this.getExternalLogins().then(function (results) {
                    _this.externalLogins = results;
                    _this.currentUserName = _this.$window.sessionStorage.getItem("firstName");
                });
            }
            AccountController.prototype.showModal = function () {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/login.html",
                    controller: MyApp.Controllers.LoginController,
                    controllerAs: "controller",
                    resolve: {},
                    size: "md"
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
                this.$location.path('/');
                location.reload();
            };
            AccountController.prototype.getExternalLogins = function () {
                return this.accountService.getExternalLogins();
            };
            AccountController.prototype.showRegisterModal = function () {
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
            ;
            return AccountController;
        })();
        Controllers.AccountController = AccountController;
        angular.module('MyApp').controller('AccountController', AccountController);
        var LoginController = (function () {
            function LoginController(accountService, $location, $uibModal, $uibModalInstance) {
                var _this = this;
                this.accountService = accountService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.$uibModalInstance = $uibModalInstance;
                this.getExternalLogins().then(function (results) {
                    _this.externalLogins = results;
                });
            }
            LoginController.prototype.login = function () {
                var _this = this;
                this.accountService.login(this.loginUser).then(function () {
                    _this.closeModal();
                    _this.$location.path('/dashboard');
                    location.reload();
                }).catch(function (results) {
                    _this.validationMessages = results;
                });
            };
            LoginController.prototype.showRegisterModal = function () {
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
            };
            LoginController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            LoginController.prototype.getExternalLogins = function () {
                return this.accountService.getExternalLogins();
            };
            return LoginController;
        })();
        Controllers.LoginController = LoginController;
        var MyHomeController = (function () {
            function MyHomeController(accountService, $location, $uibModal, $uibModalInstance) {
                this.accountService = accountService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.$uibModalInstance = $uibModalInstance;
            }
            MyHomeController.prototype.showLoginModal = function () {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/login.html",
                    controller: MyApp.Controllers.LoginController,
                    controllerAs: "controller",
                    resolve: {},
                    size: "md"
                });
            };
            MyHomeController.prototype.showRegisterModal = function () {
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
            ;
            return MyHomeController;
        })();
        Controllers.MyHomeController = MyHomeController;
        var RegisterController = (function () {
            function RegisterController(accountService, filepickerService, $scope, $location, $uibModalInstance, $uibModal, userInfo) {
                this.accountService = accountService;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.$uibModal = $uibModal;
                this.userInfo = userInfo;
                if (this.userInfo) {
                    this.registerUser = this.userInfo;
                    this.picUploaded = true;
                }
                else {
                    this.picUploaded = false;
                    this.registerUser = {
                        picUrl: ""
                    };
                }
                this.file = {
                    url: null
                };
            }
            RegisterController.prototype.showLoginModal = function () {
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/login.html",
                    controller: MyApp.Controllers.LoginController,
                    controllerAs: "controller",
                    resolve: {},
                    size: "md"
                });
            };
            RegisterController.prototype.pickFile = function () {
                this.closeModal();
                this.filepickerService.pick({ mimetype: 'image/*' }, this.fileUploaded.bind(this));
            };
            RegisterController.prototype.fileUploaded = function (file) {
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
            };
            RegisterController.prototype.register = function () {
                var _this = this;
                this.accountService.register(this.registerUser).then(function () {
                    _this.closeModal();
                    _this.showLoginModal();
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
            function ExternalRegisterController(accountService, $location, $uibModal) {
                this.accountService = accountService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                var response = accountService.parseOAuthResponse($location.hash());
                this.externalAccessToken = response['access_token'];
            }
            ExternalRegisterController.prototype.register = function () {
                var _this = this;
                this.accountService.registerExternal(this.registerUser, this.externalAccessToken)
                    .then(function (result) {
                    _this.$location.path('/');
                    _this.$uibModal.open({
                        templateUrl: "/ngApp/views/login.html",
                        controller: MyApp.Controllers.LoginController,
                        controllerAs: "controller",
                        resolve: {},
                        size: "md"
                    });
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
