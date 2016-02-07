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
            var companies = new Company[]
            {
                new Company {Id = 1,
                            CompanyName = "Coder Camps",
                            CompanyDomainName = "www.codercamps.com",
                            CompanyPhoneNumber = "855-755-2267",
                            CompanyCountry = "US",
                            CompanyCity = "Pearland",
                            CompanyState = "TX",
                            CompanyZip = "77584",
                            ComapanyAddress = "11200 Broadway Street Suite 2731",
                            CompanyDescription = "Coder Camps are hands-on coding “boot camps” focused on teaching motivated students the programming skills needed to be successful in a developer role. Coder Camps offers numerous courses that are designed for your specific needs, whether you are new to programming or a seasoned professional. All of the courses equip students with real-world skills by simulating an agile work environment, taught by an experienced teaching staff that is passionate about helping you begin your career after the program ends. With facilities currently in Houston, Online, San Francisco, and Seattle, students can start their path towards becoming a developer locally or globally. ",
                            CompanyIndustry = "Education",
                            CompanyIsPublic = true,
                            CompanyFacebook = "https://www.facebook.com/CoderCamps/",
                            CompanyLinkedin = "https://www.linkedin.com/company/coder-camps",
                            CompanyTwitter ="https://twitter.com/codercamps",
                            CompanyCreateDate = DateTime.Now

                }         
        };
            context.Companies.AddOrUpdate(c => c.CompanyName, companies);
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

            //var contacts = new Contact[]
            //{
            //    new Contact
            //    {
            //        Name = "Joe Fish",
            //        Company = "Fish Industries",
            //        Id = 1,
            //        JobTitle = "CEO",
            //        Email = "joe@fishindustries.com",
            //        PhoneNumber = "3025667888"
            //    },

            //    new Contact
            //    {
            //        Name = "Bob Bobson",
            //        Company = "Bobson and Sons",
            //        Id = 2,
            //        JobTitle = "CEO",
            //        Email = "bob@bobson.com",
            //        PhoneNumber = "3014524411"
            //    }
            //};
            context.Contacts.AddOrUpdate(c => c.Id, contacts);
        }
    }
}
