namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Quotas", "CreatedOn", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Quotas", "CreatedOn");
        }
    }
}
