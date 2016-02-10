namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
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
                        JobTitle = c.String(),
                        UserId = c.String(maxLength: 128),
                        CompanyId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.UserId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Company = c.String(),
                        TimeZone = c.String(),
                        PicUrl = c.String(),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.DealLogItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        StartTime = c.DateTime(nullable: false),
                        EndTime = c.DateTime(),
                        Content = c.String(),
                        TaskId = c.Int(),
                        AssignedToUserId = c.Int(),
                        DealId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Deals",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DealName = c.String(),
                        Stage = c.String(),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        CloseDate = c.DateTime(nullable: false),
                        DealOwnerId = c.Int(nullable: false),
                        CompanyId = c.Int(nullable: false),
                        isArchived = c.Boolean(nullable: false),
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
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.ContactInteractions", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Contacts", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Contacts", "CompanyId", "dbo.Companies");
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.Contacts", new[] { "CompanyId" });
            DropIndex("dbo.Contacts", new[] { "UserId" });
            DropIndex("dbo.ContactInteractions", new[] { "ContactId" });
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.ProfileUsers");
            DropTable("dbo.Deals");
            DropTable("dbo.DealLogItems");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.Contacts");
            DropTable("dbo.ContactInteractions");
            DropTable("dbo.Companies");
        }
    }
}
