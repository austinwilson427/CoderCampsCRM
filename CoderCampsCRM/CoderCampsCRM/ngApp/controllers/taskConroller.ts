namespace MyApp.Controllers {



    export class TaskListController {
        public tasks;
        public search: string; //For Search Box

        constructor(taskService: MyApp.Services.TaskService) {
            this.tasks = taskService.listTasks();
        }

    }

    export class TaskAddController {
        public loaded;
        public taskToAdd;
        constructor(private taskService: MyApp.Services.TaskService, private $location: ng.ILocationService) {
        }


        addScore() {
            this.loaded = false;
            this.taskService.saveTask(this.taskToAdd).then(() => {
                this.loaded = true;
                this.$location.path("/tasks")
            });

        }

        cancelAdd() {
            this.$location.path("/tasks");
        }
    }

    export class TaskEditController {
        public taskToEdit;

        constructor(private taskService: MyApp.Services.TaskService, private $location: ng.ILocationService, $routeParams: ng.route.IRouteParamsService) {

            this.taskToEdit = this.taskService.getTask($routeParams["id"]);
        }

        editScore() {
            this.taskService.saveTask(this.taskToEdit).then(() => {
                this.$location.path("/tasks")
            });
        }

        cancelEdit() {
            this.$location.path("/tasks");
        }
    }

    export class TaskDeleteController {
        public taskToDelete;

        constructor(private taskService: MyApp.Services.TaskService, private $location: ng.ILocationService, $routeParams: ng.route.IRouteParamsService) {
            this.taskToDelete = taskService.getTask($routeParams["id"]);
        }

        deleteTask() {
            this.taskService.deleteTask(this.taskToDelete.id).then(() => this.$location.path("/tasks"));
        }

        cancelDelete() {
            this.$location.path("/tasks");
        }
    }
}