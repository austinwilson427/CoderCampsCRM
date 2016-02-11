namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class tasks : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Companies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CompanyName = c.String(),
                        CompanyDomainName = c.String(),
                        CompanyPhoneNumber = c.String(),
                        CompanyCountry = c.String(),
                        CompanyCity = c.String(),
                        CompanyState = c.String(),
                        CompanyZip = c.String(),
                        ComapanyAddress = c.String(),
                        CompanyDescription = c.String(),
                        CompanyIndustry = c.String(),
                        CompanyIsPublic = c.Boolean(nullable: false),
                        ApplicationUser_Id = c.String(),
                        CompanyFacebook = c.String(),
                        CompanyLinkedin = c.String(),
                        CompanyTwitter = c.String(),
                        CompanyCreateDate = c.DateTime(nullable: false),
                        CompanyLastActivityeDate = c.DateTime(),
                        CompanyNextActivityDate = c.DateTime(),
                        CompanyAttachments = c.String(),
                        ApplicationUser_Id1 = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id1)
                .Index(t => t.ApplicationUser_Id1);
            
            CreateTable(
                "dbo.ProfileUsers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        PhoneNumber = c.Int(nullable: false),
                        Email = c.String(),
                        CompanyName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserTasks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TaskType = c.String(),
                        TaskStartDate = c.String(),
                        TaskDueDate = c.String(),
                        TaskDescription = c.String(),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Contacts", "UserId", c => c.String(maxLength: 128));
            AddColumn("dbo.Contacts", "CompanyId", c => c.Int());
            AddColumn("dbo.DealLogItems", "ContactId", c => c.Int());
            AddColumn("dbo.Deals", "isArchived", c => c.Boolean(nullable: false));
            AddColumn("dbo.Deals", "ContactId", c => c.Int());
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String());
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
            AddColumn("dbo.AspNetUsers", "Company", c => c.String());
            AddColumn("dbo.AspNetUsers", "TimeZone", c => c.String());
            AddColumn("dbo.AspNetUsers", "PicUrl", c => c.String());
            AlterColumn("dbo.Deals", "CompanyId", c => c.Int());
            CreateIndex("dbo.Contacts", "UserId");
            CreateIndex("dbo.Contacts", "CompanyId");
            CreateIndex("dbo.DealLogItems", "ContactId");
            CreateIndex("dbo.DealLogItems", "DealId");
            CreateIndex("dbo.Deals", "ContactId");
            CreateIndex("dbo.Deals", "CompanyId");
            AddForeignKey("dbo.Contacts", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.Contacts", "UserId", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.DealLogItems", "ContactId", "dbo.Contacts", "Id");
            AddForeignKey("dbo.Deals", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.Deals", "ContactId", "dbo.Contacts", "Id");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
            DropColumn("dbo.Contacts", "Company");
            DropColumn("dbo.DealLogItems", "AssignedToUserId");
            DropColumn("dbo.Deals", "DealOwnerId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Deals", "DealOwnerId", c => c.Int(nullable: false));
            AddColumn("dbo.DealLogItems", "AssignedToUserId", c => c.Int());
            AddColumn("dbo.Contacts", "Company", c => c.String());
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropForeignKey("dbo.Deals", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Deals", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.DealLogItems", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Contacts", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Companies", "ApplicationUser_Id1", "dbo.AspNetUsers");
            DropForeignKey("dbo.Contacts", "CompanyId", "dbo.Companies");
            DropIndex("dbo.Deals", new[] { "CompanyId" });
            DropIndex("dbo.Deals", new[] { "ContactId" });
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            DropIndex("dbo.DealLogItems", new[] { "ContactId" });
            DropIndex("dbo.Contacts", new[] { "CompanyId" });
            DropIndex("dbo.Contacts", new[] { "UserId" });
            DropIndex("dbo.Companies", new[] { "ApplicationUser_Id1" });
            AlterColumn("dbo.Deals", "CompanyId", c => c.Int(nullable: false));
            DropColumn("dbo.AspNetUsers", "PicUrl");
            DropColumn("dbo.AspNetUsers", "TimeZone");
            DropColumn("dbo.AspNetUsers", "Company");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "FirstName");
            DropColumn("dbo.Deals", "ContactId");
            DropColumn("dbo.Deals", "isArchived");
            DropColumn("dbo.DealLogItems", "ContactId");
            DropColumn("dbo.Contacts", "CompanyId");
            DropColumn("dbo.Contacts", "UserId");
            DropTable("dbo.UserTasks");
            DropTable("dbo.ProfileUsers");
            DropTable("dbo.Companies");
        }
    }
}
