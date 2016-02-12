namespace MyApp.Services {

    export class ContactService {

        public contactResource;
        public interactionResource;
        public contactDetailResource;
        public contactListResource;
        public contactFilterResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.contactResource = $resource("/api/contactList");
            this.interactionResource = $resource("/api/interactions");
            this.contactDetailResource = $resource("/api/contactDetailView/:id");
            this.contactListResource = $resource("/api/contactListView");
            this.contactFilterResource = $resource("/api/contactFilterView/:id", null, {
                filterByCompanies: {
                    method: 'GET',
                    url: '/api/contactFilterView/filterByCompanies/:id',
                    isArray: false
                },
                filterByDeals: {
                    method: 'GET',
                    url: '/api/contactFilterView/filterByDeals/:id',
                    isArray: false
                },
                filterByTasks: {
                    method: 'GET',
                    url: '/api/contactFilterView/filterByTasks/:id',
                    isArray: false
                }
            });
        }

        public filterByCompanies(id: number) {
            return this.contactFilterResource.filterByCompanies({ id: id }).$promise;
        }

        public filterByDeals(id: number) {
            return this.contactFilterResource.filterByDeals({ id: id }).$promise;
        }

        public filterByTasks(id: number) {
            return this.contactFilterResource.filterByTasks({ id: id }).$promise;
        }

        public getAllContacts() {
            return this.contactListResource.get();
        }

        public getOneContact(id: number) {
            return this.contactDetailResource.get({ id: id });
        }

        public addContact(contact) {
            return this.contactResource.save(contact).$promise;
        }

        public editContact(contact) {
            return this.contactResource.save(contact);
        }

        public deleteContact(id: number) {
            return this.contactResource.remove({ id: id }).$promise;
        }

        public addInteraction(interaction) {
            return this.interactionResource.save(interaction).$promise;
        }

        public deleteInteraction(id: number) {
            return this.interactionResource.remove({ id: id }).$promise;
        }
    }
    angular.module("MyApp").service("contactService", ContactService);
}