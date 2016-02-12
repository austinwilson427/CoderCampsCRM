namespace MyApp.Controllers {

    export class ContactListController {

        public contactsView;
        public filterChoice;

        constructor(private contactService: MyApp.Services.ContactService, private $location: ng.ILocationService, private $uibModal: angular.ui.bootstrap.IModalService, private $state: ng.ui.IStateService) {         
            this.contactsView = contactService.getAllContacts();

        }

        public openNewContactModal() {
            this.$uibModal.open({
                templateUrl: "/ngApp/views/modals/contactAddModal.html",
                controller: MyApp.Controllers.ContactAddController,
                controllerAs: 'modal',
                size: "sm"
            })        
        }

        public filterByCompanies() {
            return this.contactService.filterByCompanies(this.filterChoice).then((result) => {
                this.contactsView = result
            });
        }

        public filterByDeals() {
            return this.contactService.filterByDeals(this.filterChoice).then((result) => {
                this.contactsView = result
            });
        }

        public filterByTasks() {
            return this.contactService.filterByTasks(this.filterChoice).then((result) => {
                this.contactsView = result
            });
        }

        public invertArrow(id) {

            if ($(id).attr("glyphicon glyphicon-chevron-down")) {
                $(id).removeAttr("glyphicon glyphicon-chevron-down");
                $(id).attr("glyphicon glyphicon-chevron-up");
            }
            else {
                $(id).removeAttr("glyphicon glyphicon-chevron-up");
                $(id).attr("glyphicon glyphicon-chevron-down");
            }
        }

        public openContactDetailsPage(id: number) {
            this.$location.path('/contactDetails/' + id);
        }
    }
}