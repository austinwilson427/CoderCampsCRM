namespace CoderCampsCRM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial1 : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.DealLogItems", "ContactId");
            AddForeignKey("dbo.DealLogItems", "ContactId", "dbo.Contacts", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DealLogItems", "ContactId", "dbo.Contacts");
            DropIndex("dbo.DealLogItems", new[] { "ContactId" });
        }
    }
}
