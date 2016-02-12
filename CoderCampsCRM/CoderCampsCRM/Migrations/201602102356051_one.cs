namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class one : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Contacts", "CompanyId", "dbo.Companies");
            DropIndex("dbo.Contacts", new[] { "CompanyId" });
            AddColumn("dbo.Companies", "ApplicationUser_Id", c => c.String());
            AddColumn("dbo.Companies", "ApplicationUser_Id1", c => c.String(maxLength: 128));
            AddColumn("dbo.DealLogItems", "ContactId", c => c.Int());
            AddColumn("dbo.Deals", "ContactId", c => c.Int());
            AlterColumn("dbo.Contacts", "CompanyId", c => c.Int());
            AlterColumn("dbo.Deals", "CompanyId", c => c.Int());
            CreateIndex("dbo.Companies", "ApplicationUser_Id1");
            CreateIndex("dbo.Contacts", "CompanyId");
            CreateIndex("dbo.DealLogItems", "ContactId");
            CreateIndex("dbo.DealLogItems", "DealId");
            CreateIndex("dbo.Deals", "ContactId");
            CreateIndex("dbo.Deals", "CompanyId");
            AddForeignKey("dbo.Companies", "ApplicationUser_Id1", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.DealLogItems", "ContactId", "dbo.Contacts", "Id");
            AddForeignKey("dbo.Deals", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.Deals", "ContactId", "dbo.Contacts", "Id");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Contacts", "CompanyId", "dbo.Companies", "Id");
            DropColumn("dbo.DealLogItems", "AssignedToUserId");
            DropColumn("dbo.Deals", "DealOwnerId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Deals", "DealOwnerId", c => c.Int(nullable: false));
            AddColumn("dbo.DealLogItems", "AssignedToUserId", c => c.Int());
            DropForeignKey("dbo.Contacts", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropForeignKey("dbo.Deals", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Deals", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.DealLogItems", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Companies", "ApplicationUser_Id1", "dbo.AspNetUsers");
            DropIndex("dbo.Deals", new[] { "CompanyId" });
            DropIndex("dbo.Deals", new[] { "ContactId" });
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            DropIndex("dbo.DealLogItems", new[] { "ContactId" });
            DropIndex("dbo.Contacts", new[] { "CompanyId" });
            DropIndex("dbo.Companies", new[] { "ApplicationUser_Id1" });
            AlterColumn("dbo.Deals", "CompanyId", c => c.Int(nullable: false));
            AlterColumn("dbo.Contacts", "CompanyId", c => c.Int(nullable: false));
            DropColumn("dbo.Deals", "ContactId");
            DropColumn("dbo.DealLogItems", "ContactId");
            DropColumn("dbo.Companies", "ApplicationUser_Id1");
            DropColumn("dbo.Companies", "ApplicationUser_Id");
            CreateIndex("dbo.Contacts", "CompanyId");
            AddForeignKey("dbo.Contacts", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
        }
    }
}
