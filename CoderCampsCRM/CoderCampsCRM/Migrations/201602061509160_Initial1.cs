namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Deals", "DealOwnerId", c => c.Int(nullable: false));
            DropColumn("dbo.Deals", "DealOwner");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Deals", "DealOwner", c => c.String());
            DropColumn("dbo.Deals", "DealOwnerId");
        }
    }
}
