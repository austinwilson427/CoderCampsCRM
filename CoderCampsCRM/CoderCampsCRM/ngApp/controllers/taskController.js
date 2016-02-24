var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var TaskListController = (function () {
            function TaskListController(taskService) {
                this.tasks = taskService.listTasks();
            }
            return TaskListController;
        })();
        Controllers.TaskListController = TaskListController;
        var TaskAddController = (function () {
            function TaskAddController(taskService, $location, $route, contactService, dealService, dealLogItemService) {
                this.taskService = taskService;
                this.$location = $location;
                this.$route = $route;
                this.contactService = contactService;
                this.dealService = dealService;
                this.dealLogItemService = dealLogItemService;
                this.getMyContacts();
                this.getMyDeals();
            }
            TaskAddController.prototype.getMyContacts = function () {
                var _this = this;
                this.contactService.getAllContacts().then(function (result) {
                    _this.myContacts = result;
                });
            };
            TaskAddController.prototype.getMyDeals = function () {
                var _this = this;
                this.dealService.listAllDealsOwned().$promise.then(function (result) {
                    _this.myDeals = result;
                    _this.dealService.listAllDealsShared().$promise.then(function (result_two) {
                        for (var i = 0; i < result_two.length; i++) {
                            _this.myDeals.push(result_two[i].deal);
                        }
                    });
                });
            };
            TaskAddController.prototype.addTask = function () {
                var _this = this;
                this.loaded = false;
                var dealLogItem = {
                    type: "Task",
                    startTime: this.taskToAdd.startDate,
                    endTime: this.taskToAdd.dueDate,
                    Content: this.taskToAdd.description,
                    ContactId: this.taskToAdd.contactId,
                    DealId: this.taskToAdd.dealId
                };
                this.taskService.saveTask(this.taskToAdd).then(function () {
                    _this.dealLogItemService.saveDealLogItem(dealLogItem).then(function () {
                        _this.loaded = true;
                        _this.$location.path("/tasks");
                    });
                });
            };
            TaskAddController.prototype.cancelAdd = function () {
                this.$location.path("/tasks");
            };
            return TaskAddController;
        })();
        Controllers.TaskAddController = TaskAddController;
        var TaskEditController = (function () {
            function TaskEditController(taskService, $location, $stateParams) {
                this.taskService = taskService;
                this.$location = $location;
                this.taskToEdit = this.taskService.getTask($stateParams["id"]);
            }
            TaskEditController.prototype.editTask = function () {
                var _this = this;
                this.taskService.saveTask(this.taskToEdit).then(function () {
                    _this.$location.path("/tasks");
                });
            };
            TaskEditController.prototype.cancelEdit = function () {
                this.$location.path("/tasks");
            };
            return TaskEditController;
        })();
        Controllers.TaskEditController = TaskEditController;
        var TaskDeleteController = (function () {
            function TaskDeleteController(taskService, $location, $stateParams) {
                this.taskService = taskService;
                this.$location = $location;
                this.taskToDelete = taskService.getTask($stateParams["id"]);
            }
            TaskDeleteController.prototype.deleteTask = function () {
                var _this = this;
                this.taskService.deleteTask(this.taskToDelete.id).then(function () { return _this.$location.path("/tasks"); });
            };
            TaskDeleteController.prototype.cancelDelete = function () {
                this.$location.path("/tasks");
            };
            return TaskDeleteController;
        })();
        Controllers.TaskDeleteController = TaskDeleteController;
        var AddTaskModal = (function () {
            function AddTaskModal(taskService, $location, $uibModalInstance, $route) {
                this.taskService = taskService;
                this.$location = $location;
                this.$uibModalInstance = $uibModalInstance;
                this.$route = $route;
            }
            AddTaskModal.prototype.addTask = function (taskToAdd) {
                var _this = this;
                console.log(taskToAdd);
                this.taskService.saveTask(taskToAdd).then(function () {
                    _this.closeModal();
                    _this.$location.path('/tasks');
                    _this.$route.reload();
                }).catch(function (error) {
                    var validationErrors = [];
                    for (var i in error.data.modelState) {
                        var errorMessage = error.data.modelState[i];
                        validationErrors = validationErrors.concat(errorMessage);
                    }
                    _this.validationErrors = validationErrors;
                });
            };
            AddTaskModal.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return AddTaskModal;
        })();
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
