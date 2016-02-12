namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial3 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Contacts", "Deal_Id", "dbo.Deals");
            DropIndex("dbo.Contacts", new[] { "Deal_Id" });
            DropColumn("dbo.Contacts", "Deal_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contacts", "Deal_Id", c => c.Int());
            CreateIndex("dbo.Contacts", "Deal_Id");
            AddForeignKey("dbo.Contacts", "Deal_Id", "dbo.Deals", "Id");
        }
    }
}
