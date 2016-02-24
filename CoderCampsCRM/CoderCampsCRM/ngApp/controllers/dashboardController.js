var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var DashboardController = (function () {
            function DashboardController(dashboardService, $uibModal) {
                this.dashboardService = dashboardService;
                this.$uibModal = $uibModal;
                this.monthlyQuota = 0;
                this.countCompleted = 0;
                this.countCalls = 0;
                this.countEmails = 0;
                this.countMeetings = 0;
                this.allActivity = [];
                this.getAllDetails();
            }
            DashboardController.prototype.getAllContacts = function () {
                var _this = this;
                this.dashboardService.listAllContactsForUser().$promise.then(function (result) {
                    _this.totalContacts = result.length;
                    for (var i = 0; i < result.length; i++) {
                        var contactDetails = {
                            id: null,
                            category: null,
                            name: null,
                            createdOn: null,
                            dueBy: null
                        };
                        contactDetails.id = result[i].id;
                        contactDetails.category = "contact";
                        contactDetails.name = result[i].name;
                        contactDetails.createdOn = result[i].createdOn;
                        _this.allActivity.push(contactDetails);
                    }
                });
            };
            DashboardController.prototype.getAllCompanies = function () {
                var _this = this;
                this.dashboardService.listAllCompaniesForUser().$promise.then(function (result) {
                    _this.totalCompanies = result.length;
                    for (var i = 0; i < result.length; i++) {
                        var contactDetails = {
                            id: null,
                            category: null,
                            name: null,
                            createdOn: null,
                            dueBy: null
                        };
                        contactDetails.id = result[i].id;
                        contactDetails.category = "company";
                        contactDetails.name = result[i].companyName;
                        contactDetails.createdOn = result[i].companyCreateDate;
                        _this.allActivity.push(contactDetails);
                    }
                });
            };
            DashboardController.prototype.getAllDeals = function () {
                var _this = this;
                this.dashboardService.listAllDealsForUser().$promise.then(function (result) {
                    _this.totalDeals = 0;
                    _this.weightedTotal = 0;
                    for (var i = 0; i < result.length; i++) {
                        var contactDetails = {
                            id: null,
                            category: null,
                            name: null,
                            createdOn: null,
                            dueBy: null
                        };
                        var currentDate = new Date();
                        var currentMonth = currentDate.getMonth();
                        var myDate = new Date(result[i].closeDate);
                        var month = myDate.getMonth();
                        if (currentMonth == month && result[i].isArchived == false) {
                            if (result[i].stage == "Appointment Scheduled") {
                                _this.weightedTotal += result[i].amount * .2;
                            }
                            else if (result[i].stage == "Qualified to Buy") {
                                _this.weightedTotal += result[i].amount * .4;
                            }
                            else if (result[i].stage == "Presentation Scheduled") {
                                _this.weightedTotal += result[i].amount * .6;
                            }
                            else if (result[i].stage == "Decision Maker Bought In") {
                                _this.weightedTotal += result[i].amount * .8;
                            }
                            else if (result[i].stage == "Contract Sent" || result[i].stage == "Closed Won") {
                                _this.weightedTotal += result[i].amount * 1;
                            }
                            else if (result[i].stage == "Closed Lost") {
                            }
                        }
                        if (result[i].isArchived == false) {
                            _this.totalDeals++;
                        }
                        contactDetails.id = result[i].id;
                        contactDetails.category = "deal";
                        contactDetails.name = result[i].dealName;
                        contactDetails.createdOn = result[i].createdOn;
                        _this.allActivity.push(contactDetails);
                    }
                    _this.getAllQuotas();
                });
            };
            DashboardController.prototype.getAllTasks = function () {
                var _this = this;
                this.dashboardService.listAllTasksForUser().$promise.then(function (result) {
                    _this.totalTasks = result.length;
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].type == "Phonecall") {
                            _this.countCalls++;
                        }
                        else if (result[i].type == "Email") {
                            _this.countEmails++;
                        }
                        else if (result[i].type == "Meeting") {
                            _this.countMeetings++;
                        }
                        if (result[i].status == "Completed") {
                            _this.countCompleted++;
                        }
                        var contactDetails = {
                            id: null,
                            category: null,
                            name: null,
                            createdOn: null,
                            dueBy: null
                        };
                        contactDetails.id = result[i].id;
                        contactDetails.category = "task";
                        contactDetails.name = result[i].type;
                        contactDetails.createdOn = result[i].createdOn;
                        contactDetails.dueBy = result[i].dueDate;
                        _this.allActivity.push(contactDetails);
                    }
                });
            };
            DashboardController.prototype.getAllQuotas = function () {
                var _this = this;
                this.dashboardService.listAllQuotasForUser().$promise.then(function (result) {
                    var currentDate = new Date();
                    var currentMonth = currentDate.getMonth();
                    var currentYear = currentDate.getFullYear();
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].month == currentMonth && result[i].year == currentYear) {
                            _this.quotaDetails = result[i];
                            _this.monthlyQuota = result[i].quotaSet;
                            _this.percentComplete = Math.round(10000 * _this.weightedTotal / _this.monthlyQuota) / 100;
                            break;
                        }
                    }
                });
            };
            DashboardController.prototype.getAllDetails = function () {
                this.getAllContacts();
                this.getAllCompanies();
                this.getAllDeals();
                this.getAllTasks();
            };
            DashboardController.prototype.showQuotaModal = function () {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/modals/quotaModal.html',
                    controller: QuotaModal,
                    controllerAs: 'vm',
                    resolve: {
                        quotaDetails: function () { return _this.quotaDetails; },
                        monthlyQuota: function () { return _this.monthlyQuota; }
                    },
                    size: "deal"
                });
            };
            return DashboardController;
        })();
        Controllers.DashboardController = DashboardController;
        var QuotaModal = (function () {
            function QuotaModal(quotaDetails, monthlyQuota, $uibModalInstance, dashboardService) {
                this.quotaDetails = quotaDetails;
                this.monthlyQuota = monthlyQuota;
                this.$uibModalInstance = $uibModalInstance;
                this.dashboardService = dashboardService;
                this.quotaSet = monthlyQuota;
            }
            QuotaModal.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            QuotaModal.prototype.saveQuota = function () {
                var _this = this;
                var currentDate = new Date();
                var currentMonth = currentDate.getMonth();
                var currentYear = currentDate.getFullYear();
                if (this.quotaDetails == undefined) {
                    this.quotaDetails = {
                        month: currentMonth,
                        year: currentYear,
                        quotaSet: this.quotaSet
                    };
                }
                else {
                    this.quotaDetails.quotaSet = this.quotaSet;
                }
                this.dashboardService.saveQuota(this.quotaDetails).then(function (result) {
                    _this.closeModal();
                    location.reload(false);
                });
            };
            return QuotaModal;
        })();
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
