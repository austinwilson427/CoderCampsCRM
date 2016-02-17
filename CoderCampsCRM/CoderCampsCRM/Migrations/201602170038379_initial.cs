namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Locations", "CoordsFormat", c => c.String());
            DropColumn("dbo.Contacts", "Notes");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contacts", "Notes", c => c.String());
            DropColumn("dbo.Locations", "CoordsFormat");
        }
    }
}
