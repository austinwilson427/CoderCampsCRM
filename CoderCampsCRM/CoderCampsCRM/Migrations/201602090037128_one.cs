namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class one : DbMigration
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
                        CompanyFacebook = c.String(),
                        CompanyLinkedin = c.String(),
                        CompanyTwitter = c.String(),
                        CompanyCreateDate = c.DateTime(nullable: false),
                        CompanyLastActivityeDate = c.DateTime(),
                        CompanyNextActivityDate = c.DateTime(),
                        CompanyAttachments = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ContactInteractions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        Subject = c.String(),
                        Description = c.String(),
                        ContactId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.Contacts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Email = c.String(),
                        PhoneNumber = c.String(),
                        Company = c.String(),
                        JobTitle = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
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
            
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String());
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
            AddColumn("dbo.AspNetUsers", "Company", c => c.String());
            AddColumn("dbo.AspNetUsers", "TimeZone", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ContactInteractions", "ContactId", "dbo.Contacts");
            DropIndex("dbo.ContactInteractions", new[] { "ContactId" });
            DropColumn("dbo.AspNetUsers", "TimeZone");
            DropColumn("dbo.AspNetUsers", "Company");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "FirstName");
            DropTable("dbo.ProfileUsers");
            DropTable("dbo.Contacts");
            DropTable("dbo.ContactInteractions");
            DropTable("dbo.Companies");
        }
    }
}
