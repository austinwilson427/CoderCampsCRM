namespace MyApp.Services {

    export class TaskService {
        private taskResource;



        constructor(private $resource: ng.resource.IResourceService) {
            this.taskResource = $resource('/api/tasks/:id');
        }

        public listTasks() {
            return this.taskResource.query();
        }

        public getTasks() {
            return this.taskResource.query();
        }

        public getTask(id) {
            return this.taskResource.get({ id: id });
        }

        public saveTask(score) {
            return this.taskResource.save(score).$promise;
        }
        public deleteTask(id: number) {
            return this.taskResource.delete({ Id: id }).$promise;
        }

    }
    angular.module("MyApp").service("taskService", TaskService);
}