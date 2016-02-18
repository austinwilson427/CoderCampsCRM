namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CompanyLogItems", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.CompanyLogItems", "DealId", "dbo.Deals");
            DropIndex("dbo.CompanyLogItems", new[] { "ContactId" });
            DropIndex("dbo.CompanyLogItems", new[] { "DealId" });
            RenameColumn(table: "dbo.CompanyLogItems", name: "CompanyId", newName: "Company_Id");
            RenameIndex(table: "dbo.CompanyLogItems", name: "IX_CompanyId", newName: "IX_Company_Id");
            AddColumn("dbo.UserTasks", "ContactId", c => c.Int());
            AddColumn("dbo.UserTasks", "Company_Id", c => c.Int());
            CreateIndex("dbo.UserTasks", "ContactId");
            CreateIndex("dbo.UserTasks", "Company_Id");
            AddForeignKey("dbo.UserTasks", "ContactId", "dbo.Contacts", "Id");
            AddForeignKey("dbo.UserTasks", "Company_Id", "dbo.Companies", "Id");
            DropColumn("dbo.CompanyLogItems", "ContactId");
            DropColumn("dbo.CompanyLogItems", "DealId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CompanyLogItems", "DealId", c => c.Int());
            AddColumn("dbo.CompanyLogItems", "ContactId", c => c.Int());
            DropForeignKey("dbo.UserTasks", "Company_Id", "dbo.Companies");
            DropForeignKey("dbo.UserTasks", "ContactId", "dbo.Contacts");
            DropIndex("dbo.UserTasks", new[] { "Company_Id" });
            DropIndex("dbo.UserTasks", new[] { "ContactId" });
            DropColumn("dbo.UserTasks", "Company_Id");
            DropColumn("dbo.UserTasks", "ContactId");
            RenameIndex(table: "dbo.CompanyLogItems", name: "IX_Company_Id", newName: "IX_CompanyId");
            RenameColumn(table: "dbo.CompanyLogItems", name: "Company_Id", newName: "CompanyId");
            CreateIndex("dbo.CompanyLogItems", "DealId");
            CreateIndex("dbo.CompanyLogItems", "ContactId");
            AddForeignKey("dbo.CompanyLogItems", "DealId", "dbo.Deals", "Id");
            AddForeignKey("dbo.CompanyLogItems", "ContactId", "dbo.Contacts", "Id");
        }
    }
}
