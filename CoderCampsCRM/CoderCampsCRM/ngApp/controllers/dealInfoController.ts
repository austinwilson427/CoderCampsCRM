namespace MyApp.Controllers {

    export class DealInfoController {

        public myCompanies;
        public routeId;
        public dealInfo;
        public company;
        public dealLogItems;
        public dealContacts;
        public allContacts;
        public contactToAdd;
        public sharerToAdd;
        public dealSharers;
        public allRemainingSharers;
        public appointmentScheduled; public qualifiedToBuy; public presentationScheduled;
        public decisionMaker; public contractSent; public closedWon; public closedLost; public appointmentScheduledGlow; public qualifiedToBuyGlow; public presentationScheduledGlow; public decisionMakerGlow; public contractSentGlow; public closedWonGlow; public closedLostGlow;
        public myContactsAll;
        public isEditReady;

        constructor(private dealService: MyApp.Services.DealService, private $stateParams: ng.ui.IStateParamsService, private dealLogItemService: MyApp.Services.DealLogItemService, private dealContactService: MyApp.Services.DealContactService, private contactService: MyApp.Services.ContactService, private $route: ng.route.IRouteService, private $location: ng.ILocationService, private companiesService: MyApp.Services.CompaniesService) {
            this.isEditReady = false;
            this.routeId = $stateParams["id"];

            this.getDealOwned();
            this.getDealShared();

            this.getDealLogItemsByRouteId();
            this.getContactsByDealId();
            this.getSharersByDealId();
            this.getMyContacts();
            this.getMyCompanies();
        }

        public editState() {
            this.isEditReady = true;
        }

        public saveDeal() {
            console.log(this.dealInfo);
            this.dealService.saveDeal(this.dealInfo).then(() => {
                this.isEditReady = false;
                this.getDealOwned();
                this.getDealShared();
            });
        }

        public getDealShared() {
            this.dealService.getDealsSharedByDealId(this.routeId).$promise.then((result) => {
                this.dealInfo = result;
                this.dealInfo.closeDate = new Date(this.dealInfo.closeDate);
                this.company = result.company;
                let stage = this.dealInfo.stage;
                this.findAndSetStage(stage);
            });
        }

        public getDealOwned() {
            this.dealService.getDealsOwnedByDealId(this.routeId).$promise.then((result) => {
                this.dealInfo = result;
                this.dealInfo.closeDate = new Date(this.dealInfo.closeDate);
                this.company = result.company;
                let stage = this.dealInfo.stage;
                this.findAndSetStage(stage);
            });
        }

        public findAndSetStage(stage) {
            if (stage == "Appointment Scheduled") {
                this.appointmentScheduled = true;
                this.qualifiedToBuy = false;
                this.presentationScheduled = false;
                this.decisionMaker = false;
                this.contractSent = false;
                this.closedWon = false;
                this.closedLost = false;
                this.appointmentScheduledGlow = true;
                this.qualifiedToBuyGlow = false;
                this.presentationScheduledGlow = false;
                this.decisionMakerGlow = false;
                this.contractSentGlow = false;
                this.closedWonGlow = false;
                this.closedLostGlow = false;
            } else if (stage == "Qualified to Buy") {
                this.appointmentScheduled = false;
                this.qualifiedToBuy = true;
                this.presentationScheduled = false;
                this.decisionMaker = false;
                this.contractSent = false;
                this.closedWon = false;
                this.closedLost = false;
                this.appointmentScheduledGlow = true;
                this.qualifiedToBuyGlow = true;
                this.presentationScheduledGlow = false;
                this.decisionMakerGlow = false;
                this.contractSentGlow = false;
                this.closedWonGlow = false;
                this.closedLostGlow = false;
            } else if (stage == "Presentation Scheduled") {
                this.appointmentScheduled = false;
                this.qualifiedToBuy = false;
                this.presentationScheduled = true;
                this.decisionMaker = false;
                this.contractSent = false;
                this.closedWon = false;
                this.closedLost = false;
                this.appointmentScheduledGlow = true;
                this.qualifiedToBuyGlow = true;
                this.presentationScheduledGlow = true;
                this.decisionMakerGlow = false;
                this.contractSentGlow = false;
                this.closedWonGlow = false;
                this.closedLostGlow = false;
            } else if (stage == "Decision Maker Bought In") {
                this.appointmentScheduled = false;
                this.qualifiedToBuy = false;
                this.presentationScheduled = false;
                this.decisionMaker = true;
                this.contractSent = false;
                this.closedWon = false;
                this.closedLost = false;
                this.appointmentScheduledGlow = true;
                this.qualifiedToBuyGlow = true;
                this.presentationScheduledGlow = true;
                this.decisionMakerGlow = true;
                this.contractSentGlow = false;
                this.closedWonGlow = false;
                this.closedLostGlow = false;
            } else if (stage == "Contract Sent") {
                this.appointmentScheduled = false;
                this.qualifiedToBuy = false;
                this.presentationScheduled = false;
                this.decisionMaker = false;
                this.contractSent = true;
                this.closedWon = false;
                this.closedLost = false;
                this.appointmentScheduledGlow = true;
                this.qualifiedToBuyGlow = true;
                this.presentationScheduledGlow = true;
                this.decisionMakerGlow = true;
                this.contractSentGlow = true;
                this.closedWonGlow = false;
                this.closedLostGlow = false;
            } else if (stage == "Closed Won") {
                this.appointmentScheduled = false;
                this.qualifiedToBuy = false;
                this.presentationScheduled = false;
                this.decisionMaker = false;
                this.contractSent = false;
                this.closedWon = true;
                this.closedLost = false;
                this.appointmentScheduledGlow = true;
                this.qualifiedToBuyGlow = true;
                this.presentationScheduledGlow = true;
                this.decisionMakerGlow = true;
                this.contractSentGlow = true;
                this.closedWonGlow = true;
                this.closedLostGlow = false;
            } else if (stage == "Closed Lost") {
                this.appointmentScheduled = false;
                this.qualifiedToBuy = false;
                this.presentationScheduled = false;
                this.decisionMaker = false;
                this.contractSent = false;
                this.closedWon = false;
                this.closedLost = true;
                this.appointmentScheduledGlow = false;
                this.qualifiedToBuyGlow = false;
                this.presentationScheduledGlow = false;
                this.decisionMakerGlow = false;
                this.contractSentGlow = false;
                this.closedWonGlow = false;
                this.closedLostGlow = true;
            }
        }

        public getDealLogItemsByRouteId() {
            this.dealLogItemService.listDealLogItemsByDealId(this.routeId).$promise.then((result) => {
                this.dealLogItems = result;
            });
        }

        public getContactsByDealId() {

            this.dealContactService.getAllDealContactsByDealId(this.routeId).$promise.then((result) => {
                this.dealContacts = result;
                this.contactService.getAllContacts().then((result) => {
                    this.allContacts = result;
                    for (var i = 0; i < this.dealContacts.length; i++) {
                        for (var j = 0; j < this.allContacts.contacts.length; j++) {
                            if (this.allContacts.contacts[j].id == this.dealContacts[i].contactId) {
                                this.allContacts.contacts.splice(j, 1);
                            }
                        }
                    }
                });
            });

        }

        public getSharersByDealId() {
            this.dealContactService.getAllDealSharersByDealId(this.routeId).$promise.then((result) => {
                console.log(result);
                this.dealSharers = result;
                this.contactService.getAllContacts().then((result) => {
                    this.allRemainingSharers = result;
                    for (var i = 0; i < this.dealSharers.length; i++) {
                        for (var j = 0; j < this.allRemainingSharers.contacts.length; j++) {
                            if (this.allRemainingSharers.contacts[j].id == this.dealSharers[i].contactId) {
                                this.allRemainingSharers.contacts.splice(j, 1);
                            }
                        }
                    }
                });
            });
        }

        public getMyContacts() {
                this.contactService.getAllContacts().then((result) => {
                    this.myContactsAll = result;
                });
        }

        public getMyCompanies() {
            this.companiesService.getCompanies().$promise.then((result) => {
                this.myCompanies = result;
            });
        }

        public addDealContact(remaining) {
            let dealContactToAdd = {
                dealId: null,
                contactId: null,
                isDealSharer: false,
                contactEmail: null
            }
            dealContactToAdd.dealId = this.routeId;
            dealContactToAdd.contactId = this.contactToAdd.id;
            dealContactToAdd.contactEmail = this.contactToAdd.email;
            this.dealContactService.saveDealContact(dealContactToAdd).then((result) => {
                this.getContactsByDealId();
            });

        }

        public addShareholderContact() {
            let dealContactToAdd = {
                dealId: null,
                contactId: null,
                isDealSharer: true,
                contactEmail: null
            }
            dealContactToAdd.dealId = this.routeId;
            dealContactToAdd.contactId = this.sharerToAdd.id;
            dealContactToAdd.contactEmail = this.sharerToAdd.email;
            console.log(dealContactToAdd);
            this.dealContactService.saveDealContact(dealContactToAdd).then((result) => {
                this.getSharersByDealId();
            });
        }

        public deleteDealContact(id) {
            this.dealContactService.deleteDealContact(id).then((result) => {
                this.contactToAdd = null;
                this.getContactsByDealId();
            });
        }

        public deleteShareContact(id) {
            this.dealContactService.deleteDealContact(id).then((result) => {
                this.sharerToAdd = null;
                this.getSharersByDealId();
            });
        }

        public editStage(stage) {

            let dealInfoToSave = {
                amount: this.dealInfo.amount,
                closeDate: this.dealInfo.closeDate,
                companyId: this.dealInfo.companyId,
                contactId: this.dealInfo.contactId,
                createdOn: this.dealInfo.createdOn,
                dealName: this.dealInfo.dealName,
                id: this.dealInfo.id,
                isArchived: this.dealInfo.isArchived,
                stage: stage
            }

            if (dealInfoToSave.id != 0) {
                this.dealService.saveDeal(dealInfoToSave).then(() => {
                    this.getDealOwned();
                    this.getDealShared();
                });
            }


        }
    }

    export class DealInfoNoteController {

        public noteContent;
        public routeId;
        public dealInfo;
        public company;
        public validationErrors;

        constructor(private $stateParams: ng.ui.IStateParamsService, private dealService: MyApp.Services.DealService, private dealLogItemService: MyApp.Services.DealLogItemService, private $location: ng.ILocationService, private $route: ng.route.IRouteService) {
            this.routeId = $stateParams["id"];
            this.getDealShared();
            this.getDeal();
        }

        public getDealShared() {
            this.dealService.getDealsSharedByDealId(this.routeId).$promise.then((result) => {
                this.dealInfo = result;
                this.company = result.company;
            });
        }

        public getDeal() {
            this.dealService.getDealsOwnedByDealId(this.routeId).$promise.then((result) => {
                this.dealInfo = result;
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
            noteToSubmit.dealId = this.dealInfo.id;

            this.dealLogItemService.saveDealLogItem(noteToSubmit).then(() => {
                location.reload(false);
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });

        }



    }

    export class DealInfoActivityController {
        public dateSelected;
        public timeSelected;
        public formatDate;
        public timeObject;
        public timeToAdd;
        public activityContent;
        public routeId;
        public dealInfo;
        public validationErrors;
        public company;

        constructor(private $stateParams: ng.ui.IStateParamsService, private dealService: MyApp.Services.DealService, private dealLogItemService: MyApp.Services.DealLogItemService, private $location: ng.ILocationService, private $route: ng.route.IRouteService) {
            this.formatDate = new Date();
            this.timeSelected = 48;
            this.timeToAdd = 720;
            this.routeId = $stateParams["id"];
            this.getDealShared();
            this.getDeal();
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

        public getDealShared() {
            this.dealService.getDealsSharedByDealId(this.routeId).$promise.then((result) => {
                this.dealInfo = result;
                this.company = result.company;
            });
        }

        public getDeal() {
            this.dealService.getDealsOwnedByDealId(this.routeId).$promise.then((result) => {
                this.dealInfo = result;
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
            activityToSubmit.dealId = this.dealInfo.id;

            this.dealLogItemService.saveDealLogItem(activityToSubmit).then(() => {
                location.reload(false);
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });

        }
    }

    export class DealInfoTaskController {

        public startDateSelected;
        public endDateSelected;
        public routeId;
        public validationErrors;
        public statusSelected;
        public typeSelected;
        public assignedTo;
        public taskContent;
        public dealInfo;
        public myContacts;
        public company;

        constructor(private $stateParams: ng.ui.IStateParamsService, private dealService: MyApp.Services.DealService, private dealLogItemService: MyApp.Services.DealLogItemService, private $location: ng.ILocationService, private $route: ng.route.IRouteService, private taskService: MyApp.Services.TaskService, private contactService: MyApp.Services.ContactService) {
            this.contactService.getAllContacts().then((result) => {
                this.myContacts = result.contacts;
                this.routeId = $stateParams["id"];
                this.getDealShared();
                this.getDeal();
            });
        }

        public getDealShared() {
            this.dealService.getDealsSharedByDealId(this.routeId).$promise.then((result) => {
                this.dealInfo = result;
                this.company = result.company;
            });
        }

        public getDeal() {
            this.dealService.getDealsOwnedByDealId(this.routeId).$promise.then((result) => {
                this.dealInfo = result;
            });
        }

        public submitTask() {
            let taskToSubmit = {
                startTime: null,
                endTime: null,
                type: null,
                content: null,
                dealId: null,
                contactId: null,
                submittedBy: null
            };

            taskToSubmit.startTime = new Date(this.startDateSelected);
            taskToSubmit.endTime = new Date(this.endDateSelected);
            taskToSubmit.type = "Task";
            taskToSubmit.content = this.taskContent;
            taskToSubmit.dealId = this.dealInfo.id;
            /*Temporary ContactId*/
            taskToSubmit.contactId = this.assignedTo;

            this.dealLogItemService.saveDealLogItem(taskToSubmit).then((result) => {
                let formatTask = {
                    type: this.typeSelected,
                    startDate: this.startDateSelected,
                    dueDate: this.endDateSelected,
                    description: this.taskContent,
                    status: this.statusSelected,
                    dealId: this.dealInfo.id,
                    contactId: this.assignedTo
                }

                this.taskService.saveTask(formatTask).then(() => {
                    location.reload(false);
                })

            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });

        }
    }

    export class DealInfoEventController {

    }
}