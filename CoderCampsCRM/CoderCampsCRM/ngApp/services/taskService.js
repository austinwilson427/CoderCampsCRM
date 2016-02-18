var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var TaskService = (function () {
            function TaskService($resource) {
                this.$resource = $resource;
                this.taskResource = $resource('/api/tasks/:id');
            }
            TaskService.prototype.listTasks = function () {
                return this.taskResource.query();
            };
            TaskService.prototype.getTask = function (id) {
                return this.taskResource.get({ id: id });
            };
            TaskService.prototype.saveTask = function (task) {
                return this.taskResource.save(task).$promise;
            };
            TaskService.prototype.deleteTask = function (id) {
                return this.taskResource.delete({ Id: id }).$promise;
            };
            return TaskService;
        })();
        Services.TaskService = TaskService;
        angular.module("MyApp").service("taskService", TaskService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
