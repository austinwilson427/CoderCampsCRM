namespace MyApp.Services {

    export class ContactService {

        public contactResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.contactResource = $resource("/api/contactResource");
        }

        public getAllContacts() {
            return this.contactResource.query();
        }

        public getOneContact(id: number) {
            return this.contactResource.get({ id: id });
        }

        public addContact(contact) {
            return this.contactResource.save().$promise;
        }

        public deleteContact(id: number) {
            return this.contactResource.remove({ id: id }).$promise;
        }
    }
    angular.module("MyApp").service("contactService", ContactService);
}