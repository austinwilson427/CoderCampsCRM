namespace MyApp.Services {

    export class ContactService {

        public contactResource;
        public interactionResource;
        public contactDetailResource;
        public contactListResource;
        public contactFilterResource;
        public locationResource;
        public googleContactResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.contactResource = $resource("/api/contactList");
            this.interactionResource = $resource("/api/interactions");
            this.contactDetailResource = $resource("/api/contactDetailView/:id");
            this.contactListResource = $resource("/api/contactListView");
            this.locationResource = $resource("/api/locations");
            this.contactFilterResource = $resource("/api/contactFilterView/:id");
            this.googleContactResource = $resource("/api/contactList/:id");
        }

        public filterContacts(companyId: number, dealId: number, taskId: number) {
            let vm: any = {};
            vm.companyId = companyId;
            vm.dealId = dealId;
            vm.taskId = taskId;
            let data = this.contactFilterResource.save(vm);
            data.$promise.then(() => {
                for (let contact of data.contacts) {
                    contact.lastInteraction = new Date(Date.parse(contact.lastInteraction));
                }
            });
            return data.$promise;
        }
        //////////////Google Contacts /////////
        public getGoogleContacts() {
            let data = this.googleContactResource.query().$promise;
            return data; 
        };


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