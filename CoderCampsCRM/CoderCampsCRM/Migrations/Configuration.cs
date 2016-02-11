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
            Company[] companies = new Company[]
            {
                new Company {
                                CompanyName = "Coder Camps",
                                CompanyDomainName ="www.codercamps.com",
                                CompanyPhoneNumber ="855-755-2267",
                                CompanyCountry ="US",
                                CompanyCity ="Pearland",
                                CompanyState ="TX",
                                CompanyZip ="77584",
                                ComapanyAddress ="11200 Broadway Street Suite 2731",
                                CompanyDescription ="Coder Camps are hands-on coding “boot camps” focused on teaching motivated...",
                                CompanyIndustry ="Education",
                                CompanyIsPublic = true,
                                CompanyFacebook ="https://www.facebook.com/CoderCamps/",
                                CompanyLinkedin ="https://www.linkedin.com/company/coder-camps",
                                CompanyTwitter ="https://twitter.com/codercamps",
                                CompanyCreateDate = DateTime.Now,
                                CompanyLastActivityeDate = null,
                                CompanyNextActivityDate = null,
                                CompanyAttachments ="http://scarc.library.oregonstate.edu/omeka/files/original/carnes02_7e59912282.jpg"},
                new Company {
                                CompanyName = "The Verge",
                                CompanyDomainName ="www.theverge.com",
                                CompanyPhoneNumber ="833-322-4422",
                                CompanyCountry ="US",
                                CompanyCity ="Washington",
                                CompanyState ="NW ",
                                CompanyZip ="20036",
                                ComapanyAddress ="1201 Connecticut Ave. NW",
                                CompanyDescription ="The Verge was founded in 2011 in partnership with Vox Media...",
                                CompanyIndustry ="Web",
                                CompanyIsPublic = true,
                                CompanyFacebook ="https://www.facebook.com/verge",
                                CompanyLinkedin ="https://www.linkedin.com/company/theverge",
                                CompanyTwitter ="https://twitter.com/verge",
                                CompanyCreateDate = DateTime.Now,
                                CompanyLastActivityeDate = null,
                                CompanyNextActivityDate = null,
                                CompanyAttachments ="http://media.dcentertainment.com/sites/default/files/MAD-Magazine-Arizona-Citizenship-Letter-1.jpg"},
                 new Company {
                                CompanyName = "scotch-soda",
                                CompanyDomainName ="www.scotch-soda.com",
                                CompanyPhoneNumber ="1- (866) 544-1557",
                                CompanyCountry ="Nederland",
                                CompanyCity ="Amsterdam",
                                CompanyState =null,
                                CompanyZip ="11111",
                                ComapanyAddress ="somewhere in Nederland",
                                CompanyDescription ="At Scotch & Soda we want people to love their clothes...",
                                CompanyIndustry ="Web",
                                CompanyIsPublic = true,
                                CompanyFacebook ="https://www.facebook.com/ScotchOfficial",
                                CompanyLinkedin ="https://www.linkedin.com/company/1014429",
                                CompanyTwitter ="https://twitter.com/Scotch_Official",
                                CompanyCreateDate = DateTime.Now,
                                CompanyLastActivityeDate = null,
                                CompanyNextActivityDate = null,
                                CompanyAttachments ="http://media.dcentertainment.com/sites/default/files/MAD-Magazine-Arizona-Citizenship-Letter-1.jpg"}
            };
            context.Companies.AddOrUpdate(c => c.CompanyName, companies);

            UserTask[] tasks = new UserTask[] {
                new UserTask {Id = 1, Status = "New", TaskDescription = "Call Brian to discuss contract", TaskDueDate = "3/1/2016", TaskStartDate = "2/10/2016", TaskType ="Call"},
                new UserTask {Id = 2, Status = "In Progress", TaskDescription = "Pick up Kids", TaskDueDate = "3/1/2016", TaskStartDate = "2/10/2016", TaskType ="In Person Meeting"},
                new UserTask {Id = 3, Status = "In Progress", TaskDescription = "Submit ", TaskDueDate = "3/1/2016", TaskStartDate = "2/10/2016", TaskType ="Call"},
                new UserTask {Id = 4, Status = "Completed", TaskDescription = "Call Brian to discuss contract", TaskDueDate = "3/1/2016", TaskStartDate = "2/10/2016", TaskType ="Call"},
                new UserTask {Id = 5, Status = "Completed", TaskDescription = "Call Brian to discuss contract", TaskDueDate = "3/1/2016", TaskStartDate = "2/10/2016", TaskType ="Call"},


        };
            context.Tasks.AddOrUpdate(t => t.Id, tasks);

            var contacts = new Contact[]
            {
                new Contact
                {
                    Name = "Joe Fish",
                    CompanyId = 1,
                    Email = "joe@joe.com",
                    JobTitle = "CEO",
                    Country = "USA",
                    City = "Redmond",
                    State = "WA",
                    PhoneNumber = "3024456677",
                    StreetAddress = "22 Fish Road",
                    Id = 1,
                    Zip = "90851"
                },

                new Contact
                {
                    Name = "Bob Arthur",
                    CompanyId = 2,
                    Email = "bob@bob.com",
                    JobTitle = "Developer",
                    Country = "USA",
                    City = "Dallas",
                    State = "TX",
                    PhoneNumber = "3024456677",
                    StreetAddress = "22 Angel Road",
                    Id = 2,
                    Zip = "20468"
                }
            };

            context.Contacts.AddOrUpdate(c => c.Id, contacts);

            var interactions = new ContactInteraction[]
            {
                new ContactInteraction
                {
                    Id = 1,
                    ContactId = 1,
                    Date = new DateTime(2016, 02, 10, 17, 19, 52),
                    Subject = "Follow Up",
                    Description = "Joe seems interested in our service. I'm expecting a sale in a few days",
                },

                new ContactInteraction
                {
                    Id = 2,
                    ContactId = 2,
                    Date = new DateTime(2016, 02, 8, 14, 48, 22),
                    Subject = "Sales Pitch",
                    Description = "Bob was not impressed, he was angry. Red flag here",
                }
            };

            context.ContactInteractions.AddOrUpdate(i => i.Id, interactions);
        }
    }
}
