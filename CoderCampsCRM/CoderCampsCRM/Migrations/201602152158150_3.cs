namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Deals", "DealContact_Id", c => c.Int());
            AddColumn("dbo.UserTasks", "TaskContact_Id", c => c.Int());
            CreateIndex("dbo.Deals", "DealContact_Id");
            CreateIndex("dbo.UserTasks", "TaskContact_Id");
            AddForeignKey("dbo.Deals", "DealContact_Id", "dbo.DealContacts", "Id");
            AddForeignKey("dbo.UserTasks", "TaskContact_Id", "dbo.TaskContacts", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserTasks", "TaskContact_Id", "dbo.TaskContacts");
            DropForeignKey("dbo.Deals", "DealContact_Id", "dbo.DealContacts");
            DropIndex("dbo.UserTasks", new[] { "TaskContact_Id" });
            DropIndex("dbo.Deals", new[] { "DealContact_Id" });
            DropColumn("dbo.UserTasks", "TaskContact_Id");
            DropColumn("dbo.Deals", "DealContact_Id");
        }
    }
}
