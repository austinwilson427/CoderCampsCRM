namespace MyApp.Controllers {

    export class DashboardController {

        public totalContacts;
        public totalCompanies;
        public totalDeals;
        public totalTasks;
        public allActivity;

        constructor(private dashboardService: MyApp.Services.DashboardService) {
            this.allActivity = [];
            this.getAllDetails();
        }

        public getAllContacts() {
            this.dashboardService.listAllContactsForUser().$promise.then((result) => {
                this.totalContacts = result.length;
                
                for (var i = 0; i < result.length; i++) {
                    let contactDetails = {
                        id: null,
                        category: null,
                        name: null,
                        createdOn: null,
                        dueBy: null
                    }
                    contactDetails.id = result[i].id;
                    contactDetails.category = "contact";
                    contactDetails.name = result[i].name;
                    contactDetails.createdOn = result[i].createdOn;
                    this.allActivity.push(contactDetails);
                }
            });
        }

        public getAllCompanies() {
            this.dashboardService.listAllCompaniesForUser().$promise.then((result) => {
                this.totalCompanies = result.length;
                for (var i = 0; i < result.length; i++) {
                    let contactDetails = {
                        id:null,
                        category: null,
                        name: null,
                        createdOn: null,
                        dueBy: null
                    }
                    contactDetails.id = result[i].id;
                    contactDetails.category = "company";
                    contactDetails.name = result[i].companyName;
                    contactDetails.createdOn = result[i].companyCreateDate;
                    this.allActivity.push(contactDetails);
                }
            });
        }

        public getAllDeals() {
            this.dashboardService.listAllDealsForUser().$promise.then((result) => {
                this.totalDeals = result.length;
                for (var i = 0; i < result.length; i++) {
                    let contactDetails = {
                        id: null,
                        category: null,
                        name: null,
                        createdOn: null,
                        dueBy: null
                    }
                    contactDetails.id = result[i].id;
                    contactDetails.category = "deal";
                    contactDetails.name = result[i].dealName;
                    contactDetails.createdOn = result[i].createdOn;
                    this.allActivity.push(contactDetails);
                }
            });
        }

        public getAllTasks() {
            this.dashboardService.listAllTasksForUser().$promise.then((result) => {
                this.totalTasks = result.length;
                    for (var i = 0; i < result.length; i++) {
                        let contactDetails = {
                            id: null,
                            category: null,
                            name: null,
                            createdOn: null,
                            dueBy: null
                        }
                        contactDetails.id = result[i].id;
                        contactDetails.category = "task";
                        contactDetails.name = result[i].type;
                        contactDetails.createdOn = result[i].createdOn;
                        contactDetails.dueBy = result[i].dueDate;
                        this.allActivity.push(contactDetails);
                }
            });
        }

        public getAllDetails() {
            this.getAllContacts();
            this.getAllCompanies();
            this.getAllDeals();
            this.getAllTasks();
        }


    }
}