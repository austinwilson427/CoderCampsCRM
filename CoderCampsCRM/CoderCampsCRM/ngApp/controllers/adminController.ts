namespace MyApp.Controllers {

    export class AdminController {

        public users;
        public sortType = 'firstName';
        public sortReverse = false;

        public constructor(private adminService: MyApp.Services.AdminService) {
            this.users = this.adminService.getUserResource();
        }
    }
}