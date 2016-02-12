namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.DealLogItems", "SubmittedBy", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.DealLogItems", "SubmittedBy");
        }
    }
}
