namespace MyApp.Controllers {

    export class DashboardController {

        public totalContacts;

        constructor(private dashboardService: MyApp.Services.DashboardService) {

            this.getAllContacts();

        }

        public getAllContacts() {
            this.dashboardService.listAllContactsForUser().$promise.then((result) => {
                this.totalContacts = result.length;
                console.log(result);
            });
        }


    }
}