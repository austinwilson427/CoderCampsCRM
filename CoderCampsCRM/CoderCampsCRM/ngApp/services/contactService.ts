namespace MyApp.Services {

    export class ContactService {

        public contactResource;
        public interactionResource;

        constructor(private $resource: ng.resource.IResourceService) {
            this.contactResource = $resource("/api/contacts");
            this.interactionResource = $resource("/api/interactions");
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

        public addInteraction(interaction) {
            return this.interactionResource.save().$promise;
        }
    }
    angular.module("MyApp").service("contactService", ContactService);
}