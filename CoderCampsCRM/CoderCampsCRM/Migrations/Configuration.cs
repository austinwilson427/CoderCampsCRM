namespace CoderCampsCRM.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<CoderCampsCRM.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CoderCampsCRM.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            var deals = new Deal[]
            {
                new Deal
                {
                    Stage = "Qualified To Buy",
                    DealName = "Seed Deal",
                    Amount = 300000m,
                    CloseDate = DateTime.Now,
                    CompanyId = 1,
                    DealOwnerId = 1
                }
            };

             context.Deals.AddOrUpdate(d => d.DealName, deals);

            var contacts = new Contact[]
            {
                new Contact
                {
                    Name = "Joe Fish",
                    Company = "Fish Industries",
                    Id = 1,
                    JobTitle = "CEO",
                    Email = "joe@fishindustries.com",
                    PhoneNumber = "3025667888"
                },

                new Contact
                {
                    Name = "Bob Bobson",
                    Company = "Bobson and Sons",
                    Id = 2,
                    JobTitle = "CEO",
                    Email = "bob@bobson.com",
                    PhoneNumber = "3014524411"
                }
            };
            context.Contacts.AddOrUpdate(c => c.Id, contacts);
        }
    }
}
