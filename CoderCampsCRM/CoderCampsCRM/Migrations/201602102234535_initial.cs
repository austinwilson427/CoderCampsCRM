namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Companies", "ApplicationUser_Id", c => c.String());
            AddColumn("dbo.Companies", "ApplicationUser_Id1", c => c.String(maxLength: 128));
            CreateIndex("dbo.Companies", "ApplicationUser_Id1");
            AddForeignKey("dbo.Companies", "ApplicationUser_Id1", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Companies", "ApplicationUser_Id1", "dbo.AspNetUsers");
            DropIndex("dbo.Companies", new[] { "ApplicationUser_Id1" });
            DropColumn("dbo.Companies", "ApplicationUser_Id1");
            DropColumn("dbo.Companies", "ApplicationUser_Id");
        }
    }
}
