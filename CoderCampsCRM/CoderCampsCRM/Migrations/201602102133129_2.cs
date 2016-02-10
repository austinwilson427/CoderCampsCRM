namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contacts", "Country", c => c.String());
            AddColumn("dbo.Contacts", "City", c => c.String());
            AddColumn("dbo.Contacts", "State", c => c.String());
            AddColumn("dbo.Contacts", "Zip", c => c.String());
            AddColumn("dbo.Contacts", "StreetAddress", c => c.String());
            AddColumn("dbo.Contacts", "LastInteraction", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Contacts", "LastInteraction");
            DropColumn("dbo.Contacts", "StreetAddress");
            DropColumn("dbo.Contacts", "Zip");
            DropColumn("dbo.Contacts", "State");
            DropColumn("dbo.Contacts", "City");
            DropColumn("dbo.Contacts", "Country");
        }
    }
}
