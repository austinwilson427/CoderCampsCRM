namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.DealContacts", "ContactEmail", c => c.String());
            DropColumn("dbo.DealLogItems", "TaskId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.DealLogItems", "TaskId", c => c.Int());
            DropColumn("dbo.DealContacts", "ContactEmail");
            DropColumn("dbo.AspNetUsers", "IsActive");
        }
    }
}
