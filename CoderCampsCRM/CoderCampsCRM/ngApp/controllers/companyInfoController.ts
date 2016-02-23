namespace MyApp.Controllers {

    export class CompanyInfoController {

        public routeId;
        public companyInfo;
        public deal;
        public companyLogItems;
        public companyContacts;
        public allContacts;
        public contactIdToAdd;

        constructor(private companyService: MyApp.Services.CompaniesService, private $stateParams: ng.ui.IStateParamsService, private companyLogItemService: MyApp.Services.CompanyLogItemService, private $route: ng.route.IRouteService, private $location: ng.ILocationService) {
            this.routeId = $stateParams["id"];
            this.getCompany();
           //this.getDealLogItemsByRouteId();
            //this.getContactsByDealId();
            this.getCompanyLogItemsByRouteId();
        }

        public getCompany() {
            this.companyService.getCompany(this.routeId).$promise.then((result) => {
                this.companyInfo = result;
                this.deal = result.deal;
            });
        }

        public getCompanyLogItemsByRouteId() {
            this.companyLogItemService.listCompanyLogItemsByCompanyId(this.routeId).$promise.then((result) => {
                this.companyLogItems = result;
            });
        }

     

    
    }

    export class CompanyInfoNoteController {

        public noteContent;
        public routeId;
        public companyInfo;
        public deal;
        public validationErrors;

        constructor(private $stateParams: ng.ui.IStateParamsService, private companiesService: MyApp.Services.CompaniesService, private companyLogItemService: MyApp.Services.CompanyLogItemService, private $location: ng.ILocationService, private $route: ng.route.IRouteService) {
            this.routeId = $stateParams["id"];
            this.getCompany();
        }

        public getCompany() {
            this.companiesService.getCompany(this.routeId).$promise.then((result) => {
                this.companyInfo = result;
            });
        }

        public submitNote() {
            let noteToSubmit = {
                startTime: null,
                type: null,
                content: null,
                dealId: null,
                contactId: null,
                submittedBy: null
            };
            noteToSubmit.startTime = new Date();
            noteToSubmit.type = "Note";
            noteToSubmit.content = this.noteContent;
            noteToSubmit.dealId = this.companyInfo.id;
            /*Temporary ContactId*/
            //noteToSubmit.contactId = 1;
            /*Temporary SubmittedBy*/
            noteToSubmit.submittedBy = "Guven Agas";
            console.log(noteToSubmit);
            this.companyLogItemService.saveCompanyLogItem(noteToSubmit).then(() => {
                location.reload(false);
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
                console.log(this.validationErrors);
            });

        }



    }

    export class CompanyInfoActivityController {
        public dateSelected;
        public timeSelected;
        public formatDate;
        public timeObject;
        public timeToAdd;
        public activityContent;
        public routeId;
        public companyInfo;
        public validationErrors;

        constructor(private $stateParams: ng.ui.IStateParamsService, private companiesService: MyApp.Services.CompaniesService, private companyLogItemService: MyApp.Services.CompanyLogItemService, private $location: ng.ILocationService, private $route: ng.route.IRouteService) {
            this.formatDate = new Date();
            this.timeSelected = 48;
            this.timeToAdd = 720;
            this.routeId = $stateParams["id"];
            this.getCompany();
            this.timeObject = [
                { value: 0, display: '12:00 AM' },
                { value: 1, display: '12:15 AM' },
                { value: 2, display: '12:30 AM' },
                { value: 3, display: '12:45 AM' },
                { value: 4, display: '1:00 AM' },
                { value: 5, display: '1:15 AM' },
                { value: 6, display: '1:30 AM' },
                { value: 7, display: '1:45 AM' },
                { value: 8, display: '2:00 AM' },
                { value: 9, display: '2:15 AM' },
                { value: 10, display: '2:30 AM' },
                { value: 11, display: '2:45 AM' },
                { value: 12, display: '3:00 AM' },
                { value: 13, display: '3:15 AM' },
                { value: 14, display: '3:30 AM' },
                { value: 15, display: '3:45 AM' },
                { value: 16, display: '4:00 AM' },
                { value: 17, display: '4:15 AM' },
                { value: 18, display: '4:30 AM' },
                { value: 19, display: '4:45 AM' },
                { value: 20, display: '5:00 AM' },
                { value: 21, display: '5:15 AM' },
                { value: 22, display: '5:30 AM' },
                { value: 23, display: '5:45 AM' },
                { value: 24, display: '6:00 AM' },
                { value: 25, display: '6:15 AM' },
                { value: 26, display: '6:30 AM' },
                { value: 27, display: '6:45 AM' },
                { value: 28, display: '7:00 AM' },
                { value: 29, display: '7:15 AM' },
                { value: 30, display: '7:30 AM' },
                { value: 31, display: '7:45 AM' },
                { value: 32, display: '8:00 AM' },
                { value: 33, display: '8:15 AM' },
                { value: 34, display: '8:30 AM' },
                { value: 35, display: '8:45 AM' },
                { value: 36, display: '9:00 AM' },
                { value: 37, display: '9:15 AM' },
                { value: 38, display: '9:30 AM' },
                { value: 39, display: '9:45 AM' },
                { value: 40, display: '10:00 AM' },
                { value: 41, display: '10:15 AM' },
                { value: 42, display: '10:30 AM' },
                { value: 43, display: '10:45 AM' },
                { value: 44, display: '11:00 AM' },
                { value: 45, display: '11:15 AM' },
                { value: 46, display: '11:30 AM' },
                { value: 47, display: '11:45 AM' },
                { value: 48, display: '12:00 PM' },
                { value: 49, display: '12:15 PM' },
                { value: 50, display: '12:30 PM' },
                { value: 51, display: '12:45 PM' },
                { value: 52, display: '1:00 PM' },
                { value: 53, display: '1:15 PM' },
                { value: 54, display: '1:30 PM' },
                { value: 55, display: '1:45 PM' },
                { value: 56, display: '2:00 PM' },
                { value: 57, display: '2:15 PM' },
                { value: 58, display: '2:30 PM' },
                { value: 59, display: '2:45 PM' },
                { value: 60, display: '3:00 PM' },
                { value: 61, display: '3:15 PM' },
                { value: 62, display: '3:30 PM' },
                { value: 63, display: '3:45 PM' },
                { value: 64, display: '4:00 PM' },
                { value: 65, display: '4:15 PM' },
                { value: 66, display: '4:30 PM' },
                { value: 67, display: '4:45 PM' },
                { value: 68, display: '5:00 PM' },
                { value: 69, display: '5:15 PM' },
                { value: 70, display: '5:30 PM' },
                { value: 71, display: '5:45 PM' },
                { value: 72, display: '6:00 PM' },
                { value: 73, display: '6:15 PM' },
                { value: 74, display: '6:30 PM' },
                { value: 75, display: '6:45 PM' },
                { value: 76, display: '7:00 PM' },
                { value: 77, display: '7:15 PM' },
                { value: 78, display: '7:30 PM' },
                { value: 79, display: '7:45 PM' },
                { value: 80, display: '8:00 PM' },
                { value: 81, display: '8:15 PM' },
                { value: 82, display: '8:30 PM' },
                { value: 83, display: '8:45 PM' },
                { value: 84, display: '9:00 PM' },
                { value: 85, display: '9:15 PM' },
                { value: 86, display: '9:30 PM' },
                { value: 87, display: '9:45 PM' },
                { value: 88, display: '10:00 PM' },
                { value: 89, display: '10:15 PM' },
                { value: 90, display: '10:30 PM' },
                { value: 91, display: '10:45 PM' },
                { value: 92, display: '11:00 PM' },
                { value: 93, display: '11:15 PM' },
                { value: 94, display: '11:30 PM' },
                { value: 95, display: '11:45 PM' }
            ]
        }

        public getCompany() {
            this.companiesService.getCompany(this.routeId).$promise.then((result) => {
                this.companyInfo = result;
            });
        }

        public selectDate() {
            this.formatDate = new Date(this.dateSelected);
            this.formatDate = new Date(this.formatDate.getTime() + this.timeToAdd * 60000);
        }

        public selectTime() {
            this.timeToAdd = 15 * this.timeSelected; //15
            this.selectDate();
        }

        public submitActivity() {
            let activityToSubmit = {
                startTime: null,
                type: null,
                content: null,
                dealId: null,
                contactId: null,
                submittedBy: null
            };

            activityToSubmit.startTime = this.formatDate;
            activityToSubmit.type = "Activity";
            activityToSubmit.content = this.activityContent;
            activityToSubmit.dealId = this.companyInfo.id;
            /*Temporary ContactId*/
            activityToSubmit.contactId = 1;
            /*Temporary SubmittedBy*/
            activityToSubmit.submittedBy = "Guven Agas";

            this.companyLogItemService.saveCompanyLogItem(activityToSubmit).then(() => {
                location.reload(false);
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
                console.log(this.validationErrors);
            });

        }
    }

    export class CompanyInfoTaskController {

        public startDateSelected;
        public endDateSelected;
        public routeId;
        public validationErrors;
        public statusSelected;
        public typeSelected;
        public assignedTo;
        public taskContent;
        public companyInfo;
        public myContacts;

        constructor(private $stateParams: ng.ui.IStateParamsService, private companiesService: MyApp.Services.CompaniesService, private companyLogItemService: MyApp.Services.CompanyLogItemService, private $location: ng.ILocationService, private $route: ng.route.IRouteService, private taskService: MyApp.Services.TaskService, private contactService: MyApp.Services.ContactService) {
            this.contactService.getAllContacts().then((result) => {
                this.myContacts = result.contacts;
                this.routeId = $stateParams["id"];
                this.getCompany();
                this.syncGoogleCalendar();
            });
        }

        public getCompany() {
            this.companiesService.getCompany(this.routeId).$promise.then((result) => {
                this.companyInfo = result;
            });
        }
        public syncGoogleCalendar() {
            this.companiesService.sendToGoogleCalendar().$promise.then((result) => { });

                
        }

        public submitTask() {
            let taskToSubmit = {
                startTime: null,
                endTime: null,
                type: null,
                content: null,
                companyId: null,
                contactId: null,
                submittedBy: null
            };

            taskToSubmit.startTime = new Date(this.startDateSelected);
            taskToSubmit.endTime = new Date(this.endDateSelected);
            taskToSubmit.type = "Task";
            taskToSubmit.content = this.taskContent;
            taskToSubmit.companyId = this.companyInfo.id;
            /*Temporary ContactId*/
            taskToSubmit.contactId = this.assignedTo;
            /*Temporary SubmittedBy*/
            taskToSubmit.submittedBy = "Guven Agas";
          
           return    this.companyLogItemService.saveCompanyLogItem(taskToSubmit).then((result) => {
                let formatTask = {
                    type: this.typeSelected,
                    startDate: this.startDateSelected,
                    dueDate: this.endDateSelected,
                    description: this.taskContent,
                    status: this.statusSelected,
                    dealId: this.companyInfo.id
                }

           return     this.taskService.saveTask(formatTask).then(() => {
                    location.reload(false);
                    
                })

            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
                console.log(this.validationErrors);
            });

        }
    }

    //export class CompanyInfoEventController {

    //}
}