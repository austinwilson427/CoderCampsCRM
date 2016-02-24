namespace MyApp.Controllers {

    export class DashboardController {

        public totalContacts;
        public totalCompanies;
        public totalDeals;
        public totalTasks;
        public allActivity;
        public weightedTotal;
        public monthlyQuota;
        public quotaDetails;
        public percentComplete;
        public countCalls;
        public countEmails;
        public countMeetings;
        public countCompleted;

        constructor(private dashboardService: MyApp.Services.DashboardService, private $uibModal: ng.ui.bootstrap.IModalService) {
            this.monthlyQuota = 0;
            this.countCompleted = 0;
            this.countCalls = 0;
            this.countEmails = 0;
            this.countMeetings = 0;
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
                        id: null,
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
                this.totalDeals = 0;
                this.weightedTotal = 0;

                for (var i = 0; i < result.length; i++) {
                    let contactDetails = {
                        id: null,
                        category: null,
                        name: null,
                        createdOn: null,
                        dueBy: null
                    }

                    let currentDate = new Date();
                    let currentMonth = currentDate.getMonth();
                    let myDate = new Date(result[i].closeDate);
                    let month = myDate.getMonth();
                    if (currentMonth == month && result[i].isArchived == false) {
                        if (result[i].stage == "Appointment Scheduled") {
                            this.weightedTotal += result[i].amount * .2;
                        } else if (result[i].stage == "Qualified to Buy") {
                            this.weightedTotal += result[i].amount * .4;
                        } else if (result[i].stage == "Presentation Scheduled") {
                            this.weightedTotal += result[i].amount * .6;
                        } else if (result[i].stage == "Decision Maker Bought In") {
                            this.weightedTotal += result[i].amount * .8;
                        } else if (result[i].stage == "Contract Sent" || result[i].stage == "Closed Won") {
                            this.weightedTotal += result[i].amount * 1;
                        } else if (result[i].stage == "Closed Lost") {

                        }
                    }

                    if (result[i].isArchived == false) {
                        this.totalDeals++;
                    }

                    contactDetails.id = result[i].id;
                    contactDetails.category = "deal";
                    contactDetails.name = result[i].dealName;
                    contactDetails.createdOn = result[i].createdOn;
                    this.allActivity.push(contactDetails);
                }

                this.getAllQuotas();
            });
        }

        public getAllTasks() {
            this.dashboardService.listAllTasksForUser().$promise.then((result) => {
                this.totalTasks = result.length;
                for (var i = 0; i < result.length; i++) {

                    if (result[i].type == "Phonecall") {
                        this.countCalls++;
                    } else if (result[i].type == "Email") {
                        this.countEmails++;
                    } else if (result[i].type == "Meeting") {
                        this.countMeetings++;
                    }

                    if (result[i].status == "Completed") {
                        this.countCompleted++;
                    }

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

        public getAllQuotas() {
            this.dashboardService.listAllQuotasForUser().$promise.then((result) => {
                let currentDate = new Date();
                let currentMonth = currentDate.getMonth();
                let currentYear = currentDate.getFullYear();
                for (var i = 0; i < result.length; i++) {
                    if (result[i].month == currentMonth && result[i].year == currentYear) {
                        this.quotaDetails = result[i];
                        this.monthlyQuota = result[i].quotaSet;
                        this.percentComplete = Math.round(10000 * this.weightedTotal / this.monthlyQuota)/100;
                        break;
                    }
                }
            });
        }

        public getAllDetails() {
            this.getAllContacts();
            this.getAllCompanies();
            this.getAllDeals();
            this.getAllTasks();
        }

        public showQuotaModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/quotaModal.html',
                controller: QuotaModal,
                controllerAs: 'vm',
                resolve: {
                    quotaDetails: () => this.quotaDetails,
                    monthlyQuota: () => this.monthlyQuota
                },
                size: "deal"
            });
        }
    }

    class QuotaModal {

        public quotaSet;

        constructor(public quotaDetails, public monthlyQuota, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private dashboardService: MyApp.Services.DashboardService) {
            this.quotaSet = monthlyQuota;
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }

        public saveQuota() {
            let currentDate = new Date();
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();
            if (this.quotaDetails == undefined) {
                this.quotaDetails = {
                    month: currentMonth,
                    year: currentYear,
                    quotaSet: this.quotaSet
                }
            } else {
                this.quotaDetails.quotaSet = this.quotaSet;
            }

            this.dashboardService.saveQuota(this.quotaDetails).then((result) => {
                this.closeModal();
                location.reload(false);
            });
            
        }
    }
}