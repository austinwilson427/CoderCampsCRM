namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.DealLogItems", "UserId", c => c.String(maxLength: 128));
            CreateIndex("dbo.DealLogItems", "UserId");
            AddForeignKey("dbo.DealLogItems", "UserId", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DealLogItems", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.DealLogItems", new[] { "UserId" });
            DropColumn("dbo.DealLogItems", "UserId");
        }
    }
}
