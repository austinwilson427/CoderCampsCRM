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
                    LastName = "deneme",
                    Companies = new Company[]
                    {
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
                                CompanyAttachments ="http://media.dcentertainment.com/sites/default/files/MAD-Magazine-Arizona-Citizenship-Letter-1.jpg"
                        }

                    },
                    Contacts = new Contact[]
                    {
                        new Contact { Name = " Cliff Barnes" ,
                                      Email = "cliff.barnes@gmail.com",
                                      PhoneNumber = "222-333-1111",
                                      JobTitle = "Merchant Manager"
                                    },
                        new Contact { Name = "Sue Ellen Ewing" ,
                                      Email = "sue@gmail.com",
                                      PhoneNumber = "666-111-9999",
                                      JobTitle = "Merchant Officer"
                        }
                    },
                    Deals = new Deal[]
                    {
                        new Deal {  DealName = "Deal 3",
                                    Stage = "Appintment Scheduled",
                                    Amount = 7000m,
                                    CloseDate = DateTime.Today,
                                    isArchived = true},
                        new Deal {  DealName = "Deal 4",
                                    Stage = "COntract Sent",
                                    Amount = 150000m,
                                    CloseDate = DateTime.Today,
                                    isArchived = false}
                    },
                    UserTasks = new UserTask[]
                    {
                          new UserTask {Id = 3,
                                        Status = "In Progress",
                                        Description = "Submit ",
                                        DueDate = "3/1/2016",
                                        StartDate = "2/10/2016",
                                        Type ="Call"},
                          new UserTask {Id = 4,
                                        Status = "Completed",
                                        Description = "Call Brian to discuss contract",
                                        DueDate = "3/1/2016",
                                        StartDate = "2/10/2016",
                                        Type ="Call"},
                          new UserTask {Id = 5,
                                        Status = "Completed",
                                        Description = "Call Brian to discuss contract",
                                        DueDate = "3/1/2016",
                                        StartDate = "2/10/2016",
                                        Type ="Call"},
                    }


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
                    LastName = "deneme",
                    Companies = new Company[]
                    {
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
                    },
                    Contacts = new Contact[]
                    {
                        new Contact { Name = "Bobby Ewing" ,
                                      Email = "bobby.ewing@gmail.com",
                                      PhoneNumber = "333-222-5555",
                                      JobTitle = "Merchant Manager"
                                    },
                        new Contact { Name = "Clayton Farlow" ,
                                      Email = "clayton@gmail.com",
                                      PhoneNumber = "333-222-5555",
                                      JobTitle = "Merchant Officer"
                        }
                    },
                    Deals = new Deal[]
                    {
                        new Deal {  DealName = "Deal 1",
                                    Stage = "Appintment Scheduled",
                                    Amount = 5000m,
                                    CloseDate = DateTime.Today,
                                    isArchived = true},
                        new Deal {  DealName = "Deal 2",
                                    Stage = "COntract Sent",
                                    Amount = 50000m,
                                    CloseDate = DateTime.Today,
                                    isArchived = false}
                    },
                    UserTasks = new UserTask[]
                    {
                          new UserTask {Id = 1,
                                        Status = "New",
                                        Description = "Call Brian to discuss contract",
                                        DueDate = "3/1/2016",
                                        StartDate = "2/10/2016",
                                        Type ="Call"},
                          new UserTask {Id = 2,
                                        Status = "In Progress",
                                        Description = "Pick up Kids",
                                        DueDate = "3/1/2016",
                                        StartDate = "2/10/2016",
                                        Type ="In Person Meeting"}
                    }
                };
                userManager.Create(user2, "Deneme@123");
                userManager.AddClaim(user2.Id, new System.Security.Claims.Claim("User", "true"));
            }


           
            

        //    UserTask[] tasks = new UserTask[] {
              
                
        //        new UserTask {Id = 3, Status = "In Progress", Description = "Submit ", DueDate = "3/1/2016", StartDate = "2/10/2016", Type ="Call"},
        //        new UserTask {Id = 4, Status = "Completed", Description = "Call Brian to discuss contract", DueDate = "3/1/2016", StartDate = "2/10/2016", Type ="Call"},
        //        new UserTask {Id = 5, Status = "Completed", Description = "Call Brian to discuss contract", DueDate = "3/1/2016", StartDate = "2/10/2016", Type ="Call"},


        //};
        //    context.Tasks.AddOrUpdate(t => t.Id, tasks);

        }
    }
}

