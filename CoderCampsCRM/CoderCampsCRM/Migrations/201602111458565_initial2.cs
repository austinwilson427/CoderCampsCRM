namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            AlterColumn("dbo.DealLogItems", "DealId", c => c.Int());
            CreateIndex("dbo.DealLogItems", "DealId");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            AlterColumn("dbo.DealLogItems", "DealId", c => c.Int(nullable: false));
            CreateIndex("dbo.DealLogItems", "DealId");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
        }
    }
}
