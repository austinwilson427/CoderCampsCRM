namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class tasks1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserTasks", "Type", c => c.String());
            AddColumn("dbo.UserTasks", "StartDate", c => c.String());
            AddColumn("dbo.UserTasks", "DueDate", c => c.String());
            AddColumn("dbo.UserTasks", "Description", c => c.String());
            DropColumn("dbo.UserTasks", "TaskType");
            DropColumn("dbo.UserTasks", "TaskStartDate");
            DropColumn("dbo.UserTasks", "TaskDueDate");
            DropColumn("dbo.UserTasks", "TaskDescription");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserTasks", "TaskDescription", c => c.String());
            AddColumn("dbo.UserTasks", "TaskDueDate", c => c.String());
            AddColumn("dbo.UserTasks", "TaskStartDate", c => c.String());
            AddColumn("dbo.UserTasks", "TaskType", c => c.String());
            DropColumn("dbo.UserTasks", "Description");
            DropColumn("dbo.UserTasks", "DueDate");
            DropColumn("dbo.UserTasks", "StartDate");
            DropColumn("dbo.UserTasks", "Type");
        }
    }
}
