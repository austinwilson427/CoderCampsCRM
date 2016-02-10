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
            function TaskAddController(taskService, $location) {
                this.taskService = taskService;
                this.$location = $location;
            }
            TaskAddController.prototype.addTask = function () {
                var _this = this;
                this.loaded = false;
                this.taskService.saveTask(this.taskToAdd).then(function () {
                    _this.loaded = true;
                    _this.$location.path("/tasks");
                });
            };
            TaskAddController.prototype.cancelAdd = function () {
                this.$location.path("/tasks");
            };
            return TaskAddController;
        })();
        Controllers.TaskAddController = TaskAddController;
        var TaskEditController = (function () {
            function TaskEditController(taskService, $location, $routeParams) {
                this.taskService = taskService;
                this.$location = $location;
                this.taskToEdit = this.taskService.getTask($routeParams["id"]);
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
            function TaskDeleteController(taskService, $location, $routeParams) {
                this.taskService = taskService;
                this.$location = $location;
                this.taskToDelete = taskService.getTask($routeParams["id"]);
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
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
