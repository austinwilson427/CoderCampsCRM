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
        public myDeals;

        constructor(private taskService: MyApp.Services.TaskService, private $location: ng.ILocationService, private $route: ng.route.IRouteService, private contactService: MyApp.Services.ContactService, private dealService: MyApp.Services.DealService, private dealLogItemService: MyApp.Services.DealLogItemService) {
            this.getMyContacts();
            this.getMyDeals();
        }

        public getMyContacts() {
            this.contactService.getAllContacts().then((result) => {
                this.myContacts = result;
            });
        }

        public getMyDeals() {
            this.dealService.listAllDealsOwned().$promise.then((result) => {
                this.myDeals = result;
                this.dealService.listAllDealsShared().$promise.then((result_two) => {
                    for (var i = 0; i < result_two.length; i++) {
                        this.myDeals.push(result_two[i].deal);
                    }
                });
            });
        }

        addTask() {
            this.loaded = false;

            let dealLogItem = {
                type: "Task",
                startTime: this.taskToAdd.startDate,
                endTime: this.taskToAdd.dueDate,
                Content: this.taskToAdd.description,
                ContactId: this.taskToAdd.contactId,
                DealId: this.taskToAdd.dealId
            };

            this.taskService.saveTask(this.taskToAdd).then(() => {
                this.dealLogItemService.saveDealLogItem(dealLogItem).then(() => {
                    this.loaded = true;
                    this.$location.path("/tasks")
                })

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