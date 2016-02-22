namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ExternalLoginDatas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        Key = c.String(),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Quotas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(maxLength: 128),
                        QuotaSet = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Month = c.Int(nullable: false),
                        Year = c.Int(nullable: false),
                        CreatedOn = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.UserId);
            
            AddColumn("dbo.Contacts", "GoogleId", c => c.String());
            AddColumn("dbo.Contacts", "ImagerUrl", c => c.String());
            AddColumn("dbo.Contacts", "ImageUrl", c => c.String());
            AddColumn("dbo.Contacts", "CreatedOn", c => c.DateTime());
            AddColumn("dbo.Deals", "CreatedOn", c => c.DateTime());
            AddColumn("dbo.UserTasks", "CreatedOn", c => c.DateTime());
            AddColumn("dbo.CompanyLogItems", "CreatedOn", c => c.DateTime());
            AddColumn("dbo.ContactInteractions", "CreatedOn", c => c.DateTime());
            AddColumn("dbo.DealContacts", "isDealSharer", c => c.Boolean(nullable: false));
            AddColumn("dbo.DealContacts", "UserId", c => c.String(maxLength: 128));
            AddColumn("dbo.DealContacts", "CreatedOn", c => c.DateTime());
            AddColumn("dbo.DealLogItems", "UserId", c => c.String(maxLength: 128));
            AddColumn("dbo.DealLogItems", "CreatedOn", c => c.DateTime());
            CreateIndex("dbo.DealContacts", "UserId");
            CreateIndex("dbo.DealLogItems", "UserId");
            AddForeignKey("dbo.DealContacts", "UserId", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.DealLogItems", "UserId", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Quotas", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.DealLogItems", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.DealContacts", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.Quotas", new[] { "UserId" });
            DropIndex("dbo.DealLogItems", new[] { "UserId" });
            DropIndex("dbo.DealContacts", new[] { "UserId" });
            DropColumn("dbo.DealLogItems", "CreatedOn");
            DropColumn("dbo.DealLogItems", "UserId");
            DropColumn("dbo.DealContacts", "CreatedOn");
            DropColumn("dbo.DealContacts", "UserId");
            DropColumn("dbo.DealContacts", "isDealSharer");
            DropColumn("dbo.ContactInteractions", "CreatedOn");
            DropColumn("dbo.CompanyLogItems", "CreatedOn");
            DropColumn("dbo.UserTasks", "CreatedOn");
            DropColumn("dbo.Deals", "CreatedOn");
            DropColumn("dbo.Contacts", "CreatedOn");
            DropColumn("dbo.Contacts", "ImageUrl");
            DropColumn("dbo.Contacts", "ImagerUrl");
            DropColumn("dbo.Contacts", "GoogleId");
            DropTable("dbo.Quotas");
            DropTable("dbo.ExternalLoginDatas");
        }
    }
}
