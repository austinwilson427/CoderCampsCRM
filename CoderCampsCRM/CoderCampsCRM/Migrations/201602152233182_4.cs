namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _4 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Deals", "DealContact_Id", "dbo.DealContacts");
            DropForeignKey("dbo.UserTasks", "TaskContact_Id", "dbo.TaskContacts");
            DropIndex("dbo.Deals", new[] { "DealContact_Id" });
            DropIndex("dbo.UserTasks", new[] { "TaskContact_Id" });
            CreateIndex("dbo.DealContacts", "DealId");
            CreateIndex("dbo.TaskContacts", "TaskId");
            AddForeignKey("dbo.DealContacts", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
            AddForeignKey("dbo.TaskContacts", "TaskId", "dbo.UserTasks", "Id", cascadeDelete: true);
            DropColumn("dbo.Deals", "DealContact_Id");
            DropColumn("dbo.UserTasks", "TaskContact_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserTasks", "TaskContact_Id", c => c.Int());
            AddColumn("dbo.Deals", "DealContact_Id", c => c.Int());
            DropForeignKey("dbo.TaskContacts", "TaskId", "dbo.UserTasks");
            DropForeignKey("dbo.DealContacts", "DealId", "dbo.Deals");
            DropIndex("dbo.TaskContacts", new[] { "TaskId" });
            DropIndex("dbo.DealContacts", new[] { "DealId" });
            CreateIndex("dbo.UserTasks", "TaskContact_Id");
            CreateIndex("dbo.Deals", "DealContact_Id");
            AddForeignKey("dbo.UserTasks", "TaskContact_Id", "dbo.TaskContacts", "Id");
            AddForeignKey("dbo.Deals", "DealContact_Id", "dbo.DealContacts", "Id");
        }
    }
}
