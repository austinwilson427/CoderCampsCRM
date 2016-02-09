namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial2 : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.DealLogItems", "DealId");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
        }
    }
}
