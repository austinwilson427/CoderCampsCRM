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
                "dbo.Contacts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Email = c.String(),
                        PhoneNumber = c.String(),
                        Country = c.String(),
                        City = c.String(),
                        State = c.String(),
                        Zip = c.String(),
                        StreetAddress = c.String(),
                        JobTitle = c.String(),
                        Notes = c.String(),
                        LastInteraction = c.DateTime(),
                        UserId = c.String(maxLength: 128),
                        CompanyId = c.Int(),
                        LocationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.UserId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        ContactId = c.Int(),
                        Latitude = c.String(),
                        Longitude = c.String(),
                        Zoom = c.Int(nullable: false),
                        Title = c.String(),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.Id)
                .Index(t => t.ApplicationUser_Id);
            
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
                "dbo.Deals",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DealName = c.String(),
                        Stage = c.String(),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        CloseDate = c.DateTime(nullable: false),
                        isArchived = c.Boolean(nullable: false),
                        ContactId = c.Int(),
                        CompanyId = c.Int(),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.Contacts", t => t.ContactId)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.ContactId)
                .Index(t => t.CompanyId)
                .Index(t => t.ApplicationUser_Id);
            
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
                "dbo.UserTasks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        StartDate = c.String(),
                        DueDate = c.String(),
                        Description = c.String(),
                        Status = c.String(),
                        DealId = c.Int(),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.ApplicationUser_Id);
            
            CreateTable(
                "dbo.CompanyLogItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        StartTime = c.DateTime(nullable: false),
                        EndTime = c.DateTime(),
                        Content = c.String(),
                        SubmittedBy = c.String(),
                        TaskId = c.Int(),
                        ContactId = c.Int(),
                        CompanyId = c.Int(),
                        DealId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.Contacts", t => t.ContactId)
                .ForeignKey("dbo.Deals", t => t.DealId)
                .Index(t => t.ContactId)
                .Index(t => t.CompanyId)
                .Index(t => t.DealId);
            
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
                "dbo.DealContacts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DealId = c.Int(nullable: false),
                        ContactId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .ForeignKey("dbo.Deals", t => t.DealId, cascadeDelete: true)
                .Index(t => t.DealId)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.DealLogItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        StartTime = c.DateTime(nullable: false),
                        EndTime = c.DateTime(),
                        Content = c.String(),
                        SubmittedBy = c.String(),
                        TaskId = c.Int(),
                        ContactId = c.Int(),
                        DealId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.ContactId)
                .ForeignKey("dbo.Deals", t => t.DealId)
                .Index(t => t.ContactId)
                .Index(t => t.DealId);
            
            CreateTable(
                "dbo.LocationContacts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LocationId = c.Int(nullable: false),
                        ContactId = c.Int(nullable: false),
                        TaskId = c.Int(nullable: false),
                        DealId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .ForeignKey("dbo.Deals", t => t.DealId, cascadeDelete: true)
                .ForeignKey("dbo.Locations", t => t.LocationId, cascadeDelete: true)
                .ForeignKey("dbo.UserTasks", t => t.TaskId, cascadeDelete: true)
                .Index(t => t.LocationId)
                .Index(t => t.ContactId)
                .Index(t => t.TaskId)
                .Index(t => t.DealId);
            
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
            
            CreateTable(
                "dbo.TaskContacts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TaskId = c.Int(nullable: false),
                        ContactId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .ForeignKey("dbo.UserTasks", t => t.TaskId, cascadeDelete: true)
                .Index(t => t.TaskId)
                .Index(t => t.ContactId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TaskContacts", "TaskId", "dbo.UserTasks");
            DropForeignKey("dbo.TaskContacts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.LocationContacts", "TaskId", "dbo.UserTasks");
            DropForeignKey("dbo.LocationContacts", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.LocationContacts", "DealId", "dbo.Deals");
            DropForeignKey("dbo.LocationContacts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropForeignKey("dbo.DealLogItems", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.DealContacts", "DealId", "dbo.Deals");
            DropForeignKey("dbo.DealContacts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.ContactInteractions", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.CompanyLogItems", "DealId", "dbo.Deals");
            DropForeignKey("dbo.CompanyLogItems", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.CompanyLogItems", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.UserTasks", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Locations", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Deals", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Deals", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Deals", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Contacts", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Companies", "ApplicationUser_Id1", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Locations", "Id", "dbo.Contacts");
            DropForeignKey("dbo.Contacts", "CompanyId", "dbo.Companies");
            DropIndex("dbo.TaskContacts", new[] { "ContactId" });
            DropIndex("dbo.TaskContacts", new[] { "TaskId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.LocationContacts", new[] { "DealId" });
            DropIndex("dbo.LocationContacts", new[] { "TaskId" });
            DropIndex("dbo.LocationContacts", new[] { "ContactId" });
            DropIndex("dbo.LocationContacts", new[] { "LocationId" });
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            DropIndex("dbo.DealLogItems", new[] { "ContactId" });
            DropIndex("dbo.DealContacts", new[] { "ContactId" });
            DropIndex("dbo.DealContacts", new[] { "DealId" });
            DropIndex("dbo.ContactInteractions", new[] { "ContactId" });
            DropIndex("dbo.CompanyLogItems", new[] { "DealId" });
            DropIndex("dbo.CompanyLogItems", new[] { "CompanyId" });
            DropIndex("dbo.CompanyLogItems", new[] { "ContactId" });
            DropIndex("dbo.UserTasks", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.Deals", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Deals", new[] { "CompanyId" });
            DropIndex("dbo.Deals", new[] { "ContactId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.Locations", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Locations", new[] { "Id" });
            DropIndex("dbo.Contacts", new[] { "CompanyId" });
            DropIndex("dbo.Contacts", new[] { "UserId" });
            DropIndex("dbo.Companies", new[] { "ApplicationUser_Id1" });
            DropTable("dbo.TaskContacts");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.ProfileUsers");
            DropTable("dbo.LocationContacts");
            DropTable("dbo.DealLogItems");
            DropTable("dbo.DealContacts");
            DropTable("dbo.ContactInteractions");
            DropTable("dbo.CompanyLogItems");
            DropTable("dbo.UserTasks");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.Deals");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.Locations");
            DropTable("dbo.Contacts");
            DropTable("dbo.Companies");
        }
    }
}