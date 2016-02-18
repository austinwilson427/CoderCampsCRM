namespace MyApp.Services {

    export class ContactService {

        public contactResource;
        public interactionResource;
        public contactDetailResource;
        public contactListResource;
        public contactFilterResource;
        public locationResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.contactResource = $resource("/api/contactList");
            this.interactionResource = $resource("/api/interactions");
            this.contactDetailResource = $resource("/api/contactDetailView/:id");
            this.contactListResource = $resource("/api/contactListView");
            this.locationResource = $resource("/api/locations");
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
            let data = this.contactFilterResource.filterByCompanies({ id: id });
            data.$promise.then(() => {
                for (let contact of data.contacts) {
                    contact.lastInteraction = new Date(Date.parse(contact.lastInteraction));
                }
            });
            return data.$promise;
        }

        public filterByDeals(id: number) {
            let data = this.contactFilterResource.filterByDeals({ id: id });
            data.$promise.then(() => {
                for (let contact of data.contacts) {
                    contact.lastInteraction = new Date(Date.parse(contact.lastInteraction));
                }
            });
            return data.$promise;
        }

        public filterByTasks(id: number) {
            let data = this.contactFilterResource.filterByTasks({ id: id });
            data.$promise.then(() => {
                for (let contact of data.contacts) {
                    contact.lastInteraction = new Date(Date.parse(contact.lastInteraction));
                }
            });
            return data.$promise;
        }

        public getAllContacts() {
            let data = this.contactListResource.get();
            data.$promise.then(() => {
                for (let contact of data.contacts) {
                    contact.lastInteraction = new Date(Date.parse(contact.lastInteraction));
                }
            });
            return data.$promise;
        }

        public getOneContact(id: number) {
            let data = this.contactDetailResource.get({ id: id });
            data.$promise.then(() => {
                for (let interaction of data.interactions) {
                    interaction.date = new Date(Date.parse(interaction.date));
                }
            });
            return data;
        }

        public addLocation(location) {
            return this.locationResource.save(location).$promise;
        }

        public addContact(contact) {
            return this.contactResource.save(contact).$promise;
        }

        public editContact(contact) {
            debugger;
            let data = this.contactResource.save(contact).$promise;
            return data;
        }

        public deleteContact(id: number) {
            let data = this.contactResource.remove({ id: id }).$promise;
            return data;
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