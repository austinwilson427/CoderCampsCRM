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
                this.contact = {};
                this.contactView = this.contactService.getOneContact($stateParams['id']);
            }
            ContactDetailsController.prototype.deleteContact = function () {
                return this.contactService.deleteContact(this.contactView.contact.id).then(this.$location.path("/contacts"));
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
