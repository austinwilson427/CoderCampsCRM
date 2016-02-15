namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            CreateTable(
                "dbo.UserTasks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        StartDate = c.String(),
                        DueDate = c.String(),
                        Description = c.String(),
                        Status = c.String(),
                        DealId = c.Int(),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.ApplicationUser_Id);
            
            AddColumn("dbo.DealLogItems", "SubmittedBy", c => c.String());
            AddColumn("dbo.Deals", "ApplicationUser_Id", c => c.String(maxLength: 128));
            AlterColumn("dbo.DealLogItems", "DealId", c => c.Int());
            CreateIndex("dbo.Deals", "ApplicationUser_Id");
            CreateIndex("dbo.DealLogItems", "DealId");
            AddForeignKey("dbo.Deals", "ApplicationUser_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals");
            DropForeignKey("dbo.UserTasks", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Deals", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropIndex("dbo.DealLogItems", new[] { "DealId" });
            DropIndex("dbo.UserTasks", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Deals", new[] { "ApplicationUser_Id" });
            AlterColumn("dbo.DealLogItems", "DealId", c => c.Int(nullable: false));
            DropColumn("dbo.Deals", "ApplicationUser_Id");
            DropColumn("dbo.DealLogItems", "SubmittedBy");
            DropTable("dbo.UserTasks");
            CreateIndex("dbo.DealLogItems", "DealId");
            AddForeignKey("dbo.DealLogItems", "DealId", "dbo.Deals", "Id", cascadeDelete: true);
        }
    }
}
