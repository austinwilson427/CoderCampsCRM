var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactDetailsController = (function () {
            function ContactDetailsController(contactService, $location, $uibModal, $stateParams, $state) {
                this.contactService = contactService;
                this.$location = $location;
                this.$uibModal = $uibModal;
                this.$state = $state;
                this.showMap = false;
                this.contact = {};
                this.location = {};
                this.contactView = this.contactService.getOneContact($stateParams['id']);
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
                this.zoom = this.contactView.location.zoom;
                this.center = { latitude: this.contactView.location.latitude, longitude: this.contactView.location.longitude };
                this.marker = [
                    {
                        id: this.contactView.location.id,
                        options: {
                            title: this.contactView.location.title,
                        },
                        latitude: this.contactView.location.latitude,
                        longitude: this.contactView.location.longitude,
                    },
                ];
                if (this.showMap == false) {
                    this.showMap = true;
                }
                else {
                    this.showMap = false;
                }
            };
            ContactDetailsController.prototype.editContact = function () {
                $(".tdEdit").attr("contenteditable", "true").attr("style", "background-color: rgb(255, 255, 194)");
            };
            ContactDetailsController.prototype.confirmEdit = function () {
                $(".tdEdit").removeAttr("contenteditable").removeAttr("style");
                this.contact.id = this.contactView.contact.id;
                this.contact.companyId = this.contactView.contact.companyId;
                this.contact.lastInteraction = $("#lastInteraction").text();
                this.contact.name = $("#name").text();
                this.contact.email = $("#email").text();
                this.contact.phoneNumber = $("#phoneNumber").text();
                this.contact.jobTitle = $("#jobTitle").text();
                this.contact.country = $("#country").text();
                this.contact.city = $("#city").text();
                this.contact.state = $("#state").text();
                this.contact.zip = $("#zip").text();
                this.contact.streetAddress = $("#streetAddress").text();
                return this.contactService.editContact(this.contact);
            };
            ContactDetailsController.prototype.chooseCompany = function () {
                this.contact.id = this.contactView.contact.id;
                this.contact.companyId = this.companyChoice;
                this.contact.lastInteraction = $("#lastInteraction").text();
                this.contact.name = $("#name").text();
                this.contact.email = $("#email").text();
                this.contact.phoneNumber = $("#phoneNumber").text();
                this.contact.jobTitle = $("#jobTitle").text();
                this.contact.city = $("#city").text();
                this.contact.state = $("#state").text();
                this.contact.zip = $("#zip").text();
                this.contact.streetAddress = $("#streetAddress").text();
                return this.contactService.editContact(this.contact).then(this.$state.reload());
            };
            ContactDetailsController.prototype.checkCoordsId = function () {
                if (this.contactView.location) {
                    this.location.id = this.contactView.location.id;
                }
                else {
                    this.location.id = 0;
                }
            };
            ContactDetailsController.prototype.editCoords = function () {
                debugger;
                $(".tdEdit").removeAttr("contenteditable").removeAttr("style");
                this.location.zoom = 6;
                this.location.contactId = this.contactView.contact.id;
                this.checkCoordsId();
                this.location.latitude = $("#lat").text();
                this.location.longitude = $("#long").text();
                this.location.title = this.contactView.contact.name;
                this.location.latitude = $("#lat").text();
                this.location.longitude = $("#long").text();
                return this.contactService.addLocation(this.location);
            };
            ContactDetailsController.prototype.addInteraction = function () {
                this.interaction.contactId = this.contactView.contact.id;
                return this.contactService.addInteraction(this.interaction).then(this.$state.reload());
            };
            ContactDetailsController.prototype.deleteInteraction = function (id) {
                return this.contactService.deleteInteraction(id).then(this.$state.reload());
            };
            return ContactDetailsController;
        })();
        Controllers.ContactDetailsController = ContactDetailsController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=contactDetailsController.js.map