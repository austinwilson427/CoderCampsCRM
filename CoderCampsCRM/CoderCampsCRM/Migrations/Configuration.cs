namespace CoderCampsCRM.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
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

            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new ApplicationUserManager(userStore);

            var user = userManager.FindByName("deneme@gmail.com");

            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = "deneme@gmail.com",
                    Email = "deneme@gmail.com",
                    FirstName = "deneme",
                    LastName = "deneme"
                };

                userManager.Create(user, "Deneme@123");
                userManager.AddClaim(user.Id, new System.Security.Claims.Claim("Admin", "true"));

            }
            var user2 = userManager.FindByName("deneme2@gmail.com");
            if (user2 == null)
            {
                user2 = new ApplicationUser
                {
                    UserName = "deneme2@gmail.com",
                    Email = "deneme2@gmail.com",
                    FirstName = "deneme ",
                    LastName = "deneme"
                };
                userManager.Create(user2, "Deneme@123");
                userManager.AddClaim(user2.Id, new System.Security.Claims.Claim("User", "true"));
            }


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
                new UserTask {Id = 1, Status = "New", Description = "Call Brian to discuss contract", DueDate = "3/1/2016", StartDate = "2/10/2016", Type ="Call"},
                new UserTask {Id = 2, Status = "In Progress", Description = "Pick up Kids", DueDate = "3/1/2016", StartDate = "2/10/2016", Type ="In Person Meeting"},
                new UserTask {Id = 3, Status = "In Progress", Description = "Submit ", DueDate = "3/1/2016", StartDate = "2/10/2016", Type ="Call"},
                new UserTask {Id = 4, Status = "Completed", Description = "Call Brian to discuss contract", DueDate = "3/1/2016", StartDate = "2/10/2016", Type ="Call"},
                new UserTask {Id = 5, Status = "Completed", Description = "Call Brian to discuss contract", DueDate = "3/1/2016", StartDate = "2/10/2016", Type ="Call"},


            };
            context.Tasks.AddOrUpdate(t => t.Id, tasks);
           

        }
    }
}

