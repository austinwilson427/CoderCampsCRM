namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial7 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Contacts", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.Contacts", new[] { "UserId" });
            DropColumn("dbo.Contacts", "UserId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contacts", "UserId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Contacts", "UserId");
            AddForeignKey("dbo.Contacts", "UserId", "dbo.AspNetUsers", "Id");
        }
    }
}
