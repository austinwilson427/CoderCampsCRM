namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.DealLogItems", "AssignedToUserId", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.DealLogItems", "AssignedToUserId");
        }
    }
}
