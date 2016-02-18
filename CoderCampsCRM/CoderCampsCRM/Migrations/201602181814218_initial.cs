namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserTasks", "ContactId", c => c.Int());
            CreateIndex("dbo.UserTasks", "ContactId");
            AddForeignKey("dbo.UserTasks", "ContactId", "dbo.Contacts", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserTasks", "ContactId", "dbo.Contacts");
            DropIndex("dbo.UserTasks", new[] { "ContactId" });
            DropColumn("dbo.UserTasks", "ContactId");
        }
    }
}
