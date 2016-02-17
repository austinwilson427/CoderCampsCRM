namespace MyApp.Controllers {

    export class DealsController {

        public allDeals;
        public allCompanyDeals;
        public sortName;
        public reverse;
        public menuDirectionName; public menuDirectionStage; public menuDirectionDate; public menuDirectionAmount;
        public menuDirectionOwner; public menuDirectionCompany;
        public dateFilter;
        public stageFilter;
        public searchPhrase;
        public minAmount; public maxAmount;
        public validationErrors;
        public showArchived;
        public editDeal;
        public dealsSelected;
        public isSelected;
        public showTrash;
        public sortOrder;
        public currentPage;
        public totalPages;
        public itemsPerPage;
        public pagesArray;
        public currentOrder;
        public showDeals;

        constructor(private dealService: MyApp.Services.DealService, private $uibModal: ng.ui.bootstrap.IModalService, private $location: ng.ILocationService, private $route: ng.route.IRouteService, private companiesService: MyApp.Services.CompaniesService) {
            this.searchPhrase = "";
            this.currentOrder = "name";
            this.currentPage = 1;
            this.itemsPerPage = 5;
            this.sortOrder = "ascending";
            this.stageFilter = 0;
            this.dealsSelected = [];
            this.showArchived = false;
            this.reverse = false;
            this.sortName = 'dealName';

            this.filterBySelection();
        }

        public filterBySelection() {

            let result = this.allDeals;

            this.dealService.listAllDeals().$promise.then((result) => {
                this.allDeals = [];
                let today = new Date();
                let today_num = today.setDate(today.getDate());
                let today_month = new Date().getMonth();
                let today_date = new Date().getDate();
                let today_year = new Date().getFullYear();
                let week_from_today = today.setDate(today.getDate() + 7);
                let month_from_today = today.setDate(today.getDate() + 24); //Adding 24 + 7 for 31 days
                let filteredDates = [];
                for (let i = 0; i < result.length; i++) {
                    let inner_full = new Date(result[i].closeDate);
                    let inner_full_num = inner_full.setDate(inner_full.getDate());
                    let inner_set = inner_full.setDate(inner_full.getDate());
                    let inner_month = new Date(result[i].closeDate).getMonth();
                    let inner_date = new Date(result[i].closeDate).getDate();
                    let inner_year = new Date(result[i].closeDate).getFullYear();

                    if (this.dateFilter == "today") {
                        if (today_month == inner_month && today_date == inner_date && today_year == inner_year) {
                            filteredDates.push(result[i]);
                        }
                    } else if (this.dateFilter == "week") {
                        console.log(result[i].closeDate + " " + inner_full_num);
                        console.log(today + " " + today_num);
                        if (inner_set < week_from_today && inner_full_num >= today_num) {
                            filteredDates.push(result[i]);
                        } else if (today_month == inner_month && today_date == inner_date && today_year == inner_year) {
                            filteredDates.push(result[i]);
                        }
                    } else if (this.dateFilter == "month") {
                        if (inner_set < month_from_today && inner_full_num >= today_num) {
                            filteredDates.push(result[i]);
                        } else if (today_month == inner_month && today_date == inner_date && today_year == inner_year) {
                            filteredDates.push(result[i]);
                        }
                    } else {
                        filteredDates.push(result[i]);
                    }

                }
                this.allDeals = filteredDates;

                let filteredAmounts = [];
                for (var i in this.allDeals) {

                    let minimumAmount = this.minAmount;
                    let maximumAmount = this.maxAmount;

                    if (minimumAmount == undefined) {
                        minimumAmount = 0;
                    }
                    if (maximumAmount == undefined || maximumAmount == 0) {
                        maximumAmount = 100000000000;
                    }

                    if (this.allDeals[i].amount > minimumAmount && this.allDeals[i].amount < maximumAmount) {
                        filteredAmounts.push(this.allDeals[i]);
                    }
                }

                this.allDeals = filteredAmounts;

                let filteredStages = [];
                for (var i in this.allDeals) {
                    if (this.stageFilter == 1 && this.allDeals[i].stage == "Appointment Scheduled") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 2 && this.allDeals[i].stage == "Qualified To Buy") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 3 && this.allDeals[i].stage == "Presentation Scheduled") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 4 && this.allDeals[i].stage == "Decision Maker Bought In") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 5 && this.allDeals[i].stage == "Contract Sent") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 6 && this.allDeals[i].stage == "Closed Won") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 7 && this.allDeals[i].stage == "Closed Lost") {
                        filteredStages.push(this.allDeals[i]);
                    } else if (this.stageFilter == 0) {
                        filteredStages.push(this.allDeals[i]);
                    }
                }
                this.allDeals = filteredStages;

                let itemsFiltered = this.allDeals;

                itemsFiltered.sort((a, b) => {
                    if (this.sortName == "amount" || this.sortName == "-amount") {
                        if (a.amount == b.amount) {
                            return 0;
                        }
                        else {
                            if (a.amount > b.amount) {
                                if (this.sortName == "amount") {
                                    return 1;
                                } else {
                                    return -1;
                                }

                            } else if (a.amount < b.amount) {
                                if (this.sortName == "amount") {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            }
                        }
                    } else if (this.sortName == "dealName" || this.sortName == "-dealName") {
                        if (a.dealName == b.dealName) {
                            return 0;
                        }
                        else {
                            if (a.dealName > b.dealName) {
                                if (this.sortName == "dealName") {
                                    return 1;
                                } else {
                                    return -1;
                                }

                            } else if (a.dealName < b.dealName) {
                                if (this.sortName == "dealName") {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            }
                        }
                    } else if (this.sortName == "stage" || this.sortName == "-stage") {
                        if (a.stage == b.stage) {
                            return 0;
                        }
                        else {
                            if (a.stage > b.stage) {
                                if (this.sortName == "stage") {
                                    return 1;
                                } else {
                                    return -1;
                                }

                            } else if (a.stage < b.stage) {
                                if (this.sortName == "stage") {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            }
                        }
                    } else if (this.sortName == "closeDate" || this.sortName == "-closeDate") {
                        if (a.closeDate == b.closeDate) {
                            return 0;
                        }
                        else {
                            if (a.closeDate > b.closeDate) {
                                if (this.sortName == "closeDate") {
                                    return 1;
                                } else {
                                    return -1;
                                }

                            } else if (a.closeDate < b.closeDate) {
                                if (this.sortName == "closeDate") {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            }
                        }
                    } else if (this.sortName == "dealOwner" || this.sortName == "-dealOwner") {
                        if (a.contact.name == b.contact.name) {
                            return 0;
                        }
                        else {
                            if (a.contact.name > b.contact.name) {
                                if (this.sortName == "dealOwner") {
                                    return 1;
                                } else {
                                    return -1;
                                }

                            } else if (a.contact.name < b.contact.name) {
                                if (this.sortName == "dealOwner") {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            }
                        }
                    } else if (this.sortName == "company" || this.sortName == "-company") {
                        if (a.company.companyName == b.company.companyName) {
                            return 0;
                        }
                        else {
                            if (a.company.companyName > b.company.companyName) {
                                if (this.sortName == "dealOwner") {
                                    return 1;
                                } else {
                                    return -1;
                                }

                            } else if (a.company.companyName < b.company.companyName) {
                                if (this.sortName == "dealOwner") {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            }
                        }
                    }

                });

                this.totalPages = Math.ceil(itemsFiltered.length / this.itemsPerPage);
                this.pagesArray = [];
                for (var j = 1; j <= this.totalPages; j++) {
                    this.pagesArray.push(j);
                }

                let itemPagFilter = [];
                let start = (this.currentPage - 1) * this.itemsPerPage;
                let end = start + this.itemsPerPage;
                console.log(start); console.log(end);
                for (let k = start; k < end; k++) {
                    if (!itemsFiltered[k]) {
                        break;
                    }
                    itemPagFilter[k] = itemsFiltered[k];
                }

                this.allDeals = itemPagFilter;

            });

        }

        public paginate(page) {
            this.currentPage = page;
            this.filterBySelection();
        }

        public assignClass(page) {
            if (page == this.currentPage) {
                return "active";
            }

            if (page == this.itemsPerPage) {
                return "active";
            }
        }

        public selectItems(items) {
            this.currentPage = 1;
            if (items != 'all') {
                this.itemsPerPage = items;
            } else {
                this.itemsPerPage = 1000000;
            }
            this.filterBySelection();
        }

        public assignDisabledPrev() {
            if (this.currentPage == 1) {
                return "disabled";
            }
        }

        public assignDisabledNext() {
            if (this.currentPage == this.totalPages) {
                return "disabled";
            }
        }

        public prevPage() {
            if (this.currentPage == 1) {
                return false;
            }
            this.currentPage--;
            this.filterBySelection();
        }

        public nextPage() {
            if (this.currentPage == this.totalPages) {
                return false;
            }
            this.currentPage++;
            this.filterBySelection();
        }

        public getAllItems() {

            this.dealService.listAllDeals().$promise.then((result) => {
                this.allDeals = [];
                let company;
                for (var i = 0; i < result.length; i++) {
                    //company = this.companiesService.getCompany(result[i].companyId);
                    //result[i].company = company;
                    this.allDeals.push(result[i]);
                }

            });
            
        }

        public sortBy(field) {
            this.currentPage = 1;
            this.sortName = field;
            this.menuDirectionName = this.toggleMenu(this.menuDirectionName, field, "dealName");
            this.menuDirectionStage = this.toggleMenu(this.menuDirectionStage, field, "stage");
            this.menuDirectionDate = this.toggleMenu(this.menuDirectionDate, field, "closeDate");
            this.menuDirectionAmount = this.toggleMenu(this.menuDirectionAmount, field, "amount");
            this.menuDirectionOwner = this.toggleMenu(this.menuDirectionOwner, field, "dealOwner");
            this.menuDirectionCompany = this.toggleMenu(this.menuDirectionCompany, field, "company");
            this.filterBySelection();
        }

        private toggleMenu(menuDirection, field, wantedField) {
            let returnDirection;
            if (menuDirection == "glyphicon glyphicon-menu-down" && field == wantedField) {
                returnDirection = "glyphicon glyphicon-menu-up";
                this.sortName = "-" + this.sortName;
            } else if (menuDirection == "glyphicon glyphicon-menu-up" && field == wantedField) {
                returnDirection = "glyphicon glyphicon-menu-down";
            } else if (menuDirection != "glyphicon glyphicon-menu-up" && menuDirection != "glyphicon glyphicon-menu-down" && field == wantedField) {
                returnDirection = "glyphicon glyphicon-menu-down";
            } else {
                returnDirection = "default_span";
            }
            return returnDirection;
        }

        public storeDeal(value) {
            if (value.key == true) {
                this.dealsSelected.push(value);
            } else if (value.key == false) {
                let dealsSelectedReset = [];
                for (let i in this.dealsSelected) {
                    if (this.dealsSelected[i] != value) {
                        dealsSelectedReset.push(this.dealsSelected[i]);
                    }
                }
                this.dealsSelected = dealsSelectedReset;
            }

            if (this.dealsSelected.length > 0) {
                this.showTrash = true;
            } else {
                this.showTrash = false;
            }
        }

        public archiveDeal(dealToArchive) {

            this.dealService.saveDeal(dealToArchive).then(() => {
                this.$route.reload();
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });

        }

        public addDealModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/add-deal.html',
                controller: AddDealModal,
                controllerAs: 'vm',
                size: "deal"
            });
        }

        public editDealModal(dealToAdd) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/edit-deal.html',
                controller: EditDealModal,
                controllerAs: 'vm',
                resolve: {
                    dealDetails: () => dealToAdd
                },
                size: "deal"
            });
        }

        public deleteDealModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/delete-deal.html',
                controller: DeleteDealModal,
                controllerAs: 'vm',
                resolve: {
                    dealsToDelete: () => this.dealsSelected
                },
                size: "deal"
            });
        }

        public archiveDealModal() {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/modals/archive-deal.html',
                controller: ArchiveDealModal,
                controllerAs: 'vm',
                resolve: {
                    dealsToArchive: () => this.dealsSelected
                },
                size: "deal"
            });
        }

        public unarchiveItem(dealToUnarchive) {
            dealToUnarchive.isArchived = false;
            this.dealService.saveDeal(dealToUnarchive).then(() => {
                this.$route.reload();
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

    class AddDealModal {

        public validationErrors;
        public myContacts;
        public myCompanies;

        constructor(private dealService: MyApp.Services.DealService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private $route: ng.route.IRouteService, private contactService: MyApp.Services.ContactService, private companiesService: MyApp.Services.CompaniesService) {
            this.getMyContacts();
            this.getMyCompanies();
        }

        public getMyContacts() {
            this.contactService.getAllContacts().$promise.then((result) => {
                this.myContacts = result;
            });
        }

        public getMyCompanies() {
            this.companiesService.getCompanies().$promise.then((result) => {
                this.myCompanies = result;
            });
        }

        public addDeal(dealToAdd) {
            console.log(dealToAdd);
            this.dealService.saveDeal(dealToAdd).then(() => {
                this.closeModal();
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

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }

    class EditDealModal {

        public validationErrors;
        public myCompanies;

        constructor(private dealService: MyApp.Services.DealService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, public dealDetails, private $route: ng.route.IRouteService, private companiesService: MyApp.Services.CompaniesService) {
            this.getMyCompanies();
            this.dealDetails.closeDate = new Date(this.dealDetails.closeDate);
        }

        public getMyCompanies() {
            this.companiesService.getCompanies().$promise.then((result) => {
                this.myCompanies = result;
            });
        }

        public editDeal() {
            console.log(this.dealDetails);
            this.dealService.saveDeal(this.dealDetails).then(() => {
                this.closeModal();
                location.reload();
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }

    class DeleteDealModal {
        public validationErrors;
        public dealsToDeleteLength;

        constructor(private dealService: MyApp.Services.DealService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, public dealsToDelete, private $route: ng.route.IRouteService) {
            this.dealsToDeleteLength = dealsToDelete.length;
            console.log(this.dealsToDelete);

        }

        public deleteDeal() {
            let finalDeal;
            for (let i = 0; i < this.dealsToDelete.length; i++) {
                if (i == this.dealsToDelete.length - 1) {
                    finalDeal = this.dealsToDelete[i];
                    break;
                }
                this.dealService.deleteDeal(this.dealsToDelete[i].id);
            }

            this.dealService.deleteDeal(finalDeal.id).then(() => {
                this.closeModal();
                this.$location.path('/deals');
                this.$route.reload();
            }).catch((error) => {
                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }

    class ArchiveDealModal {
        public validationErrors;
        public dealsToArchiveLength;

        constructor(private dealService: MyApp.Services.DealService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, public dealsToArchive, private $route: ng.route.IRouteService) {
            this.dealsToArchiveLength = dealsToArchive.length;
            console.log(this.dealsToArchive);

        }

        public archiveDeal() {
            let finalDeal;
            for (let i = 0; i < this.dealsToArchive.length; i++) {
                if (i == this.dealsToArchive.length - 1) {
                    finalDeal = this.dealsToArchive[i];
                    finalDeal.isArchived = true;
                    break;
                }
                this.dealsToArchive[i].isArchived = true;
                this.dealService.saveDeal(this.dealsToArchive[i]);
            }

            this.dealService.saveDeal(finalDeal).then(() => {
                this.closeModal();
                this.$route.reload();
            }).catch((error) => {
                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }

    export class DealTableViewController {

        public stages;
        public draggableObjects;
        public droppedObjects1;
        public droppedObjects2;
        public droppedObjects3;
        public droppedObjects4;
        public droppedObjects5;
        public allDeals;
        public validationErrors;

        constructor(private dealService: MyApp.Services.DealService, private $stateParams: angular.ui.IStateParamsService, private $location: ng.ILocationService) {

            this.stages = ["Appointment Scheduled", "Qualified to Buy", "Presentation Scheduled", "Decision Maker Bought In", "Contract Sent"];

            this.getAllItems();
        }

        public getAllItems() {

            this.dealService.listAllDeals().$promise.then((result) => {
                this.allDeals = [];
                let company;
                for (var i = 0; i < result.length; i++) {
                    this.allDeals.push(result[i]);
                }
                this.draggableObjects = this.allDeals;
                this.droppedObjects1 = this.draggableObjects;
                this.droppedObjects2 = this.draggableObjects;
                this.droppedObjects3 = this.draggableObjects;
                this.droppedObjects4 = this.draggableObjects;
                this.droppedObjects5 = this.draggableObjects;
            });
        }

        public editDeal(dealToAdd) {
            console.log(dealToAdd);
            this.dealService.saveDeal(dealToAdd).then(() => {
                //location.reload(false);
            }).catch((error) => {

                let validationErrors = [];
                for (let i in error.data.modelState) {
                    let errorMessage = error.data.modelState[i];
                    validationErrors = validationErrors.concat(errorMessage);
                }
                this.validationErrors = validationErrors;
            });
        }

        public onDropComplete1(data, evt) {
            console.log(data);
            let index = this.droppedObjects1.indexOf(data);
            data.stage = "Appointment Scheduled";
            if (index == -1) {
                this.droppedObjects1.push(data);
                this.editDeal(data);
            }
        }

        public onDragSuccess1(data, evt) {
            var index = this.droppedObjects1.indexOf(data);
            if (index != -1) {
                this.droppedObjects1.splice(index, 1);
            }
        }
        public onDropComplete2(data, evt) {
            console.log(data);
            let index = this.droppedObjects2.indexOf(data);
            data.stage = "Qualified to Buy";
            if (index == -1) {
                this.droppedObjects2.push(data);
                this.editDeal(data);
            }
        }

        public onDragSuccess2(data, evt) {
            var index = this.droppedObjects2.indexOf(data);
            if (index != -1) {
                this.droppedObjects2.splice(index, 1);
            }
        }

        public onDropComplete3(data, evt) {
            console.log(data);
            let index = this.droppedObjects3.indexOf(data);
            data.stage = "Presentation Scheduled";
            if (index == -1) {
                this.droppedObjects3.push(data);
                this.editDeal(data);
            }
        }

        public onDragSuccess3(data, evt) {
            var index = this.droppedObjects3.indexOf(data);
            if (index != -1) {
                this.droppedObjects3.splice(index, 1);
            }
        }

        public onDropComplete4(data, evt) {
            console.log(data);
            let index = this.droppedObjects4.indexOf(data);
            data.stage = "Decision Maker Bought In";
            if (index == -1) {
                this.droppedObjects4.push(data);
                this.editDeal(data);
            }
        }

        public onDragSuccess4(data, evt) {
            var index = this.droppedObjects4.indexOf(data);
            if (index != -1) {
                this.droppedObjects4.splice(index, 1);
            }
        }

        public onDropComplete5(data, evt) {
            console.log(data);
            let index = this.droppedObjects5.indexOf(data);
            data.stage = "Contract Sent";
            if (index == -1) {
                this.droppedObjects5.push(data);
                this.editDeal(data);
            }
        }

        public onDragSuccess5(data, evt) {
            var index = this.droppedObjects5.indexOf(data);
            if (index != -1) {
                this.droppedObjects5.splice(index, 1);
            }
        }

        public getData(data, element) {
            let showOverlay = angular.element(document.querySelector('.overlay'));
            showOverlay.addClass('show');
        }

        public hideOverlay(element) {
            var hideOverlay = angular.element(document.querySelector('.overlay'));
            hideOverlay.removeClass('show');
        }
    }

    export class DealChartsController {

        public data;
        public options;
        public allDeals;
        public qtbCount;
        public asCount;
        public psCount;
        public dmbiCount;
        public csCount;
        public myJson;

        constructor(private dealService: MyApp.Services.DealService) {

            this.dealService.listAllDeals().$promise.then((result) => {
                console.log(result);
                let qualifiedToBuy = [];
                let appointmentScheduled = [];
                let presentationScheduled = [];
                let decisionMakerBoughtIn = [];
                let contractSent = [];
                for (var i = 0; i < result.length; i++) {
                    if (result[i].stage == "Qualified to Buy") {
                        qualifiedToBuy.push(result[i]);
                    } else if (result[i].stage == "Appointment Scheduled") {
                        appointmentScheduled.push(result[i]);
                    } else if (result[i].stage == "Presentation Scheduled") {
                        presentationScheduled.push(result[i]);
                    } else if (result[i].stage == "Decision Maker Bought In") {
                        decisionMakerBoughtIn.push(result[i]);
                    } else if (result[i].stage == "Contract Sent") {
                        contractSent.push(result[i]);
                    }
                }
                this.qtbCount = qualifiedToBuy.length;
                this.asCount = appointmentScheduled.length;
                this.psCount = presentationScheduled.length;
                this.dmbiCount = decisionMakerBoughtIn.length;
                this.csCount = contractSent.length;

                this.myJson = {
                    globals: {
                        shadow: false,
                        fontFamily: "Verdana",
                        fontWeight: "100"
                    },
                    type: "pie",
                    backgroundColor: "#fff",
                    //legend: {
                    //    "item": {
                    //        "font-size": "16px"
                    //    },
                        
                    //    "background-color": "#0A64A4"
                        
                    //},
                    tooltip: {
                        text: "%v requests"
                    },
                    plot: {
                        refAngle: "-90",
                        borderWidth: "2px",
                        valueBox: {
                            placement: "in",
                            text: "%npv %",
                            fontSize: "15px",
                            textAlpha: 1,
                        }
                    },
                    series: [
                        {
                            text: "Qualified to Buy",
                            values: [this.qtbCount],
                            backgroundColor: "red",
                        },
                        {
                            text: "Appointment Scheduled",
                            values: [this.asCount],
                            backgroundColor: "blue"
                        }, {
                            text: "Presentation Scheduled",
                            values: [this.psCount],
                            backgroundColor: "green"
                        }, {
                            text: "Decision Maker Bought In",
                            values: [this.dmbiCount],
                            backgroundColor: "#28C2D1"
                        }, {
                            text: "Contract Sent",
                            values: [this.csCount],
                            backgroundColor: "#D2D6DE",
                        }]
                };
            });

        }



    }
}