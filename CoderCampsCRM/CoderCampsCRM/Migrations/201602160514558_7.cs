namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _7 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Locations", "CoordsFormat", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Locations", "CoordsFormat");
        }
    }
}
