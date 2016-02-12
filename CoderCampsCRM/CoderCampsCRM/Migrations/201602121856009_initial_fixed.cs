namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial_fixed : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            AddColumn("dbo.DealLogItems", "SubmittedBy", c => c.String());
            AddColumn("dbo.Deals", "ApplicationUser_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.UserTasks", "ApplicationUser_Id", c => c.String(maxLength: 128));
            AlterColumn("dbo.DealLogItems", "DealId", c => c.Int());
            CreateIndex("dbo.Deals", "ApplicationUser_Id");
            CreateIndex("dbo.UserTasks", "ApplicationUser_Id");
            CreateIndex("dbo.DealLogItems", "DealId");
            AddForeignKey("dbo.Deals", "ApplicationUser_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.UserTasks", "ApplicationUser_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropForeignKey("dbo.UserTasks", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Deals", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            DropIndex("dbo.UserTasks", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Deals", new[] { "ApplicationUser_Id" });
            AlterColumn("dbo.DealLogItems", "DealId", c => c.Int(nullable: false));
            DropColumn("dbo.UserTasks", "ApplicationUser_Id");
            DropColumn("dbo.Deals", "ApplicationUser_Id");
            DropColumn("dbo.DealLogItems", "SubmittedBy");
            CreateIndex("dbo.DealLogItems", "DealId");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
        }
    }
}
