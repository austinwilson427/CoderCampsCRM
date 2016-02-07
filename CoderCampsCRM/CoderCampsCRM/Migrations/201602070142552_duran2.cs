namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class duran2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contacts", "JobTitle", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Contacts", "JobTitle");
        }
    }
}
