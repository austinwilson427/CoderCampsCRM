namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.DealLogItems", "ContactId", c => c.Int());
            AddColumn("dbo.Deals", "ContactId", c => c.Int());
            AlterColumn("dbo.Deals", "CompanyId", c => c.Int());
            CreateIndex("dbo.DealLogItems", "ContactId");
            CreateIndex("dbo.DealLogItems", "DealId");
            CreateIndex("dbo.Deals", "ContactId");
            CreateIndex("dbo.Deals", "CompanyId");
            AddForeignKey("dbo.DealLogItems", "ContactId", "dbo.Contacts", "Id");
            AddForeignKey("dbo.Deals", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.Deals", "ContactId", "dbo.Contacts", "Id");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
            DropColumn("dbo.DealLogItems", "AssignedToUserId");
            DropColumn("dbo.Deals", "DealOwnerId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Deals", "DealOwnerId", c => c.Int(nullable: false));
            AddColumn("dbo.DealLogItems", "AssignedToUserId", c => c.Int());
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropForeignKey("dbo.Deals", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Deals", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.DealLogItems", "ContactId", "dbo.Contacts");
            DropIndex("dbo.Deals", new[] { "CompanyId" });
            DropIndex("dbo.Deals", new[] { "ContactId" });
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            DropIndex("dbo.DealLogItems", new[] { "ContactId" });
            AlterColumn("dbo.Deals", "CompanyId", c => c.Int(nullable: false));
            DropColumn("dbo.Deals", "ContactId");
            DropColumn("dbo.DealLogItems", "ContactId");
        }
    }
}
