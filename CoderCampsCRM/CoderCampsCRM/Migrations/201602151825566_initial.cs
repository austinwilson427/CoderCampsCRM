namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
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
            
            AddColumn("dbo.Contacts", "Country", c => c.String());
            AddColumn("dbo.Contacts", "City", c => c.String());
            AddColumn("dbo.Contacts", "State", c => c.String());
            AddColumn("dbo.Contacts", "Zip", c => c.String());
            AddColumn("dbo.Contacts", "StreetAddress", c => c.String());
            AddColumn("dbo.Contacts", "LastInteraction", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TaskContacts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.DealContacts", "ContactId", "dbo.Contacts");
            DropIndex("dbo.TaskContacts", new[] { "ContactId" });
            DropIndex("dbo.DealContacts", new[] { "ContactId" });
            DropColumn("dbo.Contacts", "LastInteraction");
            DropColumn("dbo.Contacts", "StreetAddress");
            DropColumn("dbo.Contacts", "Zip");
            DropColumn("dbo.Contacts", "State");
            DropColumn("dbo.Contacts", "City");
            DropColumn("dbo.Contacts", "Country");
            DropTable("dbo.TaskContacts");
            DropTable("dbo.DealContacts");
        }
    }
}
