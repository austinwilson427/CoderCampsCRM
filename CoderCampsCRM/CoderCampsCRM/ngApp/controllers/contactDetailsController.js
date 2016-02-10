var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var ContactDetailsController = (function () {
            function ContactDetailsController(contactService, $location, $uibModal, $stateParams) {
                this.contactService = contactService;
                this.$location = $location;
                this.$uibModal = $uibModal;
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
            ContactDetailsController.prototype.chooseCompany = function (companyId) {
                this.contact.id = this.contactView.contact.id;
                this.contact.companyId = companyId;
                this.contact.name = $("#name").text();
                this.contact.email = $("#email").text();
                this.contact.phoneNumber = $("#phoneNumber").text();
                this.contact.jobTitle = $("#jobTitle").text();
                this.contact.city = $("#city").text();
                this.contact.state = $("#state").text();
                this.contact.zip = $("#zip").text();
                this.contact.streetAddress = $("#streetAddress").text();
                return this.contactService.editContact(this.contact);
            };
            ContactDetailsController.prototype.addInteraction = function () {
                this.interaction.contactId = this.contactView.contact.id;
                return this.contactService.addInteraction(this.interaction).then(this.$location.path("/contacts"));
            };
            return ContactDetailsController;
        })();
        Controllers.ContactDetailsController = ContactDetailsController;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
