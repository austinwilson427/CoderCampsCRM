namespace MyApp.Controllers {



    export class TaskListController {
        public tasks;
        public search: string; //Search Box string

        constructor(taskService: MyApp.Services.TaskService) {
            this.tasks = taskService.listTasks();
        }


    }

    export class TaskAddController {
        public loaded;
        public taskToAdd;
        public validationErrors;
        public myContacts;
        public myCompanies;

        constructor(private taskService: MyApp.Services.TaskService, private $location: ng.ILocationService, private $route: ng.route.IRouteService, private contactService: MyApp.Services.ContactService) {
            //this.getContacts();
            
        }

        //public getMyContacts() {
        //    this.contactService.getAllContacts().$promise.then((result) => {
        //        this.myContacts = result;
        //    });
        //}

        addTask() {
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

        constructor(private taskService: MyApp.Services.TaskService, private $location: ng.ILocationService, $stateParams: ng.route.IRouteParamsService) {

            this.taskToEdit = this.taskService.getTask($stateParams["id"]);
        }

        editTask() {
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

        constructor(private taskService: MyApp.Services.TaskService, private $location: ng.ILocationService, $stateParams: ng.route.IRouteParamsService) {
            this.taskToDelete = taskService.getTask($stateParams["id"]);
        }

        deleteTask() {
            this.taskService.deleteTask(this.taskToDelete.id).then(() => this.$location.path("/tasks"));
        }

        cancelDelete() {
            this.$location.path("/tasks");
        }
    }


    class AddTaskModal {

        public validationErrors;

        constructor(private taskService: MyApp.Services.TaskService, private $location: ng.ILocationService, private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private $route: ng.route.IRouteService) { }

        public addTask(taskToAdd) {
            console.log(taskToAdd);
            this.taskService.saveTask(taskToAdd).then(() => {
                this.closeModal();
                this.$location.path('/tasks');
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
}