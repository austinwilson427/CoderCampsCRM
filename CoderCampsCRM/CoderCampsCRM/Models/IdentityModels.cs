using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System.Collections;
using System.Collections.Generic;
using CoderCampsCRM.Models.ViewModels;
using System;

namespace CoderCampsCRM.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {

        public ICollection<Company> Companies { get; set; }
        public ICollection<Contact> Contacts { get; set; }
        public ICollection<Deal> Deals { get; set; }
        public ICollection<UserTask> UserTasks { get; set; }
        //public ICollection<Location> Locations { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Company { get; set; }
        public string TimeZone { get; set; }
        public string PicUrl { get; set; }
        public DateTime MemberSince { get; set; }
        public bool IsActive { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {

            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public IDbSet<Quota> Quotas { get; set; }
        public IDbSet<UserTask> Tasks { get; set; }
        public IDbSet<Deal> Deals { get; set; }
        public IDbSet<DealLogItem> DealLogItems { get; set; }
        public IDbSet<CompanyLogItem> CompanyLogItems { get; set; }
        public IDbSet<Company> Companies { get; set; }
        public IDbSet<Contact> Contacts { get; set; }
        public IDbSet<DealContact> DealContacts { get; set; }
        public IDbSet<TaskContact> TaskContacts { get; set; }
        public IDbSet<ContactInteraction> ContactInteractions { get; set; }
        public IDbSet<ExternalLoginData> ExternalLoginDatas { get; set; }
        //public IDbSet<Location> Locations { get; set; }
        //public IDbSet<LocationContact> LocationContacts { get; set; }
        public IDbSet<ProfileUser> ProfileUser { get; set;}

        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}