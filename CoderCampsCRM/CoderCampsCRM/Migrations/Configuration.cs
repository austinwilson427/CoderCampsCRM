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
                        new Contact {
                                      Id = 1,
                                      Name = " Cliff Barnes" ,
                                      Email = "cliff.barnes@gmail.com",
                                      PhoneNumber = "222-333-1111",
                                      JobTitle = "Merchant Manager"
                                    },
                        new Contact {   
                                      Id = 2,
                                      Name = "Sue Ellen Ewing" ,
                                      Email = "sue@gmail.com",
                                      PhoneNumber = "666-111-9999",
                                      JobTitle = "Merchant Officer"
                        }
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
                                CompanyIndustry ="Textile",
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
                        new Contact {
                                      Id = 3,
                                      Name = "Bobby Ewing" ,
                                      Email = "bobby.ewing@gmail.com",
                                      PhoneNumber = "333-222-5555",
                                      JobTitle = "Merchant Manager"
                                    },
                        new Contact {
                                      Id = 4,
                                      Name = "Clayton Farlow" ,
                                      Email = "clayton@gmail.com",
                                      PhoneNumber = "333-222-5555",
                                      JobTitle = "Merchant Officer"
                        }
                    }
                };
                userManager.Create(user2, "Deneme@123");
                userManager.AddClaim(user2.Id, new System.Security.Claims.Claim("User", "true"));

                Contact[] contacts = new Contact[]
                {
                        new Contact {
                                      Id = 5,
                                      Name = "Austin Wilson" ,
                                      Email = "austin.wilson427@gmail.com",
                                      PhoneNumber = "903-681-2193",
                                      JobTitle = "COO",
                                    },
                        new Contact {
                                      Id = 6,
                                      Name = "Kim Gorski" ,
                                      Email = "kim.gorski@gmail.com",
                                      PhoneNumber = "123-456-7890",
                                      JobTitle = "Scrum Master",
                                    },
                        new Contact {
                                      Id = 7,
                                      Name = "Duran Gradwell" ,
                                      Email = "duran.gradwell@gmail.com",
                                      PhoneNumber = "789-235-3452",
                                      JobTitle = "CEO",
                                    },
                        new Contact {
                                      Id = 8,
                                      Name = "Guven Agas" ,
                                      Email = "guven.agas@gmail.com",
                                      PhoneNumber = "486-252-3226",
                                      JobTitle = "President",
                                    },
                        new Contact {
                                      Id = 9,
                                      Name = "Matt Collins" ,
                                      Email = "matt.collins@gmail.com",
                                      PhoneNumber = "163-662-8921",
                                      JobTitle = "Product Owner",
                                    },
                };

                context.Contacts.AddOrUpdate(con => con.Email, contacts);

                Deal[] deals = new Deal[]
                {
                        new Deal {
                                      Id = 1,
                                      DealName = "Starbucks",
                                      Amount = 300000m,
                                      CloseDate = new DateTime(2016, 3, 4, 14, 0, 0),
                                      ContactId = 5,
                                      Stage = "Qualified to Buy",
                                      isArchived = false
                                      
                                    },
                        new Deal {
                                      Id = 2,
                                      DealName = "McDonalds",
                                      Amount = 50000m,
                                      CloseDate = new DateTime(2016, 3, 1, 10, 0, 0),
                                      ContactId = 5,
                                      Stage = "Presentation Scheduled",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 3,
                                      DealName = "Wal-Mart",
                                      Amount = 200000m,
                                      CloseDate = new DateTime(2016, 2, 29, 9, 0, 0),
                                      ContactId = 5,
                                      Stage = "Appointment Scheduled",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 4,
                                      DealName = "Home Depot",
                                      Amount = 10000m,
                                      CloseDate = new DateTime(2016, 3, 7, 14, 0, 0),
                                      ContactId = 6,
                                      Stage = "Qualified to Buy",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 5,
                                      DealName = "Lowe's",
                                      Amount = 75000m,
                                      CloseDate = new DateTime(2016, 3, 7, 16, 0, 0),
                                      ContactId = 6,
                                      Stage = "Appointment Scheduled",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 6,
                                      DealName = "Chick-Fil-A",
                                      Amount = 250000m,
                                      CloseDate = new DateTime(2016, 2, 14, 10, 0, 0),
                                      ContactId = 6,
                                      Stage = "Contract Sent",
                                      isArchived = true

                                    },
                        new Deal {
                                      Id = 7,
                                      DealName = "Whataburger",
                                      Amount = 125000m,
                                      CloseDate = new DateTime(2016, 3, 10, 13, 0, 0),
                                      ContactId = 7,
                                      Stage = "Decision Maker Bought In",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 8,
                                      DealName = "Target",
                                      Amount = 250000m,
                                      CloseDate = new DateTime(2016, 3, 9, 15, 0, 0),
                                      ContactId = 7,
                                      Stage = "Appointment Scheduled",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 9,
                                      DealName = "Hobby Lobby",
                                      Amount = 25000m,
                                      CloseDate = new DateTime(2016, 3, 19, 8, 0, 0),
                                      ContactId = 7,
                                      Stage = "Qualified to Buy",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 10,
                                      DealName = "Spec's",
                                      Amount = 150000m,
                                      CloseDate = new DateTime(2016, 3, 2, 18, 0, 0),
                                      ContactId = 8,
                                      Stage = "Presentation Scheduled",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 11,
                                      DealName = "Chili's",
                                      Amount = 150000m,
                                      CloseDate = new DateTime(2016, 2, 14, 8, 0, 0),
                                      ContactId = 8,
                                      Stage = "Contract Sent",
                                      isArchived = true

                                    },
                        new Deal {
                                      Id = 12,
                                      DealName = "Sam's",
                                      Amount = 1050000m,
                                      CloseDate = new DateTime(2016, 4, 4, 16, 0, 0),
                                      ContactId = 8,
                                      Stage = "Qualified to Buy",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 13,
                                      DealName = "Taco Bell",
                                      Amount = 450000m,
                                      CloseDate = new DateTime(2016, 3, 11, 10, 0, 0),
                                      ContactId = 9,
                                      Stage = "Decision Maker Bought In",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 14,
                                      DealName = "HEB",
                                      Amount = 750000m,
                                      CloseDate = new DateTime(2016, 3, 17, 17, 0, 0),
                                      ContactId = 9,
                                      Stage = "Appointment Scheduled",
                                      isArchived = false

                                    },
                        new Deal {
                                      Id = 15,
                                      DealName = "Container Store",
                                      Amount = 225000m,
                                      CloseDate = new DateTime(2016, 2, 12, 16, 0, 0),
                                      ContactId = 9,
                                      Stage = "Contract Sent",
                                      isArchived = true

                                    }
                };

                context.Deals.AddOrUpdate(d => d.DealName, deals);

                UserTask[] tasks = new UserTask[] {


                new UserTask {Id = 1, Status = "In Progress", Description = "Submit ", DueDate = "03/1/2016", StartDate = "02/10/2016", Type ="Email"},
                new UserTask {Id = 2, Status = "Not Started", Description = "Call Brian to discuss contract", DueDate = "04/14/2016", StartDate = "02/10/2016", Type ="Phonecall"},
                new UserTask {Id = 3, Status = "In Progress", Description = "Lunch with Stacey", DueDate = "03/12/2016", StartDate = "02/10/2016", Type ="Meeting"},
                new UserTask {Id = 4, Status = "Completed", Description = "Schedule Meeting for Lunch", DueDate = "05/19/2016", StartDate = "02/10/2016", Type ="Email"},
                new UserTask {Id = 5, Status = "Completed", Description = "Meet with Coder Camps group at 9AM", DueDate = "02/18/2016", StartDate = "02/17/2016", Type ="Phonecall"},
                new UserTask {Id = 3, Status = "In Progress", Description = "Complete Individual Project for Coder Camps", DueDate = "02/26/2016", StartDate = "02/17/2016", Type ="Project"},
                new UserTask {Id = 4, Status = "Completed", Description = "Complete Group Project", DueDate = "02/26/2016", StartDate = "02/10/2016", Type ="Project"},
                new UserTask {Id = 5, Status = "Completed", Description = "Submit Resume for Hire", DueDate = "03/1/2016", StartDate = "02/17/2016", Type ="Phonecall"}


        };
                context.Tasks.AddOrUpdate(t => t.Id, tasks);


            }
        }
    }
}

