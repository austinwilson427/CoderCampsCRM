namespace MyApp.Controllers {

    export class AdminController {

        public users;
        public sortType;
        public sortReverse = false;
        public currentPage = 1;
        public maxSize = 10;
        public itemsPerPage = 10;
        public totalItems;
        public searchText;

        public constructor(private adminService: MyApp.Services.AdminService) {
            let usersGet = this.adminService.getUserResource().then((result) => {
                this.users = result;
                this.totalItems = result.length;
            });            
        }
    }
}