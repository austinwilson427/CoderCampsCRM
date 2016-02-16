namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial3 : DbMigration
    {
        public override void Up()
        {
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CompanyLogItems", "DealId", "dbo.Deals");
            DropForeignKey("dbo.CompanyLogItems", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.CompanyLogItems", "CompanyId", "dbo.Companies");
            DropIndex("dbo.CompanyLogItems", new[] { "DealId" });
            DropIndex("dbo.CompanyLogItems", new[] { "CompanyId" });
            DropIndex("dbo.CompanyLogItems", new[] { "ContactId" });
            DropTable("dbo.CompanyLogItems");
        }
    }
}
