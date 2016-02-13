using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CoderCampsCRM.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string StreetAddress { get; set; }
        public string JobTitle { get; set; }
        public DateTime ?LastInteraction { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]        
        public ApplicationUser User { get; set; }

        public int? CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }

    }   
}