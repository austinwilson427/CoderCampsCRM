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
            AddColumn("dbo.Deals", "ApplicationUser_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.UserTasks", "ApplicationUser_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.Deals", "ApplicationUser_Id");
            CreateIndex("dbo.UserTasks", "ApplicationUser_Id");
            AddForeignKey("dbo.Deals", "ApplicationUser_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.UserTasks", "ApplicationUser_Id", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TaskContacts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.DealContacts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.UserTasks", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Deals", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropIndex("dbo.TaskContacts", new[] { "ContactId" });
            DropIndex("dbo.DealContacts", new[] { "ContactId" });
            DropIndex("dbo.UserTasks", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Deals", new[] { "ApplicationUser_Id" });
            DropColumn("dbo.UserTasks", "ApplicationUser_Id");
            DropColumn("dbo.Deals", "ApplicationUser_Id");
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
