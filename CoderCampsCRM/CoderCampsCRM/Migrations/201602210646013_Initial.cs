namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contacts", "ImageUrl", c => c.String());
            DropColumn("dbo.UserTasks", "GoogleId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserTasks", "GoogleId", c => c.String());
            DropColumn("dbo.Contacts", "ImageUrl");
        }
    }
}
