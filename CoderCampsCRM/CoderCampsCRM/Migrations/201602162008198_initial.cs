namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Latitude = c.String(),
                        Longitude = c.String(),
                        Zoom = c.Int(nullable: false),
                        CoordsFormat = c.String(),
                        Title = c.String(),
                        ContactId = c.Int(),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.ContactId)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.ContactId)
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
            
            CreateIndex("dbo.DealContacts", "DealId");
            CreateIndex("dbo.TaskContacts", "TaskId");
            AddForeignKey("dbo.DealContacts", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
            AddForeignKey("dbo.TaskContacts", "TaskId", "dbo.UserTasks", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TaskContacts", "TaskId", "dbo.UserTasks");
            DropForeignKey("dbo.DealContacts", "DealId", "dbo.Deals");
            DropForeignKey("dbo.CompanyLogItems", "DealId", "dbo.Deals");
            DropForeignKey("dbo.CompanyLogItems", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.CompanyLogItems", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Locations", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Locations", "ContactId", "dbo.Contacts");
            DropIndex("dbo.TaskContacts", new[] { "TaskId" });
            DropIndex("dbo.DealContacts", new[] { "DealId" });
            DropIndex("dbo.CompanyLogItems", new[] { "DealId" });
            DropIndex("dbo.CompanyLogItems", new[] { "CompanyId" });
            DropIndex("dbo.CompanyLogItems", new[] { "ContactId" });
            DropIndex("dbo.Locations", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Locations", new[] { "ContactId" });
            DropTable("dbo.CompanyLogItems");
            DropTable("dbo.Locations");
        }
    }
}
