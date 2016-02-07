namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class duran3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contacts", "Name", c => c.String());
            AddColumn("dbo.Contacts", "Email", c => c.String());
            AddColumn("dbo.Contacts", "PhoneNumber", c => c.String());
            DropColumn("dbo.Contacts", "FirstName");
            DropColumn("dbo.Contacts", "LastName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contacts", "LastName", c => c.String());
            AddColumn("dbo.Contacts", "FirstName", c => c.String());
            DropColumn("dbo.Contacts", "PhoneNumber");
            DropColumn("dbo.Contacts", "Email");
            DropColumn("dbo.Contacts", "Name");
        }
    }
}
