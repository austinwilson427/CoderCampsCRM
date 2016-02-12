namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Changing_Company : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            AddColumn("dbo.UserTasks", "DealId", c => c.Int());
            AddColumn("dbo.DealLogItems", "SubmittedBy", c => c.String());
            AlterColumn("dbo.DealLogItems", "DealId", c => c.Int());
            CreateIndex("dbo.DealLogItems", "DealId");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            AlterColumn("dbo.DealLogItems", "DealId", c => c.Int(nullable: false));
            DropColumn("dbo.DealLogItems", "SubmittedBy");
            DropColumn("dbo.UserTasks", "DealId");
            CreateIndex("dbo.DealLogItems", "DealId");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
        }
    }
}
