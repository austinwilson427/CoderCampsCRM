var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactDetailsController = (function () {
            function ContactDetailsController(contactService, $location, $uibModal, $stateParams, $state, filepickerService, dealService, taskService) {
                this.contactService = contactService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.$state = $state;
                this.filepickerService = filepickerService;
                this.dealService = dealService;
                this.taskService = taskService;
                this.showMap = false;
                this.contact = {};
                this.location = {};
                this.contactView = this.contactService.getOneContact($stateParams['id']);
                var timeNow = new Date();
                timeNow = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), timeNow.getHours(), timeNow.getMinutes());
                this.interaction = {
                    date: timeNow
                };
            }
            ContactDetailsController.prototype.deleteModal = function () {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: "/ngApp/views/modals/contactDeleteModal.html",
                    controller: MyApp.Controllers.ContactDeleteController,
                    controllerAs: 'modal',
                    size: 'sm',
                    resolve: {
                        contact: function () { return _this.contactView.contact; }
                    }
                });
            };
            ContactDetailsController.prototype.setLocation = function () {
                this.zoom = 10;
                this.center = { latitude: this.contactView.contact.latitude, longitude: this.contactView.contact.longitude };
                this.marker = [
                    {
                        id: this.contactView.contact.id,
                        options: {
                            title: this.contactView.contact.name,
                        },
                        latitude: this.contactView.contact.latitude,
                        longitude: this.contactView.contact.longitude,
                    },
                ];
                if (this.showMap == false) {
                    this.showMap = true;
                }
                else {
                    this.showMap = false;
                }
            };
            ContactDetailsController.prototype.pickFile = function () {
                this.filepickerService.pick({ mimetype: 'image/*' }, this.fileUploaded.bind(this));
            };
            ContactDetailsController.prototype.fileUploaded = function (file) {
                this.file = file;
                this.imageReady = true;
                this.imageUpload();
            };
            ContactDetailsController.prototype.imageUpload = function () {
                this.getViewDetails();
                this.contact.imageUrl = this.file.url;
                return this.contactService.editContact(this.contact);
            };
            ContactDetailsController.prototype.editContact = function () {
                $(".tdEdit").attr("contenteditable", "true").attr("style", "background-color: rgb(255, 255, 194)");
            };
            ContactDetailsController.prototype.btnEdit = function () {
                this.getViewDetails();
                return this.contactService.editContact(this.contact);
            };
            ContactDetailsController.prototype.getViewDetails = function () {
                this.contact.id = this.contactView.contact.id;
                if (this.contact.companyId != null) {
                    this.contact.companyId = this.companyChoice;
                }
                this.contact.companyId = this.companyChoice;
                this.contact.lastInteraction = $("#lastInteraction").text();
                this.contact.name = $("#name").text();
                this.contact.email = $("#email").text();
                this.contact.phoneNumber = $("#phoneNumber").text();
                this.contact.jobTitle = $("#jobTitle").text();
                this.contact.country = $("#country").text();
                this.contact.city = $("#city").text();
                this.contact.state = $("#state").text();
                this.contact.zip = $("#zip").text();
                this.contact.notes = $("#notes").text();
                this.contact.streetAddress = $("#streetAddress").text();
                this.contact.longitude = $("#long").text();
                this.contact.latitude = $("#lat").text();
                this.contact.userId = this.contactView.contact.userId;
                this.contact.imageUrl = this.contactView.contact.imageUrl;
            };
            ContactDetailsController.prototype.confirmEdit = function () {
                $(".tdEdit").removeAttr("contenteditable").removeAttr("style");
                this.getViewDetails();
                return this.contactService.editContact(this.contact);
            };
            ContactDetailsController.prototype.chooseCompany = function () {
                var _this = this;
                this.getViewDetails();
                return this.contactService.editContact(this.contact).then(function () {
                    _this.$state.reload();
                });
            };
            ContactDetailsController.prototype.checkCoordsId = function () {
                if (this.contactView.location) {
                    this.location.id = this.contactView.location.id;
                }
                else {
                    this.location.id = 0;
                }
            };
            ContactDetailsController.prototype.addInteraction = function () {
                this.interaction.contactId = this.contactView.contact.id;
                return this.contactService.addInteraction(this.interaction).then(this.$state.reload());
            };
            ContactDetailsController.prototype.deleteInteraction = function (id) {
                return this.contactService.deleteInteraction(id).then(this.$state.reload());
            };
            ContactDetailsController.prototype.addDealModal = function () {
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/add-deal.html',
                    controller: MyApp.Controllers.AddDealModal,
                    controllerAs: 'vm',
                    size: "deal",
                });
            };
            return ContactDetailsController;
        })();
        Controllers.ContactDetailsController = ContactDetailsController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=contactDetailsController.js.map