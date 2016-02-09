namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Deals", "DealOwnerId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Deals", "CompanyId", "dbo.Companies");
            DropIndex("dbo.Deals", new[] { "DealOwnerId" });
            DropIndex("dbo.Deals", new[] { "CompanyId" });
            AddColumn("dbo.DealLogItems", "ContactId", c => c.Int());
            AddColumn("dbo.Deals", "ContactId", c => c.Int());
            AlterColumn("dbo.Deals", "CompanyId", c => c.Int());
            CreateIndex("dbo.Deals", "ContactId");
            CreateIndex("dbo.Deals", "CompanyId");
            AddForeignKey("dbo.Deals", "ContactId", "dbo.Contacts", "Id");
            AddForeignKey("dbo.Deals", "CompanyId", "dbo.Companies", "Id");
            DropColumn("dbo.DealLogItems", "AssignedToUserId");
            DropColumn("dbo.Deals", "DealOwnerId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Deals", "DealOwnerId", c => c.String(maxLength: 128));
            AddColumn("dbo.DealLogItems", "AssignedToUserId", c => c.Int());
            DropForeignKey("dbo.Deals", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Deals", "ContactId", "dbo.Contacts");
            DropIndex("dbo.Deals", new[] { "CompanyId" });
            DropIndex("dbo.Deals", new[] { "ContactId" });
            AlterColumn("dbo.Deals", "CompanyId", c => c.Int(nullable: false));
            DropColumn("dbo.Deals", "ContactId");
            DropColumn("dbo.DealLogItems", "ContactId");
            CreateIndex("dbo.Deals", "CompanyId");
            CreateIndex("dbo.Deals", "DealOwnerId");
            AddForeignKey("dbo.Deals", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Deals", "DealOwnerId", "dbo.AspNetUsers", "Id");
        }
    }
}
