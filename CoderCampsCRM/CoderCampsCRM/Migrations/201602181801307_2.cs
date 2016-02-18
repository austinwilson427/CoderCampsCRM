namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _2 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Companies", name: "ApplicationUser_Id1", newName: "UserId");
            RenameColumn(table: "dbo.Deals", name: "ApplicationUser_Id", newName: "UserId");
            RenameColumn(table: "dbo.UserTasks", name: "ApplicationUser_Id", newName: "UserId");
            RenameIndex(table: "dbo.Companies", name: "IX_ApplicationUser_Id1", newName: "IX_UserId");
            RenameIndex(table: "dbo.Deals", name: "IX_ApplicationUser_Id", newName: "IX_UserId");
            RenameIndex(table: "dbo.UserTasks", name: "IX_ApplicationUser_Id", newName: "IX_UserId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.UserTasks", name: "IX_UserId", newName: "IX_ApplicationUser_Id");
            RenameIndex(table: "dbo.Deals", name: "IX_UserId", newName: "IX_ApplicationUser_Id");
            RenameIndex(table: "dbo.Companies", name: "IX_UserId", newName: "IX_ApplicationUser_Id1");
            RenameColumn(table: "dbo.UserTasks", name: "UserId", newName: "ApplicationUser_Id");
            RenameColumn(table: "dbo.Deals", name: "UserId", newName: "ApplicationUser_Id");
            RenameColumn(table: "dbo.Companies", name: "UserId", newName: "ApplicationUser_Id1");
        }
    }
}
