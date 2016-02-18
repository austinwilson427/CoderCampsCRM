using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string CompanyDomainName { get; set; }
        public string CompanyPhoneNumber { get; set; }
        public string CompanyCountry { get; set; }
        public string CompanyCity { get; set; }
        public string CompanyState { get; set; }
        public string CompanyZip { get; set; }
        public string ComapanyAddress { get; set; }      
        public string CompanyDescription { get; set; }
        public string CompanyIndustry { get; set; }
        public bool CompanyIsPublic { get; set; }
        public string ApplicationUser_Id { get; set; }
        public string CompanyFacebook { get; set; }
        public string CompanyLinkedin { get; set; }
        public string CompanyTwitter { get; set; }

        public DateTime CompanyCreateDate { get; set; }
        public DateTime? CompanyLastActivityeDate { get; set; }
        public DateTime? CompanyNextActivityDate { get; set; }

        public string CompanyAttachments { get; set; }

        public ICollection<Contact> Contacts { get; set; }
        public ICollection<Deal> Deals { get; set; }
        public ICollection<UserTask> UserTasks { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

    }
}