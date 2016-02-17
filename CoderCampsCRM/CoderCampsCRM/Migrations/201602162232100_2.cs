namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _2 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Locations", "CoordsFormat");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Locations", "CoordsFormat", c => c.String());
        }
    }
}
