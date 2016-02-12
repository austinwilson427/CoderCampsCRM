namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _2 : DbMigration
    {
        public override void Up()
        {
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
                .Index(t => t.ContactId);
            
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
                .Index(t => t.ContactId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TaskContacts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.DealContacts", "ContactId", "dbo.Contacts");
            DropIndex("dbo.TaskContacts", new[] { "ContactId" });
            DropIndex("dbo.DealContacts", new[] { "ContactId" });
            DropTable("dbo.TaskContacts");
            DropTable("dbo.DealContacts");
        }
    }
}
