namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.LocationContacts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.LocationContacts", "DealId", "dbo.Deals");
            DropForeignKey("dbo.LocationContacts", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.LocationContacts", "TaskId", "dbo.UserTasks");
            DropIndex("dbo.LocationContacts", new[] { "LocationId" });
            DropIndex("dbo.LocationContacts", new[] { "ContactId" });
            DropIndex("dbo.LocationContacts", new[] { "TaskId" });
            DropIndex("dbo.LocationContacts", new[] { "DealId" });
            DropTable("dbo.LocationContacts");
        }
        
        public override void Down()
        {
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
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.LocationContacts", "DealId");
            CreateIndex("dbo.LocationContacts", "TaskId");
            CreateIndex("dbo.LocationContacts", "ContactId");
            CreateIndex("dbo.LocationContacts", "LocationId");
            AddForeignKey("dbo.LocationContacts", "TaskId", "dbo.UserTasks", "Id", cascadeDelete: true);
            AddForeignKey("dbo.LocationContacts", "LocationId", "dbo.Locations", "Id", cascadeDelete: true);
            AddForeignKey("dbo.LocationContacts", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
            AddForeignKey("dbo.LocationContacts", "ContactId", "dbo.Contacts", "Id", cascadeDelete: true);
        }
    }
}
