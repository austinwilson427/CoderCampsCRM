namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _3 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Locations", "Id", "dbo.Contacts");
            DropForeignKey("dbo.Locations", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Locations", new[] { "Id" });
            DropIndex("dbo.Locations", new[] { "ApplicationUser_Id" });
            AddColumn("dbo.Contacts", "Longitude", c => c.String());
            AddColumn("dbo.Contacts", "Latitude", c => c.String());
            DropColumn("dbo.Contacts", "LocationId");
            DropTable("dbo.Locations");
        }
        
        public override void Down()
        {
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
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Contacts", "LocationId", c => c.Int(nullable: false));
            DropColumn("dbo.Contacts", "Latitude");
            DropColumn("dbo.Contacts", "Longitude");
            CreateIndex("dbo.Locations", "ApplicationUser_Id");
            CreateIndex("dbo.Locations", "Id");
            AddForeignKey("dbo.Locations", "ApplicationUser_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.Locations", "Id", "dbo.Contacts", "Id");
        }
    }
}
