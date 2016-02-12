namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class task_update : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserTasks", "DealId", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserTasks", "DealId");
        }
    }
}
