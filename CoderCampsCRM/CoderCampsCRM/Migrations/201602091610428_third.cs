namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class third : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.AspNetUsers", "FirstName");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "Company");
            DropColumn("dbo.AspNetUsers", "TimeZone");
            DropColumn("dbo.AspNetUsers", "PicUrl");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "PicUrl", c => c.String());
            AddColumn("dbo.AspNetUsers", "TimeZone", c => c.String());
            AddColumn("dbo.AspNetUsers", "Company", c => c.String());
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String());
        }
    }
}
